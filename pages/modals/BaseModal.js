const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');

class BaseModal extends BasePage {
  constructor(page) {
    super(page);

    // ─────────────────────────────────────────────
    // Modal chrome
    // ─────────────────────────────────────────────
    this.overlaySpinner = page.locator('.b-overlay').first();
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.closeButton = page.locator('button.close');

    // ─────────────────────────────────────────────
    // Category selection — first screen of both modals
    // ─────────────────────────────────────────────
    this.categoryCard = (categoryName) =>
      page.getByText(categoryName, { exact: true });

    // ─────────────────────────────────────────────
    // Dropdowns
    // ─────────────────────────────────────────────
    this.contentTypeDropdown = page.locator('select.gear-qa-content-type');
    this.subCategoryDropdown = page.locator('select.gear-qa-sub-category');
    this.classificationDropdown = page.locator('select.gear-qa-classification');
    this.specialtyDropdown = page.locator('select.gear-qa-specialty');
    this.stateDropdown = page.locator('select.gear-qa-state');
    this.issuingAuthorityDropdown = page.locator('select.gear-qa-issuing-authority');
    this.auditedDropdown = page.locator('select.gear-qa-audited');
    this.divisionDropdown = page.locator('select.gear-qa-division');
    this.signedDropdown = page.locator('select[class*="gear-qa-signed"]');
    this.externalLetterDropdown = page.locator('select[class*="gear-qa-external-letter"]');

    // ─────────────────────────────────────────────
    // "Other" description fields
    // ─────────────────────────────────────────────
    this.subCategoryDescription = page.locator('.gear-qa-sub-category-description');
    this.classificationDescription = page.locator('.gear-qa-classification-description');
    this.specialtyDescription = page.locator('.gear-qa-specialty-description');

    // ─────────────────────────────────────────────
    // Text / ID fields
    // ─────────────────────────────────────────────
    this.description = page.locator('.gear-qa-description');
    this.clientID = page.locator('.gear-qa-client-id');
    this.clientName = page.locator('.gear-qa-client-name');
    this.presentID = page.locator('.gear-qa-present-id');
    this.jobID = page.locator('.gear-qa-job-id');
    this.assignmentID = page.locator('.gear-qa-assignment-id');
    this.externalID = page.locator('.gear-qa-external-id');
    this.housingRequestID = page.locator('input.gear-qa-housing-request-id');
    this.specialtyLabel = page.locator('.gear-qa-specialty-label');
    this.facilityName = page.locator('.gear-qa-facility-name');
    this.rfpNumber = page.locator('input.gear-qa-rfp-number');
    this.substituteForm = page.locator('input.gear-qa-substitute-form');
    this.examScore = page.locator('input.gear-qa-exam-score');

    // ─────────────────────────────────────────────
    // Date input fields
    // Note: date fields use -input suffix in the DOM
    // Note: payPeriodStart/-End have inconsistent suffixes — verify in DOM if failing
    // ─────────────────────────────────────────────
    this.dateOfLetter = page.locator('input.gear-qa-date-of-letter-input');
    this.dateFrom = page.locator('input.gear-qa-date-from-input');
    this.dateSigned = page.locator('input.gear-qa-date-signed-input');
    this.dateTo = page.locator('input.gear-qa-date-to-input');
    this.expirationDate = page.locator('input.gear-qa-expiration-date-input');
    this.issueDate = page.locator('input.gear-qa-issue-date-input');
    this.resultsDate = page.locator('input.gear-qa-results-date-input');
    this.assignmentStartDate = page.locator('input.gear-qa-assignment-start-date-input');
    this.assignmentEndDate = page.locator('input.gear-qa-assignment-end-date-input');
    this.completedDate = page.locator('input.gear-qa-completed-date-input');
    this.effectiveDate = page.locator('input.gear-qa-effective-date-input');
    this.effectiveDateOfCancellation = page.locator('input.gear-qa-effective-date-of-cancellation-input');
    this.signatureDate = page.locator('input.gear-qa-signature-date-input');
    this.reportCompletionDate = page.locator('input.gear-qa-report-completion-date-input');
    this.testDate = page.locator('input.gear-qa-test-date-input');
    this.approvalDate = page.locator('input.gear-qa-approval-date-input');
    this.moveInDate = page.locator('input.gear-qa-move-in-date');
    this.moveOutDate = page.locator('input.gear-qa-move-out-date');
    this.dateOfIncident = page.locator('input.gear-qa-date-of-incident');
    this.lastClinicalContactDate = page.locator('input.gear-qa-last-clinical-contact-date-input');
    this.privilegingStartDate = page.locator('input.gear-qa-privileging-start-date');
    this.payPeriodDate = page.locator('input.gear-qa-pay-period-date');
    this.dateSent = page.locator('input.gear-qa-date-sent');
    this.applicationDate = page.locator('.gear-qa-application-date');
    this.payPeriodStart = page.locator('.gear-qa-pay-period-start-append');
    this.payPeriodEnd = page.locator('.gear-qa-pay-period-end-input');

    // ─────────────────────────────────────────────
    // Optional field → locator map
    // Keys match MetadataFields display name strings exactly.
    // Used by verifyOptionalFields() to assert field visibility
    // from the optional[] array in ContentTypeNames.
    // ─────────────────────────────────────────────
    this._optionalFieldLocators = {
      'Date of Letter': this.dateOfLetter,
      'Date From': this.dateFrom,
      'Date Signed': this.dateSigned,
      'Date To': this.dateTo,
      'Exam Score': this.examScore,
      'Expiration Date': this.expirationDate,
      'Issuing Authority': this.issuingAuthorityDropdown,
      'Issue Date': this.issueDate,
      'State': this.stateDropdown,
      'Client ID': this.clientID,
      'Client Name': this.clientName,
      'Assignment Start Date': this.assignmentStartDate,
      'Assignment End Date': this.assignmentEndDate,
      'Present ID': this.presentID,
      'Job ID': this.jobID,
      'Assignment ID': this.assignmentID,
      'Results Date': this.resultsDate,
      'Completed Date': this.completedDate,
      'Signature Date': this.signatureDate,
      'Report Completion Date': this.reportCompletionDate,
      'Test Date': this.testDate,
      'Approval Date': this.approvalDate,
      'Effective Date': this.effectiveDate,
      'Effective Date of Cancellation': this.effectiveDateOfCancellation,
      'Housing Request ID': this.housingRequestID,
      'Move In Date': this.moveInDate,
      'Move Out Date': this.moveOutDate,
      'External Letter (Y/N)': this.externalLetterDropdown,
      'Signed (Y/N)': this.signedDropdown,
      'Date of Incident': this.dateOfIncident,
      'Last Clinical Contact Date': this.lastClinicalContactDate,
      'Substitute Form': this.substituteForm,
      'RFP Number': this.rfpNumber,
      'Classification': this.classificationDropdown,
      'Pay Period Date': this.payPeriodDate,
      'Date Sent': this.dateSent,
      'Privileging Start Date': this.privilegingStartDate,
      'Division': this.divisionDropdown,
      'Specialty': this.specialtyDropdown,
      'Facility Name': this.facilityName,
      'Application Date': this.applicationDate,
      'Audited': this.auditedDropdown,
      'Pay Period Start': this.payPeriodStart,
      'Pay Period End': this.payPeriodEnd,
      'SpecialtyLabel': this.specialtyLabel,
    };
  }

