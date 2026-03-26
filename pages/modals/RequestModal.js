const { BaseModal } = require('./BaseModal');

class RequestModal extends BaseModal {
  constructor(page) {
    super(page);

    this.modal = page.locator('#request-document-modal');
  }

  // ─────────────────────────────────────────────
  // Submits and closes — passes modal locator to base
  // so the final wait targets this modal specifically
  // ─────────────────────────────────────────────
  async submitAndClose() {
    await super.submitAndClose(this.modal);
  }
}

module.exports = { RequestModal };