const { test, expect }             = require('../../fixtures/base.fixture');
const { DmsApiClient }             = require('../../api/clients/DmsApiClient');
const { uploadWithNoRequest, makeRequest, uploadToRequest } = require('../../helpers/documentActions');
const { Categories }          = require('../../test-data/enums/Categories');
const { ContentTypeNames }    = require('../../test-data/enums/ContentTypes');
const { DocumentStatus }      = require('../../test-data/enums/DocumentStatus');
const { SubCategory }         = require('../../test-data/enums/SubCategory');
const { Classification }      = require('../../test-data/enums/Classification');
const { State }               = require('../../test-data/enums/State');
const { Signed }              = require('../../test-data/enums/Signed');
const { Division }            = require('../../test-data/enums/Division');
const { PageEnum }            = require('../../test-data/enums/PageEnum');
const { TestEntityIds }       = require('../../test-data/enums/TestEntityIds');

const dmsApiClient = new DmsApiClient();
const entityId     = TestEntityIds.DR_TEST_TEST_PROVIDER.entityId;

// ─────────────────────────────────────────────────────────────
// Suite
// ─────────────────────────────────────────────────────────────

test.describe('Categories', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage(
      entityId,
      PageEnum.provider,
      Division.CHS
    );
  });

  test.afterEach(async () => {
    await dmsApiClient.deleteAllDocumentsForEntity(entityId);
  });

  // ─────────────────────────────────────────────
  // Upload — no request
  // ─────────────────────────────────────────────

  test.describe('Upload without request', () => {

    test('CV — Curriculum Vitae', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.CV, contentType: ContentTypeNames.CurriculumVitae }
      );
    });

    test('Health Records — Employment Verification', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.HealthRecordsAndEmploymentScreening, contentType: ContentTypeNames.EmploymentVerification }
      );
    });

    test('Proof of Identity — Drivers License', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.ProofOfIdentity, contentType: ContentTypeNames.DriversLicense }
      );
    });

    test('Work Gap Military History — Military Service', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.MilitaryService, subCategory: SubCategory.DD214 }
      );
    });

    test('Education Training Certifications — Education and Training', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.EducationTrainingCertifications, contentType: ContentTypeNames.EducationAndTraining, subCategory: SubCategory.MedicalSchoolCertificate }
      );
    });

    test('Professional Licensure — DEA Registration', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.ProfessionalLicensure, contentType: ContentTypeNames.DEARegistrationCopy, subCategory: SubCategory.DEAFeeExempt, state: State.Alabama }
      );
    });

    test('Professional Liability — Certificate of Insurance Non-CHG', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.ProfessionalLiability, contentType: ContentTypeNames.CertificateOfInsuranceNonCHGCOI }
      );
    });

    test('Work Gap Military History — Work History', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.WorkHistory }
      );
    });

    test('Provider Internal Credentialing — List of Professional References', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.ProviderInternalCredentialing, contentType: ContentTypeNames.ListOfProfessionalReferences }
      );
    });

    test('Provider Hospital Privileging — Procedure Logs', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.ProviderHospitalPrivilegingAndLicensing, contentType: ContentTypeNames.ProcedureLogs }
      );
    });

    test('Job and Assignment — Assignment Confirmation Letter', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.JobAndAssignment, contentType: ContentTypeNames.AssignmentConfirmationLetter, signed: Signed.Y }
      );
    });

    test('Financial Tax — W2 expects APPROVED status', async ({ homePage, uploadModal, categoryComponent }) => {
      await uploadWithNoRequest(
        { homePage, uploadModal, categoryComponent },
        { category: Categories.FinancialTax, contentType: ContentTypeNames.W2, expectedStatus: DocumentStatus.Approved }
      );
    });

  });

  // ─────────────────────────────────────────────
  // Request only
  // ─────────────────────────────────────────────

  test.describe('Request', () => {

    test('CV', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.CV }
      );
    });

    test('Health Records — Health Screening Testing and Titers', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.HealthRecordsAndEmploymentScreening, contentType: ContentTypeNames.HealthScreeningTestingAndTiters, classification: Classification.Covid19 }
      );
    });

    test('Proof of Identity — Drivers License', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.ProofOfIdentity, contentType: ContentTypeNames.DriversLicense }
      );
    });

    test('Work Gap Military History — Military Service', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.MilitaryService, subCategory: SubCategory.DD214 }
      );
    });

    test('Education Training Certifications — Education and Training', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.EducationTrainingCertifications, contentType: ContentTypeNames.EducationAndTraining, subCategory: SubCategory.ResidencyCertificate }
      );
    });

    test('Professional Licensure — DEA Registration', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.ProfessionalLicensure, contentType: ContentTypeNames.DEARegistrationCopy, subCategory: SubCategory.DEARelease, state: State.Alabama }
      );
    });

    test('Professional Liability — Certificate of Insurance Non-CHG', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.ProfessionalLiability, contentType: ContentTypeNames.CertificateOfInsuranceNonCHGCOI }
      );
    });

    test('Work Gap Military History — Work History', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.WorkHistory }
      );
    });

    test('Provider Internal Credentialing — List of Professional References', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.ProviderInternalCredentialing, contentType: ContentTypeNames.ListOfProfessionalReferences }
      );
    });

    test('Provider Hospital Privileging — Procedure Logs', async ({ homePage, requestModal, categoryComponent }) => {
      await makeRequest(
        { homePage, requestModal, categoryComponent },
        { category: Categories.ProviderHospitalPrivilegingAndLicensing, contentType: ContentTypeNames.ProcedureLogs }
      );
    });

  });

  // ─────────────────────────────────────────────
  // Request then upload
  // ─────────────────────────────────────────────

  test.describe('Upload to request', () => {

    test('CV', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.CV }
      );
    });

    test('Health Records — Health Screening Testing and Titers', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.HealthRecordsAndEmploymentScreening, contentType: ContentTypeNames.HealthScreeningTestingAndTiters, classification: Classification.Covid19 }
      );
    });

    test('Proof of Identity — Drivers License', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.ProofOfIdentity, contentType: ContentTypeNames.DriversLicense }
      );
    });

    test('Work Gap Military History — Military Service', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.MilitaryService, subCategory: SubCategory.DD214 }
      );
    });

    test('Education Training Certifications — Board Certification Secondary', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.EducationTrainingCertifications, contentType: ContentTypeNames.BoardCertificationSecondary, classification: Classification.ComplianceOfficer }
      );
    });

    test('Education Training Certifications — Education and Training', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.EducationTrainingCertifications, contentType: ContentTypeNames.EducationAndTraining, subCategory: SubCategory.ResidencyCertificate }
      );
    });

    test('Professional Licensure — DEA Registration', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.ProfessionalLicensure, contentType: ContentTypeNames.DEARegistrationCopy, subCategory: SubCategory.DEARelease, state: State.Alabama }
      );
    });

    test('Provider Internal Credentialing — List of Professional References', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.ProviderInternalCredentialing, contentType: ContentTypeNames.ListOfProfessionalReferences }
      );
    });

    test('Provider Hospital Privileging — Procedure Logs', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.ProviderHospitalPrivilegingAndLicensing, contentType: ContentTypeNames.ProcedureLogs }
      );
    });

    test('Professional Liability — Certificate of Insurance Non-CHG', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.ProfessionalLiability, contentType: ContentTypeNames.CertificateOfInsuranceNonCHGCOI }
      );
    });

    test('Work Gap Military History — Work History', async ({ homePage, requestModal, uploadModal, categoryComponent }) => {
      await uploadToRequest(
        { homePage, requestModal, uploadModal, categoryComponent },
        { category: Categories.WorkGapMilitaryHistory, contentType: ContentTypeNames.WorkHistory }
      );
    });

  });

});