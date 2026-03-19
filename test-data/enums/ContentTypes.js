const { Categories } = require('./Categories');
const { MetadataFields: M } = require('./MetadataFields');

// ─────────────────────────────────────────────
// CONTENT TYPE NAMES
// Each entry has: displayName, required[], optional[]
// ─────────────────────────────────────────────
const ContentTypeNames = {

  // CV
  CurriculumVitae: { displayName: 'Curriculum Vitae (Resume)', required: [], optional: [] },
  CVSupportDocuments: { displayName: 'CV Support Documents', required: [], optional: [] },

  // Client Uploaded Documents
  RequestDetails: { displayName: 'Request Details', required: [], optional: [] },
  LocumsMartOther: { displayName: 'LocumsMart Other', required: [], optional: [] },

  // Proof of Identity
  BirthCertificate: { displayName: 'Birth Certificate', required: [], optional: [] },
  CertificateOfNaturalization: { displayName: 'Certificate of Naturalization', required: [], optional: [M.IssueDate] },
  DriversLicense: { displayName: "Driver's License/State Issued Identification", required: [], optional: [M.ExpirationDate, M.IssueDate, M.IssuingAuthority] },
  EmploymentAuthorizationCardVisa: { displayName: 'Employment Authorization Card / VISA', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  NationalProviderIdentifier: { displayName: 'National Provider Identifier (NPI)', required: [], optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State] },
  Passport: { displayName: 'Passport', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  ProfessionalPhoto: { displayName: 'Professional Photo', required: [], optional: [] },
  SocialSecurityCard: { displayName: 'Social Security Card', required: [], optional: [] },
  ProofOfIdentitySupportDocuments: { displayName: 'Proof of Identity Support Documents', required: [], optional: [] },

  // Education, Training, Certifications
  EducationAndTraining: { displayName: 'Education and Training', required: [M.SubCategory], optional: [M.Specialty, M.DateTo, M.DateFrom, M.ExpirationDate, M.IssueDate, M.ResultsDate] },
  EducationTrainingSupportDocuments: { displayName: 'Education and Training Support Documents', required: [], optional: [] },
  BoardCertificationSecondary: { displayName: 'Board Certification - Secondary', required: [M.Classification], optional: [M.ExpirationDate, M.IssueDate] },
  ChildAbuseCertification: { displayName: 'Child Abuse Certification', required: [], optional: [M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate] },
  MembershipToProfessionalSociety: { displayName: 'Membership to Professional Society', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  InfectionControlCertificate: { displayName: 'Infection Control Certificate', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  HarassmentTrainingCertificate: { displayName: 'Harassment Training Certificate', required: [], optional: [M.EffectiveDate] },
  ContinuingMedicalEducationCME: { displayName: 'Continuing Medical Education (CME)', required: [], optional: [M.IssueDate] },
  APNationalCertificate: { displayName: 'AP National Certificate', required: [], optional: [M.EffectiveDate, M.ExpirationDate] },
  LifeSupportAndMiscCertifications: { displayName: 'Life Support and Misc. Certifications', required: [M.SubCategory], optional: [M.ExpirationDate, M.IssueDate] },

  // Health Records and Employment Screening
  AHCAaffidavitAndPrivacyRelease: { displayName: 'AHCA Affidavit and Privacy Release', required: [], optional: [M.SignatureDate] },
  AHCAfingerprintResults: { displayName: 'AHCA Fingerprint Results', required: [], optional: [] },
  DrugTestDocumentation: { displayName: 'Drug Test Documentation', required: [], optional: [M.ExpirationDate, M.ResultsDate] },
  EmploymentVerification: { displayName: 'Employment Verification', required: [], optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State] },
  HealthScreeningTestingAndTiters: { displayName: 'Health Screening/Testing & Titers', required: [M.Classification], optional: [M.ExpirationDate, M.ResultsDate] },
  ImmunizationVaccinationRecords: { displayName: 'Immunization/Vaccination Records', required: [M.Classification], optional: [M.DateSigned, M.ExpirationDate, M.ResultsDate] },
  ProviderHealthStatementMedicalClearance: { displayName: 'Provider Health Statement / Medical Clearance', required: [], optional: [M.ResultsDate, M.ExpirationDate] },
  CHGCOVIDExemptionLetter: { displayName: 'CHG COVID Exemption Letter', required: [], optional: [M.IssueDate, M.ExpirationDate, M.DateOfLetter, M.DateSigned] },
  ColorVision: { displayName: 'Color Vision', required: [], optional: [M.ExpirationDate, M.ExamScore] },

  // Professional Licensure
  DEARegistrationCopy: { displayName: 'DEA Registration(s) - Copy', required: [M.SubCategory, M.State], optional: [M.ExpirationDate, M.IssueDate] },
  LicensingExams: { displayName: 'Licensing Exams', required: [M.SubCategory], optional: [M.IssueDate] },
  LicensureSupportDocuments: { displayName: 'Licensure Support Documents', required: [], optional: [] },
  StateControlledSubstanceRegistrationSecondary: { displayName: 'State Controlled Substance Registration - Secondary', required: [M.State], optional: [M.IssueDate, M.ExpirationDate] },
  StateLicensureCopy: { displayName: 'State Licensure - Copy', required: [M.State], optional: [M.ExpirationDate, M.IssueDate] },

  // Provider Internal Credentialing
  ApprovedSkills: { displayName: 'Approved Skills', required: [], optional: [M.ExpirationDate] },
  AuthorizationAndRelease: { displayName: 'Authorization & Release', required: [], optional: [M.DateSigned, M.ExpirationDate] },
  AnnualPerformanceReview: { displayName: 'Annual Performance Review', required: [], optional: [] },
  CHACredentialingApprovalLetter: { displayName: 'CHA Credentialing Approval Letter', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate] },
  ClinicalCapabilities: { displayName: 'Clinical Capabilities', required: [], optional: [M.ExpirationDate, M.CompletedDate] },
  CompetencyTest: { displayName: 'Competency Test', required: [], optional: [M.CompletedDate, M.ExpirationDate] },
  CredentialingProfileDelegated: { displayName: 'Credentialing Profile - Delegated', required: [], optional: [M.ExpirationDate] },
  CredentialingSupportDocuments: { displayName: 'Credentialing Support Documents', required: [], optional: [] },
  CredentialingVerifyingOfficeCVOQuery: { displayName: 'Credentialing Verifying Office (CVO) Query', required: [], optional: [M.ExpirationDate, M.ApprovalDate, M.ResultsDate] },
  CriminalBackgroundCheckResults: { displayName: 'Criminal Background Check Results', required: [], optional: [M.ReportCompletionDate, M.State] },
  CriminalBackgroundRelease: { displayName: 'Criminal Background Release', required: [], optional: [M.DateSigned, M.ExpirationDate] },
  CriminalHistoryQuestionnaire: { displayName: 'Criminal History Questionnaire', required: [], optional: [M.ExpirationDate, M.ResultsDate] },
  Explanation: { displayName: 'Explanation', required: [M.DateOfLetter], optional: [] },
  FOXSkills: { displayName: 'FOX Skills', required: [], optional: [] },
  GeneralServicesAdministrationGSA: { displayName: 'General Services Administration (GSA)', required: [], optional: [M.ExpirationDate] },
  GMSApprovalInternationalOnly: { displayName: 'GMS Approval- International Only', required: [], optional: [M.ApprovalDate, M.ExpirationDate] },
  HospitalPrivilegeVerification: { displayName: 'Hospital Privilege Verification (HPV)', required: [], optional: [] },
  I9Attestation: { displayName: 'I-9 Attestation', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate] },
  ListOfProfessionalReferences: { displayName: 'List of Professional References', required: [], optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State] },
  NationalPractitionerDataBankNPDBSelfQuery: { displayName: 'National Practitioner Data Bank (NPDB) Self Query', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State, M.ClientID, M.PresentID, M.JobID, M.AssignmentEndDate, M.AssignmentStartDate, M.AssignmentID] },
  OfficeOfTheInspectorGeneralOIG: { displayName: 'Office of the Inspector General (OIG)', required: [], optional: [M.ExpirationDate] },
  OrientationTest: { displayName: 'Orientation Test', required: [], optional: [M.ExpirationDate, M.TestDate] },
  PhysicianHealthProgramPHPContract: { displayName: 'Physician Health Program (PHP) Contract', required: [], optional: [M.ResultsDate] },
  PrimarySourceVerificationPSV: { displayName: 'Primary Source Verification (PSV)', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State, M.ClientID, M.PresentID, M.JobID, M.AssignmentEndDate, M.AssignmentStartDate, M.AssignmentID] },
  ProfessionalLettersOfReference: { displayName: 'Professional Letters of Reference', required: [], optional: [M.DateOfLetter] },
  ProviderApplication: { displayName: 'Provider Application', required: [], optional: [M.CompletedDate, M.ExpirationDate] },
  ProviderApprovalSummary: { displayName: 'Provider Approval Summary', required: [], optional: [M.ApprovalDate, M.SpecialtyLabel] },
  ReferencesObtainedByCHG: { displayName: 'References Obtained by CHG', required: [], optional: [M.ExpirationDate, M.LastClinicalContactDate] },
  TravelingHandbookAcknowledgment: { displayName: 'Traveling Handbook Acknowledgment', required: [], optional: [M.DateSigned] },

  // Provider Hospital Privileging and Licensing
  CompletedHPApp: { displayName: 'Completed HP App', required: [], optional: [M.State] },
  CompletedLICApp: { displayName: 'Completed LIC App', required: [], optional: [M.State] },
  HPApprovalLetter: { displayName: 'HP Approval Letter', required: [], optional: [M.PrivilegingStartDate, M.ExpirationDate] },
  HospitalPrivilegingPreFill: { displayName: 'Hospital Privileging Pre-Fill', required: [], optional: [] },
  LicensePreFill: { displayName: 'License Pre-Fill', required: [], optional: [] },
  PowerOfAttorneyPOA: { displayName: 'Power of Attorney (POA)', required: [], optional: [M.DateSigned] },
  ProcedureLogs: { displayName: 'Procedure Logs', required: [], optional: [M.DateFrom, M.DateTo] },
  ProviderHPAndLicensingSupportDocuments: { displayName: 'Provider HP and Licensing Support Documents', required: [], optional: [] },

  // Professional Liability
  CertificateOfInsuranceCHGCOI: { displayName: 'Certificate of Insurance - CHG (COI)', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  CertificateOfInsuranceNonCHGCOI: { displayName: 'Certificate of Insurance - Non-CHG (COI)', required: [], optional: [M.ExpirationDate, M.IssueDate] },
  LegalDocumentationExcludingMalpractice: { displayName: 'Legal Documentation (Excluding Malpractice)', required: [], optional: [M.DateOfLetter] },
  MalpracticeDocumentation: { displayName: 'Malpractice Documentation', required: [M.SubCategory], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State] },
  ProfessionalLiabilitySupportDocuments: { displayName: 'Professional Liability Support Documents', required: [], optional: [] },

  // Job and Assignment
  AssignmentConfirmationLetter: { displayName: 'Assignment Confirmation Letter', required: [], optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.ExternalLetterYN, M.SignedYN] },
  ConfirmationChecklist: { displayName: 'Confirmation Checklist', required: [], optional: [] },
  JobAndAssignmentSupportDocuments: { displayName: 'Job and Assignment Support Documents', required: [], optional: [] },
  JobPracticeDescription: { displayName: 'Job Practice Description', required: [], optional: [M.JobID, M.Specialty] },
  JobRequestDetails: { displayName: 'Job Request Details', required: [M.ExternalID], optional: [] },
  MealBreakWaiverFormCompleted: { displayName: 'Meal Break Waiver Form (Completed)', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State] },
  OrientationInformation: { displayName: 'Orientation Information', required: [], optional: [] },
  QAEval: { displayName: 'QA Eval', required: [], optional: [M.DateOfLetter] },

  // Work, Gap, Military History
  ClarificationsExcludingHistoryGapsMalpractice: { displayName: 'Clarifications (Excluding History Gaps & Malpractice)', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate] },
  ExplanationOfGapsInHistory: { displayName: 'Explanation of Gaps in History', required: [], optional: [M.DateOfLetter] },
  MilitaryService: { displayName: 'Military Service', required: [M.SubCategory], optional: [M.IssueDate, M.ExpirationDate] },
  WorkHistory: { displayName: 'Work History', required: [], optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.ResultsDate, M.State] },

  // Housing and Travel
  Airfare: { displayName: 'Airfare', required: [M.AssignmentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned] },
  CarRental: { displayName: 'Car Rental', required: [M.AssignmentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned] },
  HotelFolio: { displayName: 'Hotel Folio', required: [M.AssignmentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned] },
  HousingKeyRelease: { displayName: 'Housing - Key Release', required: [], optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned, M.HousingRequestID, M.MoveInDate, M.MoveOutDate] },
  HousingLease: { displayName: 'Housing - Lease', required: [], optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate] },
  HousingMoveInInstructions: { displayName: 'Housing - Move In Instructions', required: [], optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate] },
  HousingPetAgreement: { displayName: 'Housing - Pet Agreement', required: [], optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate] },
  HousingRulesAndRegulations: { displayName: 'Housing - Rules and Regulations', required: [], optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate] },
  HousingStipendForm: { displayName: 'Housing Allowance Stipend Form', required: [], optional: [M.DateSigned] },
  MileageMaps: { displayName: 'Mileage Maps', required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate] },
  RentalCarIncident: { displayName: 'Rental Car Incident', required: [], optional: [M.DateOfIncident] },
  TravelApprovals: { displayName: 'Travel Approvals', required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate] },
  TravelExceptions: { displayName: 'Travel Exceptions', required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate] },
  TravelItinerary: { displayName: 'Travel Itinerary', required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID], optional: [M.AssignmentEndDate, M.AssignmentStartDate] },

  // International
  INTLEnglishProficiency: { displayName: 'INTL English Proficiency', required: [], optional: [M.DateFrom, M.DateTo, M.IssueDate] },
  INTLImmigration: { displayName: 'INTL Immigration', required: [M.SubCategory], optional: [M.DateFrom, M.DateTo, M.IssueDate] },
  INTLMedicalRegistration: { displayName: 'INTL Medical Registration', required: [M.SubCategory], optional: [M.DateFrom, M.DateTo, M.IssueDate] },
  INTLTaxInformation: { displayName: 'INTL Tax Information', required: [M.SubCategory], optional: [M.ExpirationDate, M.IssueDate] },
  InternationalMedicalDefense: { displayName: 'International Medical Defense', required: [M.SubCategory, M.Classification], optional: [M.FacilityName, M.ApplicationDate] },
  JobOffer: { displayName: 'Job Offer', required: [M.AssignmentID, M.ClientID, M.PresentID, M.JobID], optional: [M.AssignmentEndDate, M.AssignmentStartDate] },
  NZIRDNumber: { displayName: 'NZ IRD Number', required: [], optional: [M.EffectiveDate, M.IssueDate] },
  NZTaxExemptionCertificate: { displayName: 'NZ Tax Exemption Certificate', required: [], optional: [M.EffectiveDate, M.IssueDate] },

  // Financial and Tax
  ClientInvoicePacket: { displayName: 'Client Invoice Packet', required: [], optional: [] },
  DirectDeposit: { displayName: 'Direct Deposit', required: [], optional: [M.EffectiveDate] },
  PermanentTaxResidenceFormCompleted: { displayName: 'Permanent Tax Residence Form (Completed)', required: [], optional: [M.EffectiveDate, M.ExpirationDate] },
  tenNinetyNine: { displayName: '1099', required: [], optional: [M.AssignmentID, M.IssueDate] },
  W2: { displayName: 'W-2', required: [], optional: [M.DateSigned] },
  W9: { displayName: 'W9', required: [], optional: [M.DateSigned, M.SubstituteForm] },

  // Work Records
  WorkRecord: { displayName: 'Work Record', required: [M.Audited], optional: [M.PayPeriodStart, M.PayPeriodEnd, M.AssignmentID] },

  // Contracts
  ClientAddendum: { displayName: 'Client Addendum', required: [], optional: [M.DateSigned, M.EffectiveDate, M.ExpirationDate, M.Division] },
  ClientAddendumAssignmentPage: { displayName: 'Client Addendum', required: [], optional: [M.DateSigned, M.EffectiveDate, M.ExpirationDate] },
  ClientAgreements: { displayName: 'Client Agreements', required: [M.SubCategory], optional: [M.Classification, M.DateSent, M.DateSigned, M.EffectiveDate, M.ExpirationDate, M.Division] },
  ClientAgreementsAssignmentPage: { displayName: 'Client Agreements', required: [M.SubCategory], optional: [M.Classification] },
  ClientAmendments: { displayName: 'Client Amendments', required: [M.SubCategory], optional: [M.EffectiveDate, M.ExpirationDate, M.DateSigned, M.Division] },
  ClientAmendmentsAssignmentPage: { displayName: 'Client Amendments', required: [M.SubCategory], optional: [] },
  ClientCancellationLetter: { displayName: 'Client Cancellation Letter', required: [], optional: [M.EffectiveDateOfCancellation] },
  ClientConfirmations: { displayName: 'Client Confirmations', required: [], optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.EffectiveDate, M.ExpirationDate, M.DateSigned, M.IssueDate] },
  DealSheet: { displayName: 'Deal Sheet', required: [], optional: [] },
  ProviderAgreement: { displayName: 'Provider Agreement', required: [M.SubCategory], optional: [M.Classification, M.DateSigned, M.EffectiveDate, M.ExpirationDate] },
  ProviderAmendment: { displayName: 'Provider Amendment', required: [M.SubCategory], optional: [M.ExpirationDate, M.IssueDate, M.EffectiveDate, M.DateSigned] },
  PurchaseOrder: { displayName: 'Purchase Order', required: [], optional: [M.EffectiveDate, M.ExpirationDate] },
  ReferralAgreement: { displayName: 'Referral Agreement', required: [], optional: [] },
  RequestForProposalRFP: { displayName: 'Request for Proposal (RFP)', required: [], optional: [M.ExpirationDate, M.EffectiveDate, M.RFPNumber] },

  // Client Documents
  ClientPracticeQuestionnaires: { displayName: 'Client Practice Questionnaires', required: [M.SubCategory, M.Classification, M.Division], optional: [M.ApprovalDate] },
  ClientSupportingDocuments: { displayName: 'Client Supporting Documents', required: [], optional: [] },

  // Negative test / DSL support
  TesterContentType: { displayName: 'Tester Content Type(Test)', required: [], optional: [] },
  Investigating: { displayName: 'Investigating', required: [M.ReasonForSupport], optional: [] },

  // Pay Stubs
  Paystubs: { displayName: 'Paystubs', required: [], optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PayPeriodDate, M.PresentID] },
};

