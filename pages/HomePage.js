const { BasePage } = require('./BasePage');
const environment = require('../config/environments');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.requestButton = page.getByRole('button', { name: 'Request' });

    // Bulk action buttons
    this.bulkViewButton = page.getByRole('button', { name: 'View' });
    this.bulkDownloadButton = page.getByRole('button', { name: 'Download' });
    this.bulkArchiveButton = page.getByRole('button', { name: 'Archive' });
    this.bulkClearButton = page.getByRole('button', { name: 'Clear' });

    // Error modal
    this.errorModalMessage = page.getByTestId('error-modal-message');

    // Okta session expiry dialog
    this.oktaSessionDialog = page.getByText('Your Okta session has ended');
    this.oktaSessionOkBtn = page.getByRole('button', { name: 'OK' });
  }

  // Replaces: homeSteps.openHomePage(entityId, page, division)
  async openHomePage(entityId, pageEnum, division, entityIds = null) {
    const homeURL = `${environment.baseURL}/#/home?primaryEntityId=${entityId}&entityIds=${entityIds ?? entityId}&page=${pageEnum}&division=${division}`;
    await this.page.goto(environment.baseURL);
    await this.page.evaluate((url) => { window.location.href = url; }, homeURL);
    await this.page.waitForFunction(
      () => window.location.hash.includes('home'),
      { timeout: 15000 }
    );

    // Handle Okta session expiry dialog if it appears
    const isExpired = await this.oktaSessionDialog.isVisible({ timeout: 3000 }).catch(() => false);
    if (isExpired) {
      await this.oktaSessionOkBtn.click();
    }
  }

  async openUploadModal() {
    const modal = this.page.locator('#upload-document-modal');
    if (await modal.isVisible()) {
      await this.page.getByRole('button', { name: 'Close' }).click();
      await modal.waitFor({ state: 'hidden' });
    }
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