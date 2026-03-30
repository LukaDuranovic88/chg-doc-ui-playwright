const { BasePage } = require('./BasePage');
const { VQFilter } = require('../test-data/enums/VQFilter');
const { expect } = require('@playwright/test');

class VerificationQueuePage extends BasePage {
  constructor(page) {
    super(page);

    // All table and pagination locators scoped to Documents in Review tab —
    // avoids strict mode violations from duplicate elements in Edit Pending tab
    const reviewTab = this.page.getByRole('tabpanel', { name: 'Documents in Review' });

    // ── Table ──────────────────────────────────────────────────────────────
    this.tableHeaders = reviewTab.locator('table:first-of-type th > div:first-child');
    this.tableRows = reviewTab.locator('table:first-of-type tbody tr');
    this.editButton = reviewTab.getByRole('button', { name: 'pencil square' }).first();
    this.contentTypeInTable = reviewTab.locator("td[aria-colindex='5']").first();

    // ── Pagination ─────────────────────────────────────────────────────────
    this.perPageSelect = reviewTab.locator('select.gear-qa-per-page-select');
    this.lastPageButton = reviewTab.locator('li.gear-qa-last-page');
    this.firstPageButton = reviewTab.locator('li.gear-qa-first-page');
    this.nextPageButton = reviewTab.locator('li.gear-qa-next-page');
    this.prevPageButton = reviewTab.locator('li.gear-qa-prev-page');

    // ── Filters ────────────────────────────────────────────────────────────
    // Filter containers follow pattern: #gear-qa-{filter-id}-filter
    // Filter tags are a.label elements — cleared by sending DELETE to the input

    // ── Document Review panel ──────────────────────────────────────────────
    this.reviewPanel = this.page.locator('.document-review-area-container');
    this.radioArchiveBtn = this.page.locator('input[value="Archive Document"]');
    this.radioDeleteBtn = this.page.locator('input[value="Delete Document"]');
    this.verifyBtn = this.page.locator('button').filter({ hasText: 'Verify' });
    this.notAcceptedBtn = this.page.locator('button').filter({ hasText: 'Not Accepted' });
    this.verifiedMessage = this.page.locator('div.toast-body');
    this.corruptedFileError = this.page.locator('div[class*="pre-formatted col-8"]');
    this.closeReviewBtn = this.page.locator('svg[class*="bi-x"]');
    // App has duplicate #verification-queue-refresh-button IDs (one per tab) — known DOM bug.
    // TODO (app team): scope refresh button to tab component. Scoped to tabpanel as workaround.
    this.refreshBtn = this.page
      .getByRole('tabpanel', { name: 'Documents in Review' })
      .locator('#verification-queue-refresh-button');
    this.reviewHeader = this.page.locator('span').filter({ hasText: 'Document Review' });

    // ── Edit Content Type modal ────────────────────────────────────────────
    this.editContentTypeBtn = this.page.locator('button[title*="transfer this document"]');
    this.editContentTypeModalTitle = this.page.locator('h5').filter({ hasText: 'Edit Content Type' });
    this.transferDropdown = this.page.locator('select[class="custom-select"]');
    this.transferBtn = this.page.locator('button').filter({ hasText: 'Transfer' });
    this.transferWithoutRequestBtn = this.page.locator('div.custom-control.custom-radio').first();
    this.transferWithRequestBtn = this.page.locator('div.custom-control.custom-radio').nth(1);
    this.unselectedTransferRequest = this.page.locator('tr[aria-selected="false"]');
    this.transferSuccessMsg = this.page.locator('h5').filter({ hasText: 'Content Type Transfer Successful' });
    this.contentTypeSelect = this.page.locator('.gear-qa-content-type');
    this.transferDropdownOptions = this.page.locator('select[class="custom-select"] option');
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  async open(division) {
    await this.page.goto(`/#/verification-queue?page=verification-queue&division=${division}`);
    await this.page.waitForLoadState('networkidle');
  }

  // ── Table helpers ────────────────────────────────────────────────────────

  async getTableColumnNames() {
    await this.tableHeaders.first().waitFor({ state: 'visible' });
    const names = await this.tableHeaders.allInnerTexts();
    return names.filter(n => n && n.trim().length > 0).map(n => n.trim());
  }

  async getCurrentDocsPerPage() {
    return this.perPageSelect.inputValue();
  }

  // ── Filtering ────────────────────────────────────────────────────────────
  // Filter containers follow pattern: #gear-qa-{filter-id}-filter
  // Scoped to Documents in Review tabpanel to avoid matching Edit Pending tab

  _filterContainer(filterType) {
    return this.page
      .getByRole('tabpanel', { name: 'Documents in Review' })
      .locator(`#gear-qa-${filterType}-filter`);
  }

  async clearFilter(filterType) {
    const container = this._filterContainer(filterType);
    const tags = container.locator('a.label');
    const count = await tags.count();
    if (count === 0) return;
    const input = container.locator('input');
    for (let i = 0; i < count; i++) {
      await input.press('Delete');
      await this.page.waitForLoadState('networkidle');
      await input.press('Escape');
    }
    await input.press('Escape');
  }

  async clearAllFilters() {
    for (const filterType of Object.values(VQFilter)) {
      await this.clearFilter(filterType);
    }
  }

  async addFilter(filterType, value) {
    const container = this._filterContainer(filterType);
    const input = container.locator('input');

    await expect(async () => {
      await container.locator('i.dropdown.icon').click();
      await input.fill(value);
      await container.locator('div.item').getByText(value, { exact: true }).click();
    }).toPass({ timeout: 10000, intervals: [500] });

    await this.page.waitForLoadState('networkidle');
  }

  // ── Pagination ────────────────────────────────────────────────────────────

  async goToLastPage() {
    if (await this.lastPageButton.isEnabled()) {
      await this.lastPageButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  // ── Sorting ──────────────────────────────────────────────────────────────

  async sortByColumn(columnName, order) {
    const header = this.page.getByRole('columnheader', { name: columnName });
    const currentOrder = await header.getAttribute('aria-sort');
    await header.click();
    if (order === 'descending' && currentOrder !== 'descending') await header.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ── Filters + sort + open edit ───────────────────────────────────────────
  // Always applies full filters — DEW must be running to enrich Division/Team/Specialty.
  // Locally: run DEW or point DMS_BASE_URL at dev/stage backend.

  async filterAndEditLatest(division, team, specialty, contentType) {
    await this.clearAllFilters();
    await this.addFilter(VQFilter.Division, division);
    await this.addFilter(VQFilter.Team, team);
    await this.addFilter(VQFilter.PrimarySpecialty, specialty);
    await this.addFilter(VQFilter.ContentType, contentType);
    await this.goToLastPage();
    await this.sortByColumn('Uploaded Date', 'descending');
    await this.editButton.click();
    await this.reviewPanel.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async filterAndEditLatestWithError(division, team, specialty, contentType) {
    await this.filterAndEditLatest(division, team, specialty, contentType);
    await this.corruptedFileError.waitFor({ state: 'visible', timeout: 15000 });
  }

  // ── Document Review actions ───────────────────────────────────────────────

  async clickArchive() {
    await this.radioArchiveBtn.click();
  }

  async clickDelete() {
    await this.radioDeleteBtn.click();
  }

  async clickVerify() {
    await this.verifyBtn.click();
  }

  async clickNotAccepted() {
    await this.notAcceptedBtn.click();
  }

  async closeReviewAndRefresh() {
    await this.closeReviewBtn.click();
    await this.reviewPanel.waitFor({ state: 'hidden' });
    await this.refreshBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isVerifyButtonDisabled() {
    return this.verifyBtn.isDisabled();
  }

  async isArchiveBtnEnabled() {
    return this.radioArchiveBtn.isEnabled();
  }

  async isDeleteBtnEnabled() {
    return this.radioDeleteBtn.isEnabled();
  }

  async getCorruptedFileErrorMessage() {
    return this.corruptedFileError.textContent();
  }

  // ── Edit Content Type modal ───────────────────────────────────────────────

  async clickEditContentType() {
    await this.editContentTypeBtn.click();
    await this.editContentTypeModalTitle.waitFor({ state: 'visible' });
  }

  async isTransferButtonDisabled() {
    return this.transferBtn.isDisabled();
  }

  async selectTransferTarget(contentTypeDisplayName) {
    await this.transferDropdown.selectOption({ label: contentTypeDisplayName });
  }

  async clickTransferButton() {
    await this.transferBtn.click();
    await this.transferSuccessMsg.waitFor({ state: 'visible' });
    await this.page.getByRole('dialog').waitFor({ state: 'hidden' });
  }

  async clickTransferWithoutRequest() {
    await this.transferWithoutRequestBtn.click();
  }

  async clickTransferWithRequest() {
    await this.transferWithRequestBtn.click();
    await this.transferWithRequestBtn.click();
    await this.unselectedTransferRequest.click();
  }

  async getSelectedContentType() {
    return this.contentTypeSelect.evaluate(
      el => el.options[el.selectedIndex].text
    );
  }

  async getTransferDropdownOptionCount() {
    return this.transferDropdownOptions.count();
  }

  // ── Post-transfer assertion helper ───────────────────────────────────────

  async clearContentTypeFilterAndApply(contentTypeDisplayName) {
    await this.clearFilter(VQFilter.ContentType);
    await this.addFilter(VQFilter.ContentType, contentTypeDisplayName);
    await this.sortByColumn('Uploaded Date', 'descending');
  }
}

module.exports = { VerificationQueuePage };