// ─────────────────────────────────────────────
// CATEGORY → CONTENT TYPE MAPPINGS
// ─────────────────────────────────────────────
const CategoryContentTypes = {
  [Categories.CV.displayName]:                                      [ContentTypeNames.CurriculumVitae, ContentTypeNames.CVSupportDocuments],
  [Categories.ClientUploadedDocuments.displayName]:                 [ContentTypeNames.RequestDetails],
  [Categories.ProofOfIdentity.displayName]:                         [ContentTypeNames.BirthCertificate, ContentTypeNames.ProofOfIdentitySupportDocuments, ContentTypeNames.SocialSecurityCard, ContentTypeNames.DriversLicense, ContentTypeNames.Passport, ContentTypeNames.EmploymentAuthorizationCardVisa, ContentTypeNames.NationalProviderIdentifier, ContentTypeNames.CertificateOfNaturalization, ContentTypeNames.ProfessionalPhoto],
  [Categories.EducationTrainingCertifications.displayName]:         [ContentTypeNames.EducationAndTraining, ContentTypeNames.BoardCertificationSecondary, ContentTypeNames.EducationTrainingSupportDocuments, ContentTypeNames.MembershipToProfessionalSociety, ContentTypeNames.APNationalCertificate, ContentTypeNames.InfectionControlCertificate, ContentTypeNames.LifeSupportAndMiscCertifications, ContentTypeNames.HarassmentTrainingCertificate, ContentTypeNames.ChildAbuseCertification, ContentTypeNames.ContinuingMedicalEducationCME],
  [Categories.ProfessionalLicensure.displayName]:                   [ContentTypeNames.DEARegistrationCopy, ContentTypeNames.LicensingExams, ContentTypeNames.StateControlledSubstanceRegistrationSecondary, ContentTypeNames.StateLicensureCopy],
  [Categories.HealthRecordsAndEmploymentScreening.displayName]:     [ContentTypeNames.AHCAfingerprintResults, ContentTypeNames.AHCAaffidavitAndPrivacyRelease, ContentTypeNames.DrugTestDocumentation, ContentTypeNames.CHGCOVIDExemptionLetter, ContentTypeNames.HealthScreeningTestingAndTiters, ContentTypeNames.ProviderHealthStatementMedicalClearance, ContentTypeNames.ImmunizationVaccinationRecords, ContentTypeNames.EmploymentVerification, ContentTypeNames.ColorVision],
  [Categories.ProviderHospitalPrivilegingAndLicensing.displayName]: [ContentTypeNames.LicensePreFill, ContentTypeNames.HospitalPrivilegingPreFill, ContentTypeNames.PowerOfAttorneyPOA, ContentTypeNames.ProcedureLogs, ContentTypeNames.CompletedLICApp, ContentTypeNames.HPApprovalLetter],
  [Categories.ProfessionalLiability.displayName]:                   [ContentTypeNames.CertificateOfInsuranceCHGCOI, ContentTypeNames.CertificateOfInsuranceNonCHGCOI, ContentTypeNames.LegalDocumentationExcludingMalpractice, ContentTypeNames.MalpracticeDocumentation, ContentTypeNames.ProfessionalLiabilitySupportDocuments],
  [Categories.JobAndAssignment.displayName]:                        [ContentTypeNames.AssignmentConfirmationLetter, ContentTypeNames.OrientationInformation, ContentTypeNames.JobPracticeDescription, ContentTypeNames.JobAndAssignmentSupportDocuments, ContentTypeNames.MealBreakWaiverFormCompleted, ContentTypeNames.ConfirmationChecklist, ContentTypeNames.JobRequestDetails, ContentTypeNames.QAEval],
  [Categories.WorkGapMilitaryHistory.displayName]:                  [ContentTypeNames.WorkHistory, ContentTypeNames.ClarificationsExcludingHistoryGapsMalpractice, ContentTypeNames.ExplanationOfGapsInHistory, ContentTypeNames.MilitaryService],
  [Categories.HousingAndTravel.displayName]:                        [ContentTypeNames.RentalCarIncident, ContentTypeNames.Airfare, ContentTypeNames.CarRental, ContentTypeNames.HotelFolio, ContentTypeNames.HousingKeyRelease, ContentTypeNames.HousingLease, ContentTypeNames.HousingMoveInInstructions, ContentTypeNames.HousingPetAgreement, ContentTypeNames.HousingRulesAndRegulations, ContentTypeNames.HousingStipendForm, ContentTypeNames.MileageMaps, ContentTypeNames.TravelApprovals, ContentTypeNames.TravelExceptions, ContentTypeNames.TravelItinerary],
  [Categories.International.displayName]:                           [ContentTypeNames.INTLEnglishProficiency, ContentTypeNames.INTLImmigration, ContentTypeNames.INTLMedicalRegistration, ContentTypeNames.JobOffer, ContentTypeNames.INTLTaxInformation, ContentTypeNames.InternationalMedicalDefense],
  [Categories.FinancialTax.displayName]:                            [ContentTypeNames.W2, ContentTypeNames.tenNinetyNine, ContentTypeNames.W9, ContentTypeNames.ClientInvoicePacket, ContentTypeNames.DirectDeposit, ContentTypeNames.PermanentTaxResidenceFormCompleted],
  [Categories.Contracts.displayName]:                               [ContentTypeNames.ClientAgreements, ContentTypeNames.ClientAmendments, ContentTypeNames.ClientAddendum, ContentTypeNames.RequestForProposalRFP, ContentTypeNames.ProviderAmendment, ContentTypeNames.ProviderAgreement, ContentTypeNames.ReferralAgreement, ContentTypeNames.PurchaseOrder, ContentTypeNames.DealSheet, ContentTypeNames.ClientConfirmations],
  [Categories.ClientDocuments.displayName]:                         [ContentTypeNames.ClientPracticeQuestionnaires, ContentTypeNames.ClientSupportingDocuments],
  [Categories.WorkRecords.displayName]:                             [ContentTypeNames.WorkRecord],
  [Categories.PayStubs.displayName]:                                [ContentTypeNames.Paystubs],
  [Categories.ProviderInternalCredentialing.displayName]:           [ContentTypeNames.ReferencesObtainedByCHG, ContentTypeNames.CompetencyTest, ContentTypeNames.ListOfProfessionalReferences, ContentTypeNames.CredentialingSupportDocuments, ContentTypeNames.GMSApprovalInternationalOnly, ContentTypeNames.ProviderApprovalSummary, ContentTypeNames.ProviderApplication, ContentTypeNames.ClinicalCapabilities, ContentTypeNames.NationalPractitionerDataBankNPDBSelfQuery, ContentTypeNames.PrimarySourceVerificationPSV, ContentTypeNames.ProfessionalLettersOfReference, ContentTypeNames.CredentialingProfileDelegated, ContentTypeNames.CriminalBackgroundCheckResults, ContentTypeNames.AuthorizationAndRelease, ContentTypeNames.OfficeOfTheInspectorGeneralOIG, ContentTypeNames.CredentialingVerifyingOfficeCVOQuery, ContentTypeNames.HospitalPrivilegeVerification, ContentTypeNames.PhysicianHealthProgramPHPContract, ContentTypeNames.CriminalBackgroundRelease, ContentTypeNames.CriminalHistoryQuestionnaire, ContentTypeNames.AnnualPerformanceReview, ContentTypeNames.GeneralServicesAdministrationGSA, ContentTypeNames.TravelingHandbookAcknowledgment, ContentTypeNames.OrientationTest, ContentTypeNames.I9Attestation, ContentTypeNames.CHACredentialingApprovalLetter, ContentTypeNames.Explanation],
};


module.exports = { ContentTypeNames, CategoryContentTypes};