  // ─────────────────────────────────────────────
  // Opens a category card on the first modal screen
  // ─────────────────────────────────────────────
  async openCategory(categoryName) {
    const card = this.categoryCard(categoryName);
    await card.waitFor({ state: 'visible' });
    await card.click();
  }

  // ─────────────────────────────────────────────
  // Selects a content type — skips if dropdown is disabled
  // (single content type categories have a disabled/readonly dropdown)
  // ─────────────────────────────────────────────
  async selectContentType(contentTypeName) {
    await this.contentTypeDropdown.waitFor({ state: 'visible' });
    const isEnabled = await this.contentTypeDropdown.isEnabled();
    if (isEnabled) {
      await this.contentTypeDropdown.selectOption({ label: contentTypeName });
    }
  }

  // ─────────────────────────────────────────────
  // Selects a sub-category — handles "Other" by filling
  // the description field and tabbing out to trigger focusout
  // ─────────────────────────────────────────────
  async selectSubCategory(value) {
    await this.subCategoryDropdown.waitFor({ state: 'visible' });
    await this.subCategoryDropdown.selectOption({ label: value });
    if (value === 'Other') {
      await this.subCategoryDescription.waitFor({ state: 'visible' });
      await this.subCategoryDescription.fill('Other');
      await this.subCategoryDescription.press('Tab');
    }
  }

