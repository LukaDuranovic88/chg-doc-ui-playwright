// npx playwright test tests/ui/vq.spec.js
// npx playwright codegen --load-storage='.auth/cssuser.json' --ignore-https-errors 'https://localhost:8081/#/verification-queue?page=verification-queue&division=CHG'
// npx playwright test tests/ui/vq.spec.js --grep "Document with no request transferred to CT with no request" --headed
const { test, expect } = require('../../fixtures/base.fixture');
const { ContentTypeNames } = require('../../test-data/enums/ContentTypes');
const { Division } = require('../../test-data/enums/Division');
const { PossibleStatus } = require('../../test-data/enums/PossibleStatus');
const { TestEntityIds } = require('../../test-data/enums/TestEntityIds');

const ROGER_PROVIDER = TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId;
const DIVISION = Division.CHS;
const TEAM = 'PDH';
const SPECIALTY = 'Pediatrics';

const corruptedDocxFile = 'corrupted-files/PvvMvQiapTZyGrqTuj9vHdaVweWPV7-metaVHlyb25lQ1YgMS4yMDIyLmRvY3g=- (3).docx.docx';

test.describe('Verification Queue', () => {

  test.afterEach(async ({ api }) => {
    await api.deleteAllDocumentsForEntity(ROGER_PROVIDER);
  });

  // ── vqTableHasExpectedColumns ─────────────────────────────────────────────
  test('Verification Queue table has expected columns', async ({ vqPage }) => {
    await vqPage.open(Division.CHG);
    const columns = await vqPage.getTableColumnNames();
    expect(columns).toEqual(['Division', 'Team', 'Provider Name', 'Primary Specialty', 'Content Type', 'Sub-category', 'Uploaded Date', 'Status']);
    expect(await vqPage.getCurrentDocsPerPage()).toBe('25');
  });

  // ── verifyArchiveAndDeleteButtonsAreEnabled ───────────────────────────────
  test('Document WITHOUT request — Archive and Delete buttons enabled, archive works', async ({ vqPage, api }) => {
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);

    expect(await vqPage.isArchiveBtnEnabled()).toBe(true);
    expect(await vqPage.isDeleteBtnEnabled()).toBe(true);

    await vqPage.clickArchive();
    await vqPage.clickVerify();
    await expect(vqPage.verifiedMessage).toBeVisible();
  });

  // ── verifyArchiveDisabledAndDeleteEnabled ─────────────────────────────────
  test('Document WITH request — Archive button disabled, Delete button enabled, delete works', async ({ vqPage, api }) => {
    const requestId = await api.requestDocumentReturnId(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION);
    await api.uploadDocumentReturnId(requestId, ROGER_PROVIDER, 'test.pdf', ContentTypeNames.CurriculumVitae.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);
    expect(await vqPage.isArchiveBtnEnabled()).toBe(false);
    expect(await vqPage.isDeleteBtnEnabled()).toBe(true);

    await vqPage.clickDelete();
    await vqPage.clickVerify();
    await expect(vqPage.verifiedMessage).toBeVisible();
  });

  // ── test6 — document with no request transferred to CT with no request ────
  test('Document with no request transferred to CT with no request', async ({ vqPage, api }) => {
    const target = ContentTypeNames.BoardCertificationSecondary;
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.DriversLicense.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.DriversLicense.displayName);

    await vqPage.clickEditContentType();
    expect(await vqPage.isTransferButtonDisabled()).toBe(true);
    await vqPage.selectTransferTarget(target.displayName);
    await vqPage.clickTransferButton();
    expect(await vqPage.getSelectedContentType()).toBe(target.displayName);
    await vqPage.closeReviewAndRefresh();

    await vqPage.clearContentTypeFilterAndApply(target.displayName);
    expect(await vqPage.contentTypeInTable.textContent()).toBe(target.displayName);
  });

  // ── test7 — document with request to CT with no request ──────────────────
  test('Document with request transferred to CT with no request', async ({ vqPage, api }) => {
    const target = ContentTypeNames.EducationAndTraining;
    const requestId = await api.requestDocumentReturnId(ROGER_PROVIDER, ContentTypeNames.BirthCertificate.displayName, DIVISION);
    await api.uploadDocumentReturnId(requestId, ROGER_PROVIDER, 'test.pdf', ContentTypeNames.BirthCertificate.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.BirthCertificate.displayName);

    await vqPage.clickEditContentType();
    expect(await vqPage.isTransferButtonDisabled()).toBe(true);
    await vqPage.selectTransferTarget(target.displayName);
    await vqPage.clickTransferButton();
    expect(await vqPage.getSelectedContentType()).toBe(target.displayName);
    await vqPage.closeReviewAndRefresh();

    await vqPage.clearContentTypeFilterAndApply(target.displayName);
    expect(await vqPage.contentTypeInTable.textContent()).toBe(target.displayName);
  });

  // ── test8 — document with NO request to CT with request ──────────────────
  test('Document with no request transferred to CT with request', async ({ vqPage, api }) => {
    const target = ContentTypeNames.ChildAbuseCertification;
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.DriversLicense.displayName, DIVISION);
    await api.requestDocumentReturnId(ROGER_PROVIDER, target.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.DriversLicense.displayName);

    await vqPage.clickEditContentType();
    expect(await vqPage.isTransferButtonDisabled()).toBe(true);
    await vqPage.selectTransferTarget(target.displayName);
    await vqPage.clickTransferWithoutRequest();
    await vqPage.clickTransferButton();
    expect(await vqPage.getSelectedContentType()).toBe(target.displayName);
    await vqPage.closeReviewAndRefresh();

    await vqPage.clearContentTypeFilterAndApply(target.displayName);
    expect(await vqPage.contentTypeInTable.textContent()).toBe(target.displayName);
  });

  // ── test9 — document with request to CT with request ─────────────────────
  test('Document with request transferred to CT with request', async ({ vqPage, api }) => {
    const target = ContentTypeNames.WorkHistory;
    const requestId = await api.requestDocumentReturnId(ROGER_PROVIDER, ContentTypeNames.BirthCertificate.displayName, DIVISION);
    await api.uploadDocumentReturnId(requestId, ROGER_PROVIDER, 'test.pdf', ContentTypeNames.BirthCertificate.displayName, DIVISION);
    await api.requestDocumentReturnId(ROGER_PROVIDER, target.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.BirthCertificate.displayName);

    await vqPage.clickEditContentType();
    expect(await vqPage.isTransferButtonDisabled()).toBe(true);
    await vqPage.selectTransferTarget(target.displayName);
    await vqPage.clickTransferWithRequest();
    await vqPage.clickTransferButton();
    expect(await vqPage.getSelectedContentType()).toBe(target.displayName);
    await vqPage.closeReviewAndRefresh();

    await vqPage.clearContentTypeFilterAndApply(target.displayName);
    expect(await vqPage.contentTypeInTable.textContent()).toBe(target.displayName);
  });

  // ── DM-1933 — corrupted doc/docx disables verify ──────────────────────────
  test('Verify button disabled for corrupted doc and docx files', async ({ vqPage, api }) => {
    await vqPage.open(Division.CHG);
    for (const ext of ['doc', 'docx']) {
      await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION, `corrupted-files/testPdfCorrupted.${ext}`);
      await vqPage.filterAndEditLatestWithError(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);
      expect(await vqPage.isVerifyButtonDisabled()).toBe(true);
      await vqPage.closeReviewAndRefresh();
    }
  });

  // ── DM-1933 — corrupted docx from client disables verify ─────────────────
  test('Verify button disabled for corrupted docx file from client', async ({ vqPage, api }) => {
    await vqPage.open(Division.CHG);
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION, corruptedDocxFile);
    await vqPage.filterAndEditLatestWithError(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);
    expect(await vqPage.isVerifyButtonDisabled()).toBe(true);
  });

  // ── DM-1933 — corrupted docx archive/delete enabled + error message ───────
  test('Archive and Delete enabled and error message shown for corrupted docx', async ({ vqPage, api }) => {
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION, corruptedDocxFile);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatestWithError(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);

    expect(await vqPage.isArchiveBtnEnabled()).toBe(true);
    expect(await vqPage.isDeleteBtnEnabled()).toBe(true);

    const errorMsg = await vqPage.getCorruptedFileErrorMessage();
    expect(errorMsg).toContain('corrupt');
  });

  // ── DM-1933 — Not Accepted button clickable ───────────────────────────────
  test('Not Accepted button is clickable for corrupted docx', async ({ vqPage, api }) => {
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION, corruptedDocxFile);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatestWithError(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);
    await expect(vqPage.notAcceptedBtn).toBeEnabled();
  });

  // ── DM-4006 — Transfer dropdown size ─────────────────────────────────────
  test('VQ transfer dropdown has expected number of content types', async ({ vqPage, api }) => {
    await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.CurriculumVitae.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.CurriculumVitae.displayName);
    await vqPage.clickEditContentType();
    expect(await vqPage.getTransferDropdownOptionCount()).toBe(108);
  });

  // ── DM-4007 — Status after transfer ──────────────────────────────────────

  test('Transfer P to default — status becomes UPLOADED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.Passport.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.Passport.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.DealSheet.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.DEFAULT.code);
  });

  test('Transfer P to APPROVED-F — status becomes APPROVED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.W9.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.W9.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.Airfare.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.APPROVED_F.code);
  });

  test('Transfer PPD to default — status becomes UPLOADED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.ProviderApplication.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.ProviderApplication.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.ProviderAgreement.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.DEFAULT.code);
  });

  test('Transfer PPD to APPROVED-F — status becomes APPROVED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.ColorVision.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.ColorVision.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.Airfare.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.APPROVED_F.code);
  });

  test('Transfer PVA to default — status becomes UPLOADED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.DrugTestDocumentation.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.DrugTestDocumentation.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.ProviderAgreement.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.DEFAULT.code);
  });

  test('Transfer PVA to APPROVED-F — status becomes APPROVED', async ({ vqPage, api }) => {
    const doc = await api.uploadDocumentReturnJson(ROGER_PROVIDER, ContentTypeNames.AHCAfingerprintResults.displayName, DIVISION);
    await vqPage.open(Division.CHG);
    await vqPage.filterAndEditLatest(DIVISION, TEAM, SPECIALTY, ContentTypeNames.AHCAfingerprintResults.displayName);
    await vqPage.clickEditContentType();
    await vqPage.selectTransferTarget(ContentTypeNames.tenNinetyNine.displayName);
    await vqPage.clickTransferButton();
    const resource = await api.getDocumentById(doc.id, DIVISION);
    expect(resource.currentStatus.code).toBe(PossibleStatus.APPROVED_F.code);
  });

});