const { BasePage } = require('../BasePage');

class UploadModal extends BasePage {
  constructor(page) {
    super(page);
    this.contentTypeDropdown = page.locator('select.gear-qa-content-type');
    this.subCategoryDropdown = page.locator('select.gear-qa-sub-category');
    this.backButton = page.getByRole('button', { name: 'Back' });
  }

  // Defined as method (not arrow function) so this.page is always available
  categoryCard(categoryName) {
    return this.page.getByText(categoryName, { exact: true });
  }

  async openCategory(categoryName) {
    await this.categoryCard(categoryName).waitFor({ state: 'visible' });
    await this.categoryCard(categoryName).click();
  }

  async selectContentType(contentTypeName) {
    await this.contentTypeDropdown.waitFor({ state: 'visible' });
    await this.contentTypeDropdown.selectOption({ label: contentTypeName });
  }

  async getContentTypes() {
    await this.contentTypeDropdown.waitFor({ state: 'visible' });
    return this.contentTypeDropdown.locator('option').allTextContents();
  }

  async getSubCategories() {
    await this.subCategoryDropdown.waitFor({ state: 'visible' });
    return this.subCategoryDropdown.locator('option').allTextContents();
  }

  async clickBackButton() {
    await this.backButton.waitFor({ state: 'visible' });
    await this.backButton.click();
  }

  async closeModal() {
    await this.page.keyboard.press('Escape');
    await this.page.locator('#upload-document-modal').waitFor({ state: 'hidden' });
  }
}

module.exports = { UploadModal };