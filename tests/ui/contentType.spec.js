const { test, expect } = require('../../fixtures/base.fixture');
const { Categories, ExpectedContentTypes } = require('../../test-data/enums/contentTypes');

test.describe('Content Types - Provider CHS', () => {

  // No beforeEach needed — authenticatedHomePage fixture handles navigation
  for (const [category, expectedTypes] of Object.entries(ExpectedContentTypes)) {
    test(`should have correct content types for: ${category}`, async ({ authenticatedHomePage, uploadModal }) => {

      // Replaces: homeSteps.openUploadButtonModal()
      await authenticatedHomePage.openUploadModal();

      // Replaces: modalSteps.getAllContentTypesFromUploadModal(category)
      await uploadModal.openCategory(category);
      const actualTypes = await uploadModal.getContentTypes();

      // Replaces: assert expectedContentTypes.size() == actualContentTypes.size()
      expect(actualTypes).toHaveLength(expectedTypes.length);
      expect(actualTypes).toEqual(expect.arrayContaining(expectedTypes));

      // Replaces: modalSteps.clickOnBackButton()
      await uploadModal.clickBackButton();
    });
  }

});