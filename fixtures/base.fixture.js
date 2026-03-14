const { test: base } = require('@playwright/test');
const { HomePage }    = require('../pages/HomePage');
const { UploadModal } = require('../pages/modals/UploadModal');
const { TestEntityIds } = require('../test-data/enums/TestEntityIds');
const { Division }    = require('../test-data/enums/Division');
const { PageEnum }    = require('../test-data/enums/PageEnum');

// Shared test defaults
const defaults = {
  entityId:  TestEntityIds.ROGER_RECRUIT2_PROVIDER.entityId,
  page:      PageEnum.provider,
  division:  Division.CHS,
};

const test = base.extend({

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  uploadModal: async ({ page }, use) => {
    await use(new UploadModal(page));
  },

  authenticatedHomePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage(defaults.entityId, defaults.page, defaults.division);
    await use(homePage);
  },

});

module.exports = { test, expect: base.expect, defaults };