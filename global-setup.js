const { chromium } = require('@playwright/test');
require('dotenv').config();
const environment = require('./config/environments');

// ─────────────────────────────────────────────────────────────────────────────
// Users to authenticate at startup.
// Each entry produces its own storageState file at .auth/<sessionFile>.
// Add new users here as the suite grows — credentials come from .env.
// ─────────────────────────────────────────────────────────────────────────────
const TEST_USERS = [
  {
    label: 'default user',
    username: process.env.CHS_USERNAME,
    password: process.env.CHS_PASSWORD,
    sessionFile: '.auth/session.json',
  },
  {
    label: 'cssuser (VQ)',
    username: process.env.VQ_CSS_USERNAME,
    password: process.env.VQ_CSS_PASSWORD,
    sessionFile: '.auth/cssuser.json',
  },
];

async function loginUser({ label, username, password, sessionFile }) {
  console.log(`\n🔐 Starting Okta login — ${label}`);
  console.log(`👤 Username: ${username}`);
  console.log(`🔑 Password loaded: ${!!password}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    // Step 1: Go directly to Okta first (uses correct Okta URL per environment)
    await page.goto(environment.oktaURL);
    console.log(`📄 Navigated to Okta: ${page.url()}`);

    // Step 2: Enter username
    await page.getByLabel('Username').waitFor({ state: 'visible', timeout: 10000 });
    await page.getByLabel('Username').fill(username);
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('✅ Username entered');

    // Step 3: Enter password
    await page.getByLabel('Password').waitFor({ state: 'visible', timeout: 10000 });
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Verify' }).click();
    console.log('✅ Password entered');

    // Step 4: Handle "Remind Me Later" prompt if it appears
    try {
      const remindMeLater = page.getByRole('button', { name: 'Remind me later' });
      await remindMeLater.waitFor({ state: 'visible', timeout: 5000 });
      await remindMeLater.click();
      console.log('⚠️  Clicked Remind Me Later');
    } catch {
      console.log('ℹ️  No Remind Me Later prompt');
    }

    // Step 5: Build home URL dynamically from environment + .env entity context
    const homeURL = `${environment.baseURL}/#/home?primaryEntityId=${process.env.ENTITY_ID}&entityIds=${process.env.ENTITY_ID}&page=${process.env.PAGE}&division=${process.env.DIVISION}`;
    console.log(`🏠 Navigating to: ${homeURL}`);

    await page.goto(environment.baseURL);

    // Step 6: Handle "Okta session ended" dialog if it appears
    try {
      const oktaLink = page.getByRole('link', { name: 'Okta' });
      await oktaLink.waitFor({ state: 'visible', timeout: 5000 });
      console.log('⚠️  Okta session dialog appeared — dismissing');
      await page.getByRole('button', { name: 'OK' }).click();
    } catch {
      console.log('ℹ️  No Okta session dialog');
    }

    await page.evaluate((url) => { window.location.href = url; }, homeURL);
    console.log(`📄 Navigated to app: ${page.url()}`);

    // Step 7: Wait for app to load home (hash-based routing)
    await page.waitForFunction(
      () => window.location.hash.includes('home') && !document.querySelector('[class*="loading"]'),
      { timeout: 20000 }
    );
    console.log(`🏠 Landed on: ${page.url()}`);

    // Step 8: Save session AFTER app is fully loaded — captures localhost cookies
    await context.storageState({ path: sessionFile });
    console.log(`✅ Session saved to ${sessionFile}`);

  } catch (error) {
    console.error(`❌ Login failed for ${label}: ${error.message}`);
    console.error(`📄 Current URL: ${page.url()}`);
    await page.screenshot({ path: `.auth/login-error-${label.replace(/\s+/g, '-')}.png` });
    console.error(`📸 Screenshot saved`);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = async () => {
  for (const user of TEST_USERS) {
    await loginUser(user);
  }
};