  // ─────────────────────────────────────────────
  // Selects a classification — handles "Other" inline
  // ─────────────────────────────────────────────
  async selectClassification(value) {
    await this.classificationDropdown.waitFor({ state: 'visible' });
    await this.classificationDropdown.selectOption({ label: value });
    if (value === 'Other') {
      await this.classificationDescription.waitFor({ state: 'visible' });
      await this.classificationDescription.fill('Other');
      await this.classificationDescription.press('Tab');
    }
  }

  // ─────────────────────────────────────────────
  // Selects a specialty — handles "Other" inline
  // ─────────────────────────────────────────────
  async selectSpecialty(value) {
    await this.specialtyDropdown.waitFor({ state: 'visible' });
    await this.specialtyDropdown.selectOption({ label: value });
    if (value === 'Other') {
      await this.specialtyDescription.waitFor({ state: 'visible' });
      await this.specialtyDescription.fill('Other');
      await this.specialtyDescription.press('Tab');
    }
  }

  // ─────────────────────────────────────────────
  // Selects a state by display name e.g. 'Alabama'
  // ─────────────────────────────────────────────
  async selectState(stateDisplayName) {
    await this.stateDropdown.waitFor({ state: 'visible' });
    await this.stateDropdown.selectOption({ label: stateDisplayName });
  }

  async selectAudited(value) {
    await this.auditedDropdown.waitFor({ state: 'visible' });
    await this.auditedDropdown.selectOption({ label: value });
  }

  async selectDivision(value) {
    await this.divisionDropdown.waitFor({ state: 'visible' });
    await this.divisionDropdown.selectOption({ label: value });
  }

  async selectSigned(value) {
    await this.signedDropdown.waitFor({ state: 'visible' });
    await this.signedDropdown.selectOption({ label: value });
  }

  async fillExternalID(value) {
    await this.externalID.waitFor({ state: 'visible' });
    await this.externalID.fill(value);
  }

  // ─────────────────────────────────────────────
  // Submits the modal and waits for the full close sequence:
  // submit click → submit hidden → spinner hidden → close click → modal hidden
  // Pass the modal's own locator so the final wait targets the right element.
  // ─────────────────────────────────────────────
  async submitAndClose(modalLocator) {
    await this.submitButton.waitFor({ state: 'visible' });
    await this.submitButton.click();
    await this.submitButton.waitFor({ state: 'hidden', timeout: 16000 });
    await this.overlaySpinner.waitFor({ state: 'hidden', timeout: 20000 });
    await this.closeButton.waitFor({ state: 'visible' });
    await this.closeButton.click();
    if (modalLocator) {
      await modalLocator.waitFor({ state: 'hidden' });
    }
  }

  // ─────────────────────────────────────────────
  // Verifies required field values are selected and
  // that no dropdown contains duplicate options
  // ─────────────────────────────────────────────
  async verifyRequiredFields({ contentType, subCategory, state, classification } = {}) {
    if (contentType) {
      await expect(this.contentTypeDropdown).toHaveValue(contentType);
    }
    if (subCategory) {
      await expect(this.subCategoryDropdown).toHaveValue(subCategory);
      await this._assertNoDuplicates(this.subCategoryDropdown);
    }
    if (state) {
      await expect(this.stateDropdown).toHaveValue(state);
      await this._assertNoDuplicates(this.stateDropdown);
    }
    if (classification) {
      await expect(this.classificationDropdown).toHaveValue(classification);
      await this._assertNoDuplicates(this.classificationDropdown);
    }
  }

  // ─────────────────────────────────────────────
  // Verifies each optional field from ContentTypeNames
  // optional[] array is visible in the modal.
  // Usage: await modal.verifyOptionalFields(ContentTypeNames.DEARegistrationCopy.optional)
  // ─────────────────────────────────────────────
  async verifyOptionalFields(optionalFields = []) {
    for (const fieldLabel of optionalFields) {
      const locator = this._optionalFieldLocators[fieldLabel];
      if (locator) {
        await expect(locator).toBeVisible();
      }
    }
  }

  // ─────────────────────────────────────────────
  // Asserts no duplicate options exist in a dropdown
  // ─────────────────────────────────────────────
  async _assertNoDuplicates(dropdownLocator) {
    const options = await dropdownLocator.locator('option').allTextContents();
    const unique = new Set(options);
    expect(options.length).toBe(unique.size);
  }
}

module.exports = { BaseModal };