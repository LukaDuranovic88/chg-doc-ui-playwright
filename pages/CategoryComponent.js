const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CategoryComponent extends BasePage {
  constructor(page) {
    super(page);

    // ─────────────────────────────────────────────
    // Status and content type cells — scoped globally
    // Note: 'gear-qa-doc-status-colum' is intentional — typo exists in the DOM
    // ─────────────────────────────────────────────
    this.statusCell = page.locator('td.gear-qa-doc-status-colum');
    this.contentTypeCell = page.locator('td.gear-qa-doc-content-type-column');
    this.subCategoryCell = page.locator('td.gear-qa-doc-sub-category-column');
    this.classificationCell = page.locator('td.gear-qa-doc-classification-column');
    this.stateCell = page.locator('td.gear-qa-doc-state-column');
    this.fileNameCell = page.locator('td.gear-qa-doc-file-name-column');
  }

  // ─────────────────────────────────────────────
  // Returns the category container scoped by gear-qa-category-{id}
  // ─────────────────────────────────────────────
  _container(categoryId) {
    return this.page.locator(`div.categoryContainer#gear-qa-category-${categoryId}`);
  }

  // ─────────────────────────────────────────────
  // Returns the document table inside a category container
  // ─────────────────────────────────────────────
  _docTable(categoryId) {
    return this._container(categoryId).locator(`#gear-qa-category-${categoryId}-doc-table-beta > table`);
  }

  // ─────────────────────────────────────────────
  // Returns the SVG caret toggle inside a category container
  // ─────────────────────────────────────────────
  _caret(categoryId) {
    return this._container(categoryId).locator('svg.categoryCaret');
  }

  // ─────────────────────────────────────────────
  // Returns the three dots options button scoped to a category container
  // Scoped to container prevents clicking the wrong category's three dots
  // ─────────────────────────────────────────────
  _threeDots(categoryId) {
    return this._container(categoryId).locator('.gear-qa-options-dropdown');
  }

  // ─────────────────────────────────────────────
  // Checks if the category is already expanded by reading the caret transform
  // transform === null means expanded
  // ─────────────────────────────────────────────
  async _isExpanded(categoryId) {
    const transform = await this._caret(categoryId)
      .locator('g')
      .getAttribute('transform');
    return transform === null;
  }

  // ─────────────────────────────────────────────
  // Expands the category — skips if already expanded.
  // Waits for the last table row to be visible before continuing.
  // ─────────────────────────────────────────────
  async expandCategory(categoryId) {
    const expanded = await this._isExpanded(categoryId);
    if (!expanded) {
      await this._caret(categoryId).waitFor({ state: 'visible' });
      await this._caret(categoryId).click();
      await this._docTable(categoryId)
        .locator('tbody > tr:last-of-type')
        .waitFor({ state: 'visible' });
    }
  }

  // ─────────────────────────────────────────────
  // Opens the three dots options menu and clicks Upload
  // ─────────────────────────────────────────────
  async clickUploadFromOptions(categoryId) {
    await this._threeDots(categoryId).waitFor({ state: 'visible' });
    await this._threeDots(categoryId).click();
    await this.page.getByRole('menuitem', { name: 'Upload' }).waitFor({ state: 'visible' });
    await this.page.getByRole('menuitem', { name: 'Upload' }).click();
  }

  // ─────────────────────────────────────────────
  // Returns all document rows in the category table
  // ─────────────────────────────────────────────
  async getDocumentRows(categoryId) {
    return this._docTable(categoryId).locator('tbody > tr').all();
  }

  // ─────────────────────────────────────────────
  // Asserts the document count in the category table
  // ─────────────────────────────────────────────
  async assertDocumentCount(categoryId, expectedCount) {
    await expect(
      this._docTable(categoryId).locator('tbody > tr')
    ).toHaveCount(expectedCount);
  }

  // ─────────────────────────────────────────────
  // Asserts the status of the first (or only) document row
  // ─────────────────────────────────────────────
  async assertDocumentStatus(categoryId, expectedStatus) {
    const statusCell = this._docTable(categoryId).locator('td.gear-qa-doc-status-column');
    await expect(statusCell).toBeVisible();
    await expect(statusCell).toHaveText(expectedStatus);
  }

  // ─────────────────────────────────────────────
  // Expands the category, asserts document count and status in one step.
  // Main assertion used across all category tests.
  // ─────────────────────────────────────────────
  async assertStatusAndCount(categoryId, expectedStatus, expectedCount = 1) {
    await this.expandCategory(categoryId);
    await this.assertDocumentCount(categoryId, expectedCount);
    await this.assertDocumentStatus(categoryId, expectedStatus);
  }
}

module.exports = { CategoryComponent };