const { BasePage } = require('../BasePage');

class UploadModal extends BasePage {
  constructor(page) {
    super(page);
    // Category cards are <p> elements with class "card-text"
    this.categoryCard = (categoryName) =>
      page.locator('p.card-text', { hasText: categoryName });

    // Content type dropdown — uses stable class "gear-qa-content-type"
    this.contentTypeDropdown = page.locator('select.gear-qa-content-type');

    // Back button to return to category list
    this.backButton = page.getByRole('button', { name: 'Back' });
  }

  async openCategory(categoryName) {
    await this.categoryCard(categoryName).waitFor({ state: 'visible' });
    await this.categoryCard(categoryName).click();
  }

  async getContentTypes() {
    await this.contentTypeDropdown.waitFor({ state: 'visible' });
    return this.contentTypeDropdown.locator('option').allTextContents();
  }

  async clickBackButton() {
    await this.backButton.waitFor({ state: 'visible' });
    await this.backButton.click();
  }
}

module.exports = { UploadModal };