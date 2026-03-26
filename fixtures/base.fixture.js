const { test: base }          = require('@playwright/test');
const { HomePage }            = require('../pages/HomePage');
const { UploadModal }         = require('../pages/modals/UploadModal');
const { RequestModal }        = require('../pages/modals/RequestModal');
const { CategoryComponent }   = require('../pages/CategoryComponent');

const test = base.extend({

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

});

module.exports = { test, expect: base.expect };