const { test, expect } = require('../../fixtures/base.fixture');
const { Categories } = require('../../test-data/enums/Categories');
const { ContentTypeNames } = require('../../test-data/enums/ContentTypes');
const { TestEntityIds } = require('../../test-data/enums/TestEntityIds');
const { TestMultiEntityIds, buildEntityParam } = require('../../test-data/enums/TestMultiEntityIds');
const { Division } = require('../../test-data/enums/Division');
const { PageEnum } = require('../../test-data/enums/PageEnum');
const { getContentTypesByCategory } = require('../../test-data/enums/PageDivisionMap');

const ROGER_PROVIDER = TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId;

// ─────────────────────────────────────────────────────────────
// Helper — derive expected display names from enum for a
// given (page, division, category) combo, open the upload
// modal, assert UI matches, then go back.
// ─────────────────────────────────────────────────────────────
async function verifyContentTypes(homePage, uploadModal, page, division, category) {
  const expected = getContentTypesByCategory(page, division, category)
    .map((ct) => ct.displayName);

  await homePage.openUploadModal();
  await uploadModal.openCategory(category.displayName);
  const actual = await uploadModal.getContentTypes();
  expect(actual).toHaveLength(expected.length);
  expect(actual).toEqual(expect.arrayContaining(expected));
  await uploadModal.clickBackButton();
}

// ─────────────────────────────────────────────────────────────
// Helper — open upload modal, verify sub-category count, go back
// ─────────────────────────────────────────────────────────────
async function verifySubCategoryCount(homePage, uploadModal, category, contentType, expectedCount) {
  await homePage.openUploadModal();
  await uploadModal.openCategory(category.displayName);
  await uploadModal.selectContentType(contentType);
  const subCategories = await uploadModal.getSubCategories();
  expect(subCategories).toHaveLength(expectedCount);
  await uploadModal.clickBackButton();
}

