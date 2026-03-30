const { test: base }                = require('@playwright/test');
const { HomePage }                  = require('../pages/HomePage');
const { UploadModal }               = require('../pages/modals/UploadModal');
const { RequestModal }              = require('../pages/modals/RequestModal');
const { CategoryComponent }         = require('../pages/CategoryComponent');
const { VerificationQueuePage }     = require('../pages/VerificationQueuePage');
const { DmsApiClient }              = require('../api/clients/DmsApiClient');

const test = base.extend({

  // ── Default fixtures (use default user session) ──────────────────────────

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  uploadModal: async ({ page }, use) => {
    await use(new UploadModal(page));
  },

  requestModal: async ({ page }, use) => {
    await use(new RequestModal(page));
  },

  categoryComponent: async ({ page }, use) => {
    await use(new CategoryComponent(page));
  },

  // ── API fixture ───────────────────────────────────────────────────────────
  // Provides a DmsApiClient instance for setup/teardown API calls.
  // No browser context needed — pure HTTP via Playwright's request API.

  api: async ({}, use) => {
    await use(new DmsApiClient());
  },

  // ── VQ fixtures (use cssuser session) ────────────────────────────────────
  // Opens a fresh browser context loaded with the cssuser storageState,
  // so VQ tests run as the correct user without affecting other tests.

  vqContext: [async ({ browser }, use) => {
    const ctx = await browser.newContext({
      storageState: '.auth/cssuser.json',
      ignoreHTTPSErrors: true,
    });
    await use(ctx);
    await ctx.close();
  }, { scope: 'test' }],

  vqPage: async ({ vqContext }, use) => {
    const page = await vqContext.newPage();
    await use(new VerificationQueuePage(page));
  },

});

module.exports = { test, expect: base.expect };