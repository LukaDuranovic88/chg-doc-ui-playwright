const { test, expect } = require('../../fixtures/base.fixture');
const { Categories } = require('../../test-data/enums/Categories');
const { ContentTypeNames } = require('../../test-data/enums/ContentTypes');
const { TestEntityIds } = require('../../test-data/enums/TestEntityIds');
const { TestMultiEntityIds, buildEntityParam } = require('../../test-data/enums/TestMultiEntityIds');
const { Division } = require('../../test-data/enums/Division');
const { PageEnum } = require('../../test-data/enums/PageEnum');

const ROGER_PROVIDER = TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId;

// ─────────────────────────────────────────────────────────────
// Helper — open upload modal, verify content types, go back
// ─────────────────────────────────────────────────────────────
async function verifyContentTypes(homePage, uploadModal, category, expectedTypes) {
  await homePage.openUploadModal();
  await uploadModal.openCategory(category);
  const actual = await uploadModal.getContentTypes();
  expect(actual).toHaveLength(expectedTypes.length);
  expect(actual).toEqual(expect.arrayContaining(expectedTypes));
  await uploadModal.clickBackButton();
}

// ─────────────────────────────────────────────────────────────
// Helper — open upload modal, verify sub-category count, go back
// ─────────────────────────────────────────────────────────────
async function verifySubCategoryCount(homePage, uploadModal, category, contentType, expectedCount) {
  await homePage.openUploadModal();
  await uploadModal.openCategory(category);
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
    await homePage.openHomePage(
      ROGER_PROVIDER,
      PageEnum.provider,
      Division.CHS
    );
    await verifyContentTypes(homePage, uploadModal, Categories.HousingAndTravel.displayName, [
      ContentTypeNames.Airfare.displayName,
      ContentTypeNames.TravelItinerary.displayName,
      ContentTypeNames.HotelFolio.displayName,
      ContentTypeNames.CarRental.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.JobAndAssignment.displayName, [
      ContentTypeNames.JobPracticeDescription.displayName,
      ContentTypeNames.AssignmentConfirmationLetter.displayName,
      ContentTypeNames.MealBreakWaiverFormCompleted.displayName,
      ContentTypeNames.QAEval.displayName,
      ContentTypeNames.JobAndAssignmentSupportDocuments.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.ProviderHospitalPrivilegingAndLicensing.displayName, [
      ContentTypeNames.LicensePreFill.displayName,
      ContentTypeNames.ProcedureLogs.displayName,
      ContentTypeNames.PowerOfAttorneyPOA.displayName,
      ContentTypeNames.HospitalPrivilegingPreFill.displayName,
      ContentTypeNames.CompletedLICApp.displayName,
      ContentTypeNames.CompletedHPApp.displayName,
      ContentTypeNames.ProviderHPAndLicensingSupportDocuments.displayName,
      ContentTypeNames.HPApprovalLetter.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.ProfessionalLiability.displayName, [
      ContentTypeNames.MalpracticeDocumentation.displayName,
      ContentTypeNames.LegalDocumentationExcludingMalpractice.displayName,
      ContentTypeNames.CertificateOfInsuranceCHGCOI.displayName,
      ContentTypeNames.CertificateOfInsuranceNonCHGCOI.displayName,
      ContentTypeNames.ProfessionalLiabilitySupportDocuments.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.ProofOfIdentity.displayName, [
      ContentTypeNames.BirthCertificate.displayName,
      ContentTypeNames.SocialSecurityCard.displayName,
      ContentTypeNames.DriversLicense.displayName,
      ContentTypeNames.ProfessionalPhoto.displayName,
      ContentTypeNames.Passport.displayName,
      ContentTypeNames.EmploymentAuthorizationCardVisa.displayName,
      ContentTypeNames.NationalProviderIdentifier.displayName,
      ContentTypeNames.CertificateOfNaturalization.displayName,
      ContentTypeNames.ProofOfIdentitySupportDocuments.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.HealthRecordsAndEmploymentScreening.displayName, [
      ContentTypeNames.HealthScreeningTestingAndTiters.displayName,
      ContentTypeNames.AHCAaffidavitAndPrivacyRelease.displayName,
      ContentTypeNames.AHCAfingerprintResults.displayName,
      ContentTypeNames.ProviderHealthStatementMedicalClearance.displayName,
      ContentTypeNames.DrugTestDocumentation.displayName,
      ContentTypeNames.EmploymentVerification.displayName,
      ContentTypeNames.ImmunizationVaccinationRecords.displayName,
      ContentTypeNames.ColorVision.displayName,
      ContentTypeNames.CHGCOVIDExemptionLetter.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.EducationTrainingCertifications.displayName, [
      ContentTypeNames.EducationAndTraining.displayName,
      ContentTypeNames.BoardCertificationSecondary.displayName,
      ContentTypeNames.MembershipToProfessionalSociety.displayName,
      ContentTypeNames.ContinuingMedicalEducationCME.displayName,
      ContentTypeNames.LifeSupportAndMiscCertifications.displayName,
      ContentTypeNames.ChildAbuseCertification.displayName,
      ContentTypeNames.EducationTrainingSupportDocuments.displayName,
      ContentTypeNames.HarassmentTrainingCertificate.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.ProfessionalLicensure.displayName, [
      ContentTypeNames.DEARegistrationCopy.displayName,
      ContentTypeNames.LicensingExams.displayName,
      ContentTypeNames.StateControlledSubstanceRegistrationSecondary.displayName,
      ContentTypeNames.StateLicensureCopy.displayName,
      ContentTypeNames.LicensureSupportDocuments.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.WorkGapMilitaryHistory.displayName, [
      ContentTypeNames.WorkHistory.displayName,
      ContentTypeNames.ClarificationsExcludingHistoryGapsMalpractice.displayName,
      ContentTypeNames.ExplanationOfGapsInHistory.displayName,
      ContentTypeNames.MilitaryService.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.ProviderInternalCredentialing.displayName, [
      ContentTypeNames.FOXSkills.displayName,
      ContentTypeNames.ApprovedSkills.displayName,
      ContentTypeNames.AuthorizationAndRelease.displayName,
      ContentTypeNames.ProfessionalLettersOfReference.displayName,
      ContentTypeNames.ListOfProfessionalReferences.displayName,
      ContentTypeNames.ReferencesObtainedByCHG.displayName,
      ContentTypeNames.ProviderApplication.displayName,
      ContentTypeNames.ClinicalCapabilities.displayName,
      ContentTypeNames.NationalPractitionerDataBankNPDBSelfQuery.displayName,
      ContentTypeNames.CredentialingVerifyingOfficeCVOQuery.displayName,
      ContentTypeNames.HospitalPrivilegeVerification.displayName,
      ContentTypeNames.CredentialingProfileDelegated.displayName,
      ContentTypeNames.PrimarySourceVerificationPSV.displayName,
      ContentTypeNames.CriminalBackgroundCheckResults.displayName,
      ContentTypeNames.PhysicianHealthProgramPHPContract.displayName,
      ContentTypeNames.Explanation.displayName,
      ContentTypeNames.TravelingHandbookAcknowledgment.displayName,
      ContentTypeNames.ProviderApprovalSummary.displayName,
      ContentTypeNames.CredentialingSupportDocuments.displayName,
      ContentTypeNames.CriminalBackgroundRelease.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.Contracts.displayName, [
      ContentTypeNames.ProviderAgreement.displayName,
      ContentTypeNames.ProviderAmendment.displayName,
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.FinancialTax.displayName, [
      ContentTypeNames.W2.displayName,
      ContentTypeNames.W9.displayName,
      ContentTypeNames.tenNinetyNine.displayName,
      ContentTypeNames.DirectDeposit.displayName,
      ContentTypeNames.PermanentTaxResidenceFormCompleted.displayName,
      // ContentTypeNames.DeferredCompensationAgreement.displayName,clear
    ]);
    await verifyContentTypes(homePage, uploadModal, Categories.PayStubs.displayName, [
      ContentTypeNames.Paystubs.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 2 — Provider GMI — International category
  // ─────────────────────────────────────────────────────────────
  test('Provider GMI - International content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId,
      PageEnum.provider,
      Division.GMI
    );
    await verifyContentTypes(homePage, uploadModal, Categories.International.displayName, [
      ContentTypeNames.INTLEnglishProficiency.displayName,
      ContentTypeNames.INTLImmigration.displayName,
      ContentTypeNames.INTLMedicalRegistration.displayName,
      ContentTypeNames.JobOffer.displayName,
      ContentTypeNames.INTLTaxInformation.displayName,
      ContentTypeNames.InternationalMedicalDefense.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 3 — Provider GMI — Provider Internal Credentialing
  // ─────────────────────────────────────────────────────────────
  test('Provider GMI - Provider Internal Credentialing content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId,
      PageEnum.provider,
      Division.GMI
    );
    await verifyContentTypes(homePage, uploadModal, Categories.ProviderInternalCredentialing.displayName, [
      ContentTypeNames.ProfessionalLettersOfReference.displayName,
      ContentTypeNames.ClinicalCapabilities.displayName,
      ContentTypeNames.AuthorizationAndRelease.displayName,
      ContentTypeNames.HospitalPrivilegeVerification.displayName,
      ContentTypeNames.Explanation.displayName,
      ContentTypeNames.FOXSkills.displayName,
      ContentTypeNames.ProviderApplication.displayName,
      ContentTypeNames.GMSApprovalInternationalOnly.displayName,
      ContentTypeNames.ApprovedSkills.displayName,
      ContentTypeNames.ListOfProfessionalReferences.displayName,
      ContentTypeNames.CredentialingProfileDelegated.displayName,
      ContentTypeNames.ReferencesObtainedByCHG.displayName,
      ContentTypeNames.PhysicianHealthProgramPHPContract.displayName,
      ContentTypeNames.CriminalBackgroundCheckResults.displayName,
      ContentTypeNames.CredentialingVerifyingOfficeCVOQuery.displayName,
      ContentTypeNames.PrimarySourceVerificationPSV.displayName,
      ContentTypeNames.CriminalBackgroundRelease.displayName,
      ContentTypeNames.NationalPractitionerDataBankNPDBSelfQuery.displayName,
      ContentTypeNames.ProviderApprovalSummary.displayName,
      ContentTypeNames.CredentialingSupportDocuments.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 4 — Opportunity CHS
  // ─────────────────────────────────────────────────────────────
  test('Opportunity CHS - Job and Assignment content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      TestEntityIds.OPPORTUNITY_PAGE.entityId,
      PageEnum.opportunity,
      Division.CHS
    );
    await verifyContentTypes(homePage, uploadModal, Categories.JobAndAssignment.displayName, [
      ContentTypeNames.JobPracticeDescription.displayName,
      ContentTypeNames.JobRequestDetails.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 5 — Assignment CHS — all categories
  // ─────────────────────────────────────────────────────────────
  test.describe('Assignment CHS', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(
        TestEntityIds.ASSIGNMENT_PAGE.entityId,
        PageEnum.assignment,
        Division.CHS
      );
    });

    test('Job and Assignment content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.JobAndAssignment.displayName, [
        ContentTypeNames.OrientationInformation.displayName,
        ContentTypeNames.ConfirmationChecklist.displayName,
        ContentTypeNames.AssignmentConfirmationLetter.displayName,
        ContentTypeNames.MealBreakWaiverFormCompleted.displayName,
        ContentTypeNames.JobAndAssignmentSupportDocuments.displayName,
      ]);
    });

    test('Housing and Travel content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.HousingAndTravel.displayName, [
        ContentTypeNames.RentalCarIncident.displayName,
        ContentTypeNames.HousingKeyRelease.displayName,
        ContentTypeNames.HousingLease.displayName,
        ContentTypeNames.HousingMoveInInstructions.displayName,
        ContentTypeNames.HousingRulesAndRegulations.displayName,
        ContentTypeNames.MileageMaps.displayName,
        ContentTypeNames.TravelApprovals.displayName,
        ContentTypeNames.TravelExceptions.displayName,
        ContentTypeNames.TravelItinerary.displayName,
        ContentTypeNames.Airfare.displayName,
        ContentTypeNames.CarRental.displayName,
        ContentTypeNames.HotelFolio.displayName,
      ]);
    });

    test('Financial and Tax content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.FinancialTax.displayName, [
        ContentTypeNames.ClientInvoicePacket.displayName,
        ContentTypeNames.PermanentTaxResidenceFormCompleted.displayName,
      ]);
    });

    test('Professional Liability content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.ProfessionalLiability.displayName, [
        ContentTypeNames.CertificateOfInsuranceCHGCOI.displayName,
        ContentTypeNames.CertificateOfInsuranceNonCHGCOI.displayName,
      ]);
    });

    test('Provider Hospital Privileging content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.ProviderHospitalPrivilegingAndLicensing.displayName, [
        ContentTypeNames.HPApprovalLetter.displayName,
      ]);
    });

    test('Contracts content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.Contracts.displayName, [
        ContentTypeNames.ClientAgreements.displayName,
        ContentTypeNames.ClientAddendum.displayName,
        ContentTypeNames.ClientAmendments.displayName,
      ]);
    });

    test('Work Records content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.WorkRecords.displayName, [
        ContentTypeNames.WorkRecord.displayName,
      ]);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Test 6 — Assignment CHA — all categories
  // ─────────────────────────────────────────────────────────────
  test.describe('Assignment CHA', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(
        TestEntityIds.ASSIGNMENT_PAGE.entityId,
        PageEnum.assignment,
        Division.CHA
      );
    });

    test('Job and Assignment content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.JobAndAssignment.displayName, [
        ContentTypeNames.OrientationInformation.displayName,
        ContentTypeNames.MealBreakWaiverFormCompleted.displayName,
        ContentTypeNames.AssignmentConfirmationLetter.displayName,
        ContentTypeNames.JobAndAssignmentSupportDocuments.displayName,
      ]);
    });

    test('Housing and Travel content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.HousingAndTravel.displayName, [
        ContentTypeNames.RentalCarIncident.displayName,
        ContentTypeNames.HousingKeyRelease.displayName,
        ContentTypeNames.HousingLease.displayName,
        ContentTypeNames.HousingMoveInInstructions.displayName,
        ContentTypeNames.HousingPetAgreement.displayName,
        ContentTypeNames.HousingRulesAndRegulations.displayName,
        ContentTypeNames.MileageMaps.displayName,
        ContentTypeNames.TravelApprovals.displayName,
        ContentTypeNames.TravelExceptions.displayName,
        ContentTypeNames.TravelItinerary.displayName,
        ContentTypeNames.HousingStipendForm.displayName,
        ContentTypeNames.Airfare.displayName,
        ContentTypeNames.CarRental.displayName,
        ContentTypeNames.HotelFolio.displayName,
      ]);
    });

    test('Financial and Tax content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.FinancialTax.displayName, [
        ContentTypeNames.ClientInvoicePacket.displayName,
        ContentTypeNames.PermanentTaxResidenceFormCompleted.displayName,
      ]);
    });

    test('Professional Liability content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.ProfessionalLiability.displayName, [
        ContentTypeNames.CertificateOfInsuranceCHGCOI.displayName,
        ContentTypeNames.CertificateOfInsuranceNonCHGCOI.displayName,
      ]);
    });

    test('Contracts content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.Contracts.displayName, [
        ContentTypeNames.PurchaseOrder.displayName,
        ContentTypeNames.ClientAgreements.displayName,
        ContentTypeNames.ClientAddendum.displayName,
        ContentTypeNames.ClientAmendments.displayName,
      ]);
    });

    test('Provider Hospital Privileging content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.ProviderHospitalPrivilegingAndLicensing.displayName, [
        ContentTypeNames.HPApprovalLetter.displayName,
      ]);
    });

    test('Work Records content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.WorkRecords.displayName, [
        ContentTypeNames.WorkRecord.displayName,
      ]);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Test 7 — Client CHS
  // ─────────────────────────────────────────────────────────────
  test.describe('Client CHS', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(
        TestEntityIds.CLIENT_BAYLOR_SCOTT.entityId,
        PageEnum.client,
        Division.CHS
      );
    });

    test('Contracts content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.Contracts.displayName, [
        ContentTypeNames.ClientAgreements.displayName,
        ContentTypeNames.ClientAmendments.displayName,
        ContentTypeNames.ClientAddendum.displayName,
        ContentTypeNames.ReferralAgreement.displayName,
        ContentTypeNames.ClientCancellationLetter.displayName,
        ContentTypeNames.RequestForProposalRFP.displayName,
      ]);
    });

    test('Client Documents content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.ClientDocuments.displayName, [
        ContentTypeNames.ClientPracticeQuestionnaires.displayName,
        ContentTypeNames.ClientSupportingDocuments.displayName,
      ]);
    });

    test('Financial and Tax content types', async ({ homePage, uploadModal }) => {
      await verifyContentTypes(homePage, uploadModal, Categories.FinancialTax.displayName, [
        ContentTypeNames.ClientInvoicePacket.displayName,
        // ClientW9 not visible to default CHS user — requires elevated permissions
      ]);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Test 9 — Client CHA
  // ─────────────────────────────────────────────────────────────
  test('Client CHA - Contracts content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      TestEntityIds.CLIENT_BAYLOR_SCOTT.entityId,
      PageEnum.client,
      Division.CHA
    );
    await verifyContentTypes(homePage, uploadModal, Categories.Contracts.displayName, [
      ContentTypeNames.ClientAgreements.displayName,
      ContentTypeNames.ClientAmendments.displayName,
      ContentTypeNames.ClientAddendum.displayName,
      ContentTypeNames.RequestForProposalRFP.displayName,
      ContentTypeNames.PurchaseOrder.displayName,
      ContentTypeNames.ReferralAgreement.displayName,
      ContentTypeNames.ClientCancellationLetter.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 10 — Sub-category counts
  // ─────────────────────────────────────────────────────────────
  test.describe('Sub-category counts', () => {
    test.beforeEach(async ({ homePage }) => {
      await homePage.openHomePage(
        TestEntityIds.ROGER_RECRUIT2_PROVIDER.entityId,
        PageEnum.provider,
        Division.CHS
      );
    });

    test('Education and Training has 10 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.EducationTrainingCertifications.displayName, ContentTypeNames.EducationAndTraining.displayName, 10);
    });

    test('Life Support and Misc Certifications has 9 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.EducationTrainingCertifications.displayName, ContentTypeNames.LifeSupportAndMiscCertifications.displayName, 9);
    });

    test('Licensing Exams has 5 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.ProfessionalLicensure.displayName, ContentTypeNames.LicensingExams.displayName, 5);
    });

    test('Malpractice Documentation has 6 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.ProfessionalLiability.displayName, ContentTypeNames.MalpracticeDocumentation.displayName, 6);
    });

    test('Military Service has 3 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.WorkGapMilitaryHistory.displayName, ContentTypeNames.MilitaryService.displayName, 3);
    });

    test('Provider Amendment has 7 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.Contracts.displayName, ContentTypeNames.ProviderAmendment.displayName, 7);
    });

    test('Provider Agreement has 5 sub-categories', async ({ homePage, uploadModal }) => {
      await verifySubCategoryCount(homePage, uploadModal, Categories.Contracts.displayName, ContentTypeNames.ProviderAgreement.displayName, 5);
    });
  });

  // ─────────────────────────────────────────────────────────────
  // Test 12 — Pay Bill Summary CHS
  // ─────────────────────────────────────────────────────────────
  test('Pay Bill Summary CHS - Work Records content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      TestEntityIds.ROGER_RECRUIT_PROVIDER.entityId,
      PageEnum.pay_bill_summary,
      Division.CHS
    );
    await verifyContentTypes(homePage, uploadModal, Categories.WorkRecords.displayName, [
      ContentTypeNames.WorkRecord.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 13 — Pay Bill Summary CHS multi-entities
  // ─────────────────────────────────────────────────────────────
  test('Pay Bill Summary CHS multi-entities - Work Records content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      buildEntityParam(TestMultiEntityIds.PAY_BILL_SUMMARY_MULTIPLE_ENTITIES),
      PageEnum.pay_bill_summary,
      Division.CHS
    );
    await verifyContentTypes(homePage, uploadModal, Categories.WorkRecords.displayName, [
      ContentTypeNames.WorkRecord.displayName,
    ]);
  });

  // ─────────────────────────────────────────────────────────────
  // Test 14 — Assignment CHS multi-entities
  // ─────────────────────────────────────────────────────────────
  test('Assignment CHS multi-entities - Job and Assignment content types', async ({ homePage, uploadModal }) => {
    await homePage.openHomePage(
      buildEntityParam(TestMultiEntityIds.ASSIGNMENT_MULTIPLE_ENTITIES),
      PageEnum.assignment,
      Division.CHS
    );
    await verifyContentTypes(homePage, uploadModal, Categories.JobAndAssignment.displayName, [
      ContentTypeNames.AssignmentConfirmationLetter.displayName,
      ContentTypeNames.MealBreakWaiverFormCompleted.displayName,
      ContentTypeNames.ConfirmationChecklist.displayName,
      ContentTypeNames.OrientationInformation.displayName,
      ContentTypeNames.JobAndAssignmentSupportDocuments.displayName,
    ]);
  });

});