test.describe('Content Type Smoke Tests', () => {

  // ─────────────────────────────────────────────────────────────
  // Test 1 — Provider CHS — all categories
  // ─────────────────────────────────────────────────────────────
  test('Provider CHS - all content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(ROGER_PROVIDER, PageEnum.provider, Division.CHS);

    const categoriesToVerify = [
      Categories.HousingAndTravel,
      Categories.JobAndAssignment,
      Categories.ProviderHospitalPrivilegingAndLicensing,
      Categories.ProfessionalLiability,
      Categories.ProofOfIdentity,
      Categories.HealthRecordsAndEmploymentScreening,
      Categories.EducationTrainingCertifications,
      Categories.ProfessionalLicensure,
      Categories.WorkGapMilitaryHistory,
      Categories.ProviderInternalCredentialing,
      Categories.Contracts,
      Categories.FinancialTax,
      Categories.PayStubs,
    ];

    for (const category of categoriesToVerify) {
      await verifyContentTypes(homePage, uploadModal, PageEnum.provider, Division.CHS, category);
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Test 2 — Provider GMI — International category
  // ─────────────────────────────────────────────────────────────
  test('Provider GMI - International content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(ROGER_PROVIDER, PageEnum.provider, Division.GMI);
    await verifyContentTypes(homePage, uploadModal, PageEnum.provider, Division.GMI, Categories.International);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 3 — Provider GMI — Provider Internal Credentialing
  // ─────────────────────────────────────────────────────────────
  test('Provider GMI - Provider Internal Credentialing content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(ROGER_PROVIDER, PageEnum.provider, Division.GMI);
    await verifyContentTypes(homePage, uploadModal, PageEnum.provider, Division.GMI, Categories.ProviderInternalCredentialing);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 4 — Opportunity CHS
  // ─────────────────────────────────────────────────────────────
  test('Opportunity CHS - Job and Assignment content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(TestEntityIds.OPPORTUNITY_PAGE.entityId, PageEnum.opportunity, Division.CHS);
    await verifyContentTypes(homePage, uploadModal, PageEnum.opportunity, Division.CHS, Categories.JobAndAssignment);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 5 — Assignment CHS — all categories
  // ─────────────────────────────────────────────────────────────
  test.describe('Assignment CHS', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(TestEntityIds.ASSIGNMENT_PAGE.entityId, PageEnum.assignment, Division.CHS);
    });

    const assignmentCHSCategories = [
      Categories.JobAndAssignment,
      Categories.HousingAndTravel,
      Categories.FinancialTax,
      Categories.ProfessionalLiability,
      Categories.ProviderHospitalPrivilegingAndLicensing,
      Categories.Contracts,
      Categories.WorkRecords,
    ];

    for (const category of assignmentCHSCategories) {
      test(`${category.displayName} content types`, async ({ homePage, uploadModal }) => {
        await verifyContentTypes(homePage, uploadModal, PageEnum.assignment, Division.CHS, category);
      });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Test 6 — Assignment CHA — all categories
  // ─────────────────────────────────────────────────────────────
  test.describe('Assignment CHA', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(TestEntityIds.ASSIGNMENT_PAGE.entityId, PageEnum.assignment, Division.CHA);
    });

    const assignmentCHACategories = [
      Categories.JobAndAssignment,
      Categories.HousingAndTravel,
      Categories.FinancialTax,
      Categories.ProfessionalLiability,
      Categories.Contracts,
      Categories.ProviderHospitalPrivilegingAndLicensing,
      Categories.WorkRecords,
    ];

    for (const category of assignmentCHACategories) {
      test(`${category.displayName} content types`, async ({ homePage, uploadModal }) => {
        await verifyContentTypes(homePage, uploadModal, PageEnum.assignment, Division.CHA, category);
      });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Test 7 — Client CHS
  // ─────────────────────────────────────────────────────────────
  test.describe('Client CHS', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(TestEntityIds.CLIENT_BAYLOR_SCOTT.entityId, PageEnum.client, Division.CHS);
    });

    const clientCHSCategories = [
      Categories.Contracts,
      Categories.ClientDocuments,
      Categories.FinancialTax,
    ];

    for (const category of clientCHSCategories) {
      test(`${category.displayName} content types`, async ({ homePage, uploadModal }) => {
        await verifyContentTypes(homePage, uploadModal, PageEnum.client, Division.CHS, category);
      });
    }
  });

  // ─────────────────────────────────────────────────────────────
  // Test 9 — Client CHA
  // ─────────────────────────────────────────────────────────────
  test('Client CHA - Contracts content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(TestEntityIds.CLIENT_BAYLOR_SCOTT.entityId, PageEnum.client, Division.CHA);
    await verifyContentTypes(homePage, uploadModal, PageEnum.client, Division.CHA, Categories.Contracts);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 10 — Sub-category counts
  // ─────────────────────────────────────────────────────────────
  test.describe('Sub-category counts', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(TestEntityIds.ROGER_RECRUIT2_PROVIDER.entityId, PageEnum.provider, Division.CHS);
    });

    test('Education and Training has 10 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.EducationTrainingCertifications, ContentTypeNames.EducationAndTraining.displayName, 10);
    });

    test('Life Support and Misc Certifications has 9 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.EducationTrainingCertifications, ContentTypeNames.LifeSupportAndMiscCertifications.displayName, 9);
    });

    test('Licensing Exams has 5 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.ProfessionalLicensure, ContentTypeNames.LicensingExams.displayName, 5);
    });

    test('Malpractice Documentation has 6 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.ProfessionalLiability, ContentTypeNames.MalpracticeDocumentation.displayName, 6);
    });

    test('Military Service has 3 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.WorkGapMilitaryHistory, ContentTypeNames.MilitaryService.displayName, 3);
    });

    test('Provider Amendment has 7 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.Contracts, ContentTypeNames.ProviderAmendment.displayName, 7);
    });

    test('Provider Agreement has 5 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.Contracts, ContentTypeNames.ProviderAgreement.displayName, 5);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Test 12 — Pay Bill Summary CHS
  // ─────────────────────────────────────────────────────────────
  test('Pay Bill Summary CHS - Work Records content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(ROGER_PROVIDER, PageEnum.pay_bill_summary, Division.CHS);
    await verifyContentTypes(homePage, uploadModal, PageEnum.pay_bill_summary, Division.CHS, Categories.WorkRecords);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 13 — Pay Bill Summary CHS multi-entities
  // ─────────────────────────────────────────────────────────────
  test('Pay Bill Summary CHS multi-entities - Work Records content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(buildEntityParam(TestMultiEntityIds.PAY_BILL_SUMMARY_MULTIPLE_ENTITIES), PageEnum.pay_bill_summary, Division.CHS);
    await verifyContentTypes(homePage, uploadModal, PageEnum.pay_bill_summary, Division.CHS, Categories.WorkRecords);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 14 — Assignment CHS multi-entities
  // ─────────────────────────────────────────────────────────────
  test('Assignment CHS multi-entities - Job and Assignment content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(buildEntityParam(TestMultiEntityIds.ASSIGNMENT_MULTIPLE_ENTITIES), PageEnum.assignment, Division.CHS);
    await verifyContentTypes(homePage, uploadModal, PageEnum.assignment, Division.CHS, Categories.JobAndAssignment);
  });

});