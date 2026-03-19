const { test: base } = require('@playwright/test');
const { HomePage }    = require('../pages/HomePage');
const { UploadModal } = require('../pages/modals/UploadModal');

const test = base.extend({

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  uploadModal: async ({ page }, use) => {
    await use(new UploadModal(page));
  },

});

module.exports = { test, expect: base.expect };