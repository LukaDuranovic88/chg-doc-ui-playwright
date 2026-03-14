const { BasePage } = require('./BasePage');
const environment = require('../config/environments');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Replaces: @FindBy annotations in Serenity HomePage.java
    this.uploadButton  = page.getByRole('button', { name: 'Upload' });
    this.requestButton = page.getByRole('button', { name: 'Request' });

    // Bulk action buttons
    this.bulkViewButton     = page.getByRole('button', { name: 'View' });
    this.bulkDownloadButton = page.getByRole('button', { name: 'Download' });
    this.bulkArchiveButton  = page.getByRole('button', { name: 'Archive' });
    this.bulkClearButton    = page.getByRole('button', { name: 'Clear' });

    // Error modal
    this.errorModalMessage = page.getByTestId('error-modal-message');
  }

  // Replaces: homeSteps.openHomePage(entityId, page, division)
  async openHomePage(entityId, pageEnum, division) {
    const homeURL = `${environment.baseURL}/#/home?primaryEntityId=${entityId}&entityIds=${entityId}&page=${pageEnum}&division=${division}`;
    await this.page.goto(environment.baseURL);
    await this.page.evaluate((url) => { window.location.href = url; }, homeURL);
    await this.page.waitForFunction(
      () => window.location.hash.includes('home'),
      { timeout: 15000 }
    );
  }

  // Replaces: homeSteps.openUploadButtonModal()
  async openUploadModal() {
    await this.uploadButton.waitFor({ state: 'visible' });
    await this.uploadButton.click();
  }

  // Replaces: homeSteps.openRequestButtonModal()
  async openRequestModal() {
    await this.requestButton.waitFor({ state: 'visible' });
    await this.requestButton.click();
  }

  // Replaces: homeSteps.verifyDocumentIsVisible()
  async assertDocumentIsVisible(documentName) {
    await this.page.getByText(documentName).waitFor({ state: 'visible' });
  }
}

module.exports = { HomePage };