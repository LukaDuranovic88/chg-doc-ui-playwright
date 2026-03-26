const path = require('path');
const { BaseModal } = require('./BaseModal');

class UploadModal extends BaseModal {
  constructor(page) {
    super(page);

    this.modal          = page.locator('#upload-document-modal');
    this.backButton     = page.getByRole('button', { name: 'Back' });

    // Hidden file input — made visible via JS in Serenity workaround
    // Playwright handles file inputs natively, no JS trick needed
    this.fileInput      = page.locator('input[type="file"]');

    // Upload file label — visible after file is attached
    this.uploadFileLabel = page.locator('.gear-qa-upload-file-label');
  }

  // ─────────────────────────────────────────────
  // Attaches a file from test-data/test-files/
  // Playwright sets file input directly — no JS workaround needed
  // ─────────────────────────────────────────────
  async uploadFile(fileName = 'test.pdf') {
    const filePath = path.resolve(__dirname, '../../test-data/test-files', fileName);
    await this.fileInput.waitFor({ state: 'attached' });
    await this.fileInput.setInputFiles(filePath);
    await this.uploadFileLabel.waitFor({ state: 'visible' });
  }

  // ─────────────────────────────────────────────
  // Returns all available content type options for the selected category
  // ─────────────────────────────────────────────
  async getContentTypes() {
    await this.contentTypeDropdown.waitFor({ state: 'visible' });
    return this.contentTypeDropdown.locator('option').allTextContents();
  }

  // ─────────────────────────────────────────────
  // Returns all available sub-category options for the selected content type
  // ─────────────────────────────────────────────
  async getSubCategories() {
    await this.subCategoryDropdown.waitFor({ state: 'visible' });
    return this.subCategoryDropdown.locator('option').allTextContents();
  }

  // ─────────────────────────────────────────────
  // Goes back to category selection screen
  // ─────────────────────────────────────────────
  async clickBack() {
    await this.backButton.waitFor({ state: 'visible' });
    await this.backButton.click();
  }

  // ─────────────────────────────────────────────
  // Closes the modal via Escape key and waits for it to be hidden
  // ─────────────────────────────────────────────
  async closeModal() {
    await this.page.keyboard.press('Escape');
    await this.modal.waitFor({ state: 'hidden' });
  }

  // ─────────────────────────────────────────────
  // Submits and closes — passes modal locator to base
  // so the final wait targets this modal specifically
  // ─────────────────────────────────────────────
  async submitAndClose() {
    await super.submitAndClose(this.modal);
  }
}

module.exports = { UploadModal };