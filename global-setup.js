const { chromium } = require('@playwright/test');
require('dotenv').config();
const environment = require('./config/environments');

module.exports = async () => {
  console.log('🔐 Starting Okta login...');
  console.log('👤 TEST_USERNAME:', process.env.TEST_USERNAME);
  console.log('🔑 TEST_PASSWORD loaded:', !!process.env.TEST_PASSWORD);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    // Step 1: Go directly to Okta first (uses correct Okta URL per environment)
    await page.goto(environment.oktaURL);
    console.log('📄 Navigated to Okta:', page.url());

    // Step 2: Enter username
    await page.getByLabel('Username').waitFor({ state: 'visible', timeout: 10000 });
    await page.getByLabel('Username').fill(process.env.TEST_USERNAME);
    await page.getByRole('button', { name: 'Next' }).click();
    console.log('✅ Username entered');

    // Step 3: Enter password
    await page.getByLabel('Password').waitFor({ state: 'visible', timeout: 10000 });
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
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
    console.log('🏠 Navigating to:', homeURL);

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
    console.log('📄 Navigated to app:', page.url());

    // Step 7: Wait for app to load home (hash-based routing)
    await page.waitForFunction(
      () => window.location.hash.includes('home') && !document.querySelector('[class*="loading"]'),
      { timeout: 20000 }
    );
    console.log('🏠 Landed on:', page.url());

    // Step 8: Save session AFTER app is fully loaded — captures localhost cookies
    await context.storageState({ path: '.auth/session.json' });
    console.log('✅ Session saved to .auth/session.json');

  } catch (error) {
    console.error('❌ Login failed:', error.message);
    console.error('📄 Current URL:', page.url());
    await page.screenshot({ path: '.auth/login-error.png' });
    console.error('📸 Screenshot saved to .auth/login-error.png');
    throw error;
  } finally {
    await browser.close();
  }
};