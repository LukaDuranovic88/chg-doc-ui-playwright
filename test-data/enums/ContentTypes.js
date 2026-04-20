const { Categories }        = require('./Categories');
const { Lifecycles }        = require('./Lifecycles');
const { MetadataFields: M } = require('./MetadataFields');
const { Pages }             = require('./Pages');
const { Division: D }       = require('./Division');

// ─────────────────────────────────────────────
// CONTENT TYPES
//
// Each entry shape:
//   displayName  {string}   — UI label
//   code         {string}   — short identifier (from DMS)
//   category     {object}   — ref to Categories.*
//   lifecycle    {string}   — ref to Lifecycles.*
//   access       {object}   — { [Pages.*]: Division[] }
//                             D.ALL sentinel = visible for all valid divisions
//                             omit a page key = not visible on that page
//   required     {string[]} — required metadata fields
//   optional     {string[]} — optional metadata fields
//
// Source of truth for access rules:
//   https://chghealthcare.atlassian.net/wiki/spaces/IGP/pages/2554593283
// ─────────────────────────────────────────────

const ContentTypeNames = {

  // ── CV ───────────────────────────────────────────────────────────────
  CurriculumVitae: {
    displayName: 'Curriculum Vitae (Resume)',
    code:        'CV',
    category:    Categories.CV,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  CVSupportDocuments: {
    displayName: 'CV Support Documents',
    code:        'CVSD',
    category:    Categories.CV,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },

  // ── Client Uploaded Documents ─────────────────────────────────────────
  RequestDetails: {
    displayName: 'Request Details',
    code:        'RD',
    category:    Categories.ClientUploadedDocuments,
    lifecycle:   Lifecycles.Default,
    access: {},
    required: [],
    optional: [],
  },
  LocumsMartOther: {
    displayName: 'LocumsMart Other',
    code:        'LMO',
    category:    Categories.ClientUploadedDocuments,
    lifecycle:   Lifecycles.Default,
    access: {},
    required: [],
    optional: [],
  },

  // ── Proof of Identity ─────────────────────────────────────────────────
  BirthCertificate: {
    displayName: 'Birth Certificate',
    code:        'BCE',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  CertificateOfNaturalization: {
    displayName: 'Certificate of Naturalization',
    code:        'CoN',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.IssueDate],
  },
  DriversLicense: {
    displayName: "Driver's License/State Issued Identification",
    code:        'DL',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate, M.IssuingAuthority],
  },
  EmploymentAuthorizationCardVisa: {
    displayName: 'Employment Authorization Card / VISA',
    code:        'EAC',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  NationalProviderIdentifier: {
    displayName: 'National Provider Identifier (NPI)',
    code:        'NPI',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State],
  },
  Passport: {
    displayName: 'Passport',
    code:        'PSP',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  ProfessionalPhoto: {
    displayName: 'Professional Photo',
    code:        'PP',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  SocialSecurityCard: {
    displayName: 'Social Security Card',
    code:        'SSC',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  ProofOfIdentitySupportDocuments: {
    displayName: 'Proof of Identity Support Documents',
    code:        'PISD',
    category:    Categories.ProofOfIdentity,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },

  // ── Education, Training, Certifications ──────────────────────────────
  EducationAndTraining: {
    displayName: 'Education and Training',
    code:        'ET',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.SubCategory],
    optional: [M.Specialty, M.DateTo, M.DateFrom, M.ExpirationDate, M.IssueDate, M.ResultsDate],
  },
  EducationTrainingSupportDocuments: {
    displayName: 'Education and Training Support Documents',
    code:        'ETSD',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  BoardCertificationSecondary: {
    displayName: 'Board Certification - Secondary',
    code:        'BC',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.Classification],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  ChildAbuseCertification: {
    displayName: 'Child Abuse Certification',
    code:        'CAC',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.CHA, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate],
  },
  MembershipToProfessionalSociety: {
    displayName: 'Membership to Professional Society',
    code:        'MPS',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  InfectionControlCertificate: {
    displayName: 'Infection Control Certificate',
    code:        'ICC',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  HarassmentTrainingCertificate: {
    displayName: 'Harassment Training Certificate',
    code:        'HTC',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.WMS, D.CHA, D.GMI, D.GMD, D.CHS],
    },
    required: [],
    optional: [M.EffectiveDate],
  },
  ContinuingMedicalEducationCME: {
    displayName: 'Continuing Medical Education (CME)',
    code:        'CME',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.IssueDate],
  },
  APNationalCertificate: {
    displayName: 'AP National Certificate',
    code:        'NC',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {},   // not listed on any page in Confluence — confirm with team
    required: [],
    optional: [M.EffectiveDate, M.ExpirationDate],
  },
  LifeSupportAndMiscCertifications: {
    displayName: 'Life Support and Misc. Certifications',
    code:        'LS',
    category:    Categories.EducationTrainingCertifications,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.SubCategory],
    optional: [M.ExpirationDate, M.IssueDate],
  },

  // ── Health Records and Employment Screening ───────────────────────────
  AHCAaffidavitAndPrivacyRelease: {
    displayName: 'AHCA Affidavit and Privacy Release',
    code:        'AAPR',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.SignatureDate],
  },
  AHCAfingerprintResults: {
    displayName: 'AHCA Fingerprint Results',
    code:        'AFR',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.ProviderVendor,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [],
  },
  DrugTestDocumentation: {
    displayName: 'Drug Test Documentation',
    code:        'DTD',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.ProviderVendor,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.ResultsDate],
  },
  EmploymentVerification: {
    displayName: 'Employment Verification',
    code:        'EV',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State],
  },
  HealthScreeningTestingAndTiters: {
    displayName: 'Health Screening/Testing & Titers',
    code:        'HSTT',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [M.Classification],
    optional: [M.ExpirationDate, M.ResultsDate],
  },
  ImmunizationVaccinationRecords: {
    displayName: 'Immunization/Vaccination Records',
    code:        'IVR',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.Classification],
    optional: [M.DateSigned, M.ExpirationDate, M.ResultsDate],
  },
  ProviderHealthStatementMedicalClearance: {
    displayName: 'Provider Health Statement / Medical Clearance',
    code:        'PHS',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ResultsDate, M.ExpirationDate],
  },
  CHGCOVIDExemptionLetter: {
    displayName: 'CHG COVID Exemption Letter',
    code:        'CHGCEL',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.CHS, D.WBY, D.WMS, D.CHA, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.IssueDate, M.ExpirationDate, M.DateOfLetter, M.DateSigned],
  },
  ColorVision: {
    displayName: 'Color Vision',
    code:        'CVI',
    category:    Categories.HealthRecordsAndEmploymentScreening,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.ExamScore],
  },

  // ── Professional Licensure ────────────────────────────────────────────
  DEARegistrationCopy: {
    displayName: 'DEA Registration(s) - Copy',
    code:        'DS',
    category:    Categories.ProfessionalLicensure,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.SubCategory, M.State],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  LicensingExams: {
    displayName: 'Licensing Exams',
    code:        'LE',
    category:    Categories.ProfessionalLicensure,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.SubCategory],
    optional: [M.IssueDate],
  },
  LicensureSupportDocuments: {
    displayName: 'Licensure Support Documents',
    code:        'LSD',
    category:    Categories.ProfessionalLicensure,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [],
  },
  StateControlledSubstanceRegistrationSecondary: {
    displayName: 'State Controlled Substance Registration - Secondary',
    code:        'SCSR',
    category:    Categories.ProfessionalLicensure,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.State],
    optional: [M.IssueDate, M.ExpirationDate],
  },
  StateLicensureCopy: {
    displayName: 'State Licensure - Copy',
    code:        'SL',
    category:    Categories.ProfessionalLicensure,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.State],
    optional: [M.ExpirationDate, M.IssueDate],
  },

  // ── Provider Internal Credentialing ──────────────────────────────────
  ApprovedSkills: {
    displayName: 'Approved Skills',
    code:        'APS',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.WMS, D.CHS, D.CHP, D.CAP, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ExpirationDate],
  },
  AuthorizationAndRelease: {
    displayName: 'Authorization & Release',
    code:        'AR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.ExpirationDate],
  },
  AnnualPerformanceReview: {
    displayName: 'Annual Performance Review',
    code:        'APR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WMS, D.CHA],
    },
    required: [],
    optional: [],
  },
  CHACredentialingApprovalLetter: {
    displayName: 'CHA Credentialing Approval Letter',
    code:        'CHACAL',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate],
  },
  ClinicalCapabilities: {
    displayName: 'Clinical Capabilities',
    code:        'CC',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.CompletedDate],
  },
  CompetencyTest: {
    displayName: 'Competency Test',
    code:        'CPT',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHA],
    },
    required: [],
    optional: [M.CompletedDate, M.ExpirationDate],
  },
  CredentialingProfileDelegated: {
    displayName: 'Credentialing Profile - Delegated',
    code:        'CPD',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHS, D.WBY, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ExpirationDate],
  },
  CredentialingSupportDocuments: {
    displayName: 'Credentialing Support Documents',
    code:        'CRSD',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  CredentialingVerifyingOfficeCVOQuery: {
    displayName: 'Credentialing Verifying Office (CVO) Query',
    code:        'CVO',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.ApprovalDate, M.ResultsDate],
  },
  CriminalBackgroundCheckResults: {
    displayName: 'Criminal Background Check Results',
    code:        'CBCR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderVendor,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ReportCompletionDate, M.State],
  },
  CriminalBackgroundRelease: {
    displayName: 'Criminal Background Release',
    code:        'CBR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.ExpirationDate],
  },
  CriminalHistoryQuestionnaire: {
    displayName: 'Criminal History Questionnaire',
    code:        'CHQ',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.ResultsDate],
  },
  Explanation: {
    displayName: 'Explanation',
    code:        'CIE',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [M.DateOfLetter],
    optional: [],
  },
  FOXSkills: {
    displayName: 'FOX Skills',
    code:        'FXS',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  GeneralServicesAdministrationGSA: {
    displayName: 'General Services Administration (GSA)',
    code:        'GSA',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate],
  },
  GMSApprovalInternationalOnly: {
    displayName: 'GMS Approval- International Only',
    code:        'GMSA',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ApprovalDate, M.ExpirationDate],
  },
  HospitalPrivilegeVerification: {
    displayName: 'Hospital Privilege Verification (HPV)',
    code:        'HPV',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.CHA, D.GMI, D.GMD],
    },
    required: [],
    optional: [],
  },
  I9Attestation: {
    displayName: 'I-9 Attestation',
    code:        'I9A',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WMS, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate],
  },
  ListOfProfessionalReferences: {
    displayName: 'List of Professional References',
    code:        'LOPR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ClientID, M.PresentID, M.JobID, M.AssignmentID, M.AssignmentStartDate, M.AssignmentEndDate, M.DateOfLetter, M.DateSigned, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State],
  },
  NationalPractitionerDataBankNPDBSelfQuery: {
    displayName: 'National Practitioner Data Bank (NPDB) Self Query',
    code:        'NPDB',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State, M.ClientID, M.PresentID, M.JobID, M.AssignmentEndDate, M.AssignmentStartDate, M.AssignmentID],
  },
  OfficeOfTheInspectorGeneralOIG: {
    displayName: 'Office of the Inspector General (OIG)',
    code:        'OIG',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WMS, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate],
  },
  OrientationTest: {
    displayName: 'Orientation Test',
    code:        'OT',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WMS, D.CHA],
    },
    required: [],
    optional: [M.ExpirationDate, M.TestDate],
  },
  PhysicianHealthProgramPHPContract: {
    displayName: 'Physician Health Program (PHP) Contract',
    code:        'PHPC',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.ResultsDate],
  },
  PrimarySourceVerificationPSV: {
    displayName: 'Primary Source Verification (PSV)',
    code:        'PSV',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State, M.ClientID, M.PresentID, M.JobID, M.AssignmentEndDate, M.AssignmentStartDate, M.AssignmentID],
  },
  ProfessionalLettersOfReference: {
    displayName: 'Professional Letters of Reference',
    code:        'PLR',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.DateOfLetter],
  },
  ProviderApplication: {
    displayName: 'Provider Application',
    code:        'PA',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.CompletedDate, M.ExpirationDate],
  },
  ProviderApprovalSummary: {
    displayName: 'Provider Approval Summary',
    code:        'PAS',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.ApprovalDate, M.SpecialtyLabel],
  },
  ReferencesObtainedByCHG: {
    displayName: 'References Obtained by CHG',
    code:        'RO',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.ExpirationDate, M.LastClinicalContactDate],
  },
  TravelingHandbookAcknowledgment: {
    displayName: 'Traveling Handbook Acknowledgment',
    code:        'THA',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.DateSigned],
  },

  // ── Provider Hospital Privileging and Licensing ───────────────────────
  CompletedHPApp: {
    displayName: 'Completed HP App',
    code:        'CHPA',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHS, D.WBY, D.WMS, D.CHP, D.CAP, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.State],
  },
  CompletedLICApp: {
    displayName: 'Completed LIC App',
    code:        'CLIA',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHS, D.WBY, D.WMS, D.CHP, D.CAP, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.State],
  },
  HPApprovalLetter: {
    displayName: 'HP Approval Letter',
    code:        'HPAL',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.CHS, D.GMI, D.GMD, D.CHA, D.WBY, D.WMS],
    },
    required: [],
    optional: [M.PrivilegingStartDate, M.ExpirationDate],
  },
  HospitalPrivilegingPreFill: {
    displayName: 'Hospital Privileging Pre-Fill',
    code:        'HPPF',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [],
  },
  LicensePreFill: {
    displayName: 'License Pre-Fill',
    code:        'LPF',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [],
  },
  PowerOfAttorneyPOA: {
    displayName: 'Power of Attorney (POA)',
    code:        'POA',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.DateSigned],
  },
  ProcedureLogs: {
    displayName: 'Procedure Logs',
    code:        'PL',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateFrom, M.DateTo],
  },
  ProviderHPAndLicensingSupportDocuments: {
    displayName: 'Provider HP and Licensing Support Documents',
    code:        'PHLSD',
    category:    Categories.ProviderHospitalPrivilegingAndLicensing,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [],
  },

  // ── Professional Liability ────────────────────────────────────────────
  CertificateOfInsuranceCHGCOI: {
    displayName: 'Certificate of Insurance - CHG (COI)',
    code:        'COIC',
    category:    Categories.ProfessionalLiability,
    lifecycle:   Lifecycles.ProviderVendor,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  CertificateOfInsuranceNonCHGCOI: {
    displayName: 'Certificate of Insurance - Non-CHG (COI)',
    code:        'COIN',
    category:    Categories.ProfessionalLiability,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  LegalDocumentationExcludingMalpractice: {
    displayName: 'Legal Documentation (Excluding Malpractice)',
    code:        'LD',
    category:    Categories.ProfessionalLiability,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.DateOfLetter],
  },
  MalpracticeDocumentation: {
    displayName: 'Malpractice Documentation',
    code:        'MD',
    category:    Categories.ProfessionalLiability,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State],
  },
  ProfessionalLiabilitySupportDocuments: {
    displayName: 'Professional Liability Support Documents',
    code:        'PLSD',
    category:    Categories.ProfessionalLiability,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [],
  },

  // ── Job and Assignment ────────────────────────────────────────────────
  AssignmentConfirmationLetter: {
    displayName: 'Assignment Confirmation Letter',
    code:        'ACL',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.ExternalLetterYN, M.SignedYN],
  },
  ConfirmationChecklist: {
    displayName: 'Confirmation Checklist',
    code:        'CCL',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS],
    },
    required: [],
    optional: [],
  },
  JobAndAssignmentSupportDocuments: {
    displayName: 'Job and Assignment Support Documents',
    code:        'JASD',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [],
  },
  JobPracticeDescription: {
    displayName: 'Job Practice Description',
    code:        'JPD',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]:    [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.opportunity]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.JobID, M.Specialty],
  },
  JobRequestDetails: {
    displayName: 'Job Request Details',
    code:        'JRD',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.opportunity]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.ExternalID],
    optional: [],
  },
  MealBreakWaiverFormCompleted: {
    displayName: 'Meal Break Waiver Form (Completed)',
    code:        'MBWF',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate, M.State],
  },
  OrientationInformation: {
    displayName: 'Orientation Information',
    code:        'OI',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [],
  },
  QAEval: {
    displayName: 'QA Eval',
    code:        'QAE',
    category:    Categories.JobAndAssignment,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [],
    optional: [M.DateOfLetter],
  },

  // ── Work, Gap, Military History ───────────────────────────────────────
  ClarificationsExcludingHistoryGapsMalpractice: {
    displayName: 'Clarifications (Excluding History Gaps & Malpractice)',
    code:        'CLR',
    category:    Categories.WorkGapMilitaryHistory,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.IssueDate, M.ResultsDate],
  },
  ExplanationOfGapsInHistory: {
    displayName: 'Explanation of Gaps in History',
    code:        'EOGIH',
    category:    Categories.WorkGapMilitaryHistory,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.WMS, D.CHS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateOfLetter],
  },
  MilitaryService: {
    displayName: 'Military Service',
    code:        'MS',
    category:    Categories.WorkGapMilitaryHistory,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.ALL],
    },
    required: [M.SubCategory],
    optional: [M.IssueDate, M.ExpirationDate],
  },
  WorkHistory: {
    displayName: 'Work History',
    code:        'WH',
    category:    Categories.WorkGapMilitaryHistory,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.DateOfLetter, M.ExpirationDate, M.ResultsDate, M.State],
  },

  // ── Housing and Travel ────────────────────────────────────────────────
  Airfare: {
    displayName: 'Airfare',
    code:        'AF',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned],
  },
  CarRental: {
    displayName: 'Car Rental',
    code:        'CAR',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned],
  },
  HotelFolio: {
    displayName: 'Hotel Folio',
    code:        'HF',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned],
  },
  HousingKeyRelease: {
    displayName: 'Housing - Key Release',
    code:        'HKR',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.DateSigned, M.HousingRequestID, M.MoveInDate, M.MoveOutDate],
  },
  HousingLease: {
    displayName: 'Housing - Lease',
    code:        'HL',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate],
  },
  HousingMoveInInstructions: {
    displayName: 'Housing - Move In Instructions',
    code:        'HMII',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate],
  },
  HousingPetAgreement: {
    displayName: 'Housing - Pet Agreement',
    code:        'HPA',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate],
  },
  HousingRulesAndRegulations: {
    displayName: 'Housing - Rules and Regulations',
    code:        'HRR',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentID, M.AssignmentEndDate, M.AssignmentStartDate, M.HousingRequestID, M.MoveInDate, M.MoveOutDate],
  },
  HousingStipendForm: {
    displayName: 'Housing Allowance Stipend Form',
    code:        'HASF',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]:   [D.WMS, D.CHA],
      [Pages.assignment]: [D.CHA, D.WMS],
    },
    required: [],
    optional: [M.DateSigned],
  },
  MileageMaps: {
    displayName: 'Mileage Maps',
    code:        'MM',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate],
  },
  RentalCarIncident: {
    displayName: 'Rental Car Incident',
    code:        'RCI',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.DateOfIncident],
  },
  TravelApprovals: {
    displayName: 'Travel Approvals',
    code:        'TA',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate],
  },
  TravelExceptions: {
    displayName: 'Travel Exceptions',
    code:        'TE',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate],
  },
  TravelItinerary: {
    displayName: 'Travel Itinerary',
    code:        'TI',
    category:    Categories.HousingAndTravel,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PresentID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate],
  },

  // ── International ─────────────────────────────────────────────────────
  INTLEnglishProficiency: {
    displayName: 'INTL English Proficiency',
    code:        'ENP',
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [],
    optional: [M.DateFrom, M.DateTo, M.IssueDate],
  },
  INTLImmigration: {
    displayName: 'INTL Immigration',
    code:        'IMM',
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [M.SubCategory],
    optional: [M.DateFrom, M.DateTo, M.IssueDate],
  },
  INTLMedicalRegistration: {
    displayName: 'INTL Medical Registration',
    code:        'MR',
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [M.SubCategory],
    optional: [M.DateFrom, M.DateTo, M.IssueDate],
  },
  INTLTaxInformation: {
    displayName: 'INTL Tax Information',
    code:        'ITI',
    category:    Categories.International,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [M.SubCategory],
    optional: [M.ExpirationDate, M.IssueDate],
  },
  InternationalMedicalDefense: {
    displayName: 'International Medical Defense',
    code:        'INTMD',
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [M.SubCategory, M.Classification],
    optional: [M.FacilityName, M.ApplicationDate],
  },
  JobOffer: {
    displayName: 'Job Offer',
    code:        'JO',
    category:    Categories.International,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [M.AssignmentID, M.ClientID, M.PresentID, M.JobID],
    optional: [M.AssignmentEndDate, M.AssignmentStartDate],
  },
  NZIRDNumber: {
    displayName: 'NZ IRD Number',
    code:        null, // not in provided code list — confirm with team
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [],
    optional: [M.EffectiveDate, M.IssueDate],
  },
  NZTaxExemptionCertificate: {
    displayName: 'NZ Tax Exemption Certificate',
    code:        null, // not in provided code list — confirm with team
    category:    Categories.International,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.GMI, D.GMD],
    },
    required: [],
    optional: [M.EffectiveDate, M.IssueDate],
  },

  // ── Financial & Tax ───────────────────────────────────────────────────
  ClientInvoicePacket: {
    displayName: 'Client Invoice Packet',
    code:        'CIP',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.assignment]: [D.ALL],
    },
    required: [],
    optional: [],
  },
  DirectDeposit: {
    displayName: 'Direct Deposit',
    code:        'DD',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.EffectiveDate],
  },
  PermanentTaxResidenceFormCompleted: {
    displayName: 'Permanent Tax Residence Form (Completed)',
    code:        'PTR',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]:   [D.WBY, D.CHS, D.WMS, D.CHA],
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.CHA],
    },
    required: [],
    optional: [M.EffectiveDate, M.ExpirationDate],
  },
  tenNinetyNine: {
    displayName: '1099',
    code:        '1099',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.AssignmentID, M.IssueDate],
  },
  W2: {
    displayName: 'W-2',
    code:        'W2',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD],
    },
    required: [],
    optional: [M.DateSigned],
  },
  W9: {
    displayName: 'W9',
    code:        'W9',
    category:    Categories.FinancialTax,
    lifecycle:   Lifecycles.Provider,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.DateSigned, M.SubstituteForm],
  },

  // ── Work Records ──────────────────────────────────────────────────────
  WorkRecord: {
    displayName: 'Work Record',
    code:        'WR',
    category:    Categories.WorkRecords,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]:   [D.ALL],
      [Pages.assignment]: [D.ALL],
    },
    required: [M.Audited],
    optional: [M.PayPeriodStart, M.PayPeriodEnd, M.AssignmentID],
  },

  // ── Contracts ─────────────────────────────────────────────────────────
  // NOTE: ClientAddendum, ClientAgreements, ClientAmendments have page-specific
  // variants because required/optional fields differ between client and assignment pages.
  ClientAddendum: {
    displayName: 'Client Addendum',
    code:        'CADD',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.DateSigned, M.EffectiveDate, M.ExpirationDate, M.Division],
  },
  ClientAddendumAssignmentPage: {
    displayName: 'Client Addendum',
    code:        'CADD',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.DateSigned, M.EffectiveDate, M.ExpirationDate],
  },
  ClientAgreements: {
    displayName: 'Client Agreements',
    code:        'CAGM',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [M.Classification, M.DateSent, M.DateSigned, M.EffectiveDate, M.ExpirationDate, M.Division],
  },
  ClientAgreementsAssignmentPage: {
    displayName: 'Client Agreements',
    code:        'CAGM',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [M.Classification],
  },
  ClientAmendments: {
    displayName: 'Client Amendments',
    code:        'CAMN',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [M.EffectiveDate, M.ExpirationDate, M.DateSigned, M.Division],
  },
  ClientAmendmentsAssignmentPage: {
    displayName: 'Client Amendments',
    code:        'CAMN',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.assignment]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [],
  },
  ClientCancellationLetter: {
    displayName: 'Client Cancellation Letter',
    code:        'CCLE',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.EffectiveDateOfCancellation],
  },
  ClientConfirmations: {
    displayName: 'Client Confirmations',
    code:        'CCONF',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]:  [D.CHP, D.CAP],
      [Pages.account]: [D.CHP, D.CAP],
    },
    required: [],
    optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.EffectiveDate, M.ExpirationDate, M.DateSigned, M.IssueDate],
  },
  DealSheet: {
    displayName: 'Deal Sheet',
    code:        'DSH',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]: [D.CHP, D.CAP],
      [Pages.client]:   [D.CHP, D.CAP],
      [Pages.account]:  [D.CHP, D.CAP],
    },
    required: [],
    optional: [],
  },
  ProviderAgreement: {
    displayName: 'Provider Agreement',
    code:        'PAG',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [M.SubCategory],
    optional: [M.Classification, M.DateSigned, M.EffectiveDate, M.ExpirationDate],
  },
  ProviderAmendment: {
    displayName: 'Provider Amendment',
    code:        'PAM',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [M.SubCategory],
    optional: [M.ExpirationDate, M.IssueDate, M.EffectiveDate, M.DateSigned],
  },
  PurchaseOrder: {
    displayName: 'Purchase Order',
    code:        'PO',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]:     [D.WBY, D.WMS, D.GMI, D.GMD, D.CHA],
      [Pages.assignment]: [D.WBY, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.EffectiveDate, M.ExpirationDate],
  },
  ReferralAgreement: {
    displayName: 'Referral Agreement',
    code:        'RA',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.CHA, D.CHS],
    },
    required: [],
    optional: [],
  },
  RequestForProposalRFP: {
    displayName: 'Request for Proposal (RFP)',
    code:        'RFP',
    category:    Categories.Contracts,
    lifecycle:   Lifecycles.Default,
    access: {
      [Pages.client]: [D.CHS, D.GMI, D.GMD, D.CHA, D.CHP, D.CAP],
    },
    required: [],
    optional: [M.ExpirationDate, M.EffectiveDate, M.RFPNumber],
  },

  // ── Client Documents ──────────────────────────────────────────────────
  ClientPracticeQuestionnaires: {
    displayName: 'Client Practice Questionnaires',
    code:        'CPQA',
    category:    Categories.ClientDocuments,
    lifecycle:   Lifecycles.Client,
    access: {},   // page not documented in Confluence — confirm with team
    required: [M.SubCategory, M.Classification, M.Division],
    optional: [M.ApprovalDate],
  },
  ClientSupportingDocuments: {
    displayName: 'Client Supporting Documents',
    code:        'CSD',
    category:    Categories.ClientDocuments,
    lifecycle:   Lifecycles.ProviderProcessDriven,
    access: {},   // page not documented in Confluence — confirm with team
    required: [],
    optional: [],
  },

  // ── Pay Stubs ─────────────────────────────────────────────────────────
  Paystubs: {
    displayName: 'Paystubs',
    code:        'PS',
    category:    Categories.PayStubs,
    lifecycle:   Lifecycles.Financial,
    access: {
      [Pages.provider]: [D.WBY, D.CHS, D.WMS, D.GMI, D.GMD, D.CHA],
    },
    required: [],
    optional: [M.AssignmentStartDate, M.AssignmentEndDate, M.AssignmentID, M.ClientID, M.ClientName, M.JobID, M.PayPeriodDate, M.PresentID],
  },

  // ── Misc / Test ───────────────────────────────────────────────────────
  TesterContentType: {
    displayName: 'Tester Content Type(Test)',
    code:        'TST',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Misc,
    access: {},
    required: [],
    optional: [],
  },
  Investigating: {
    displayName: 'Investigating',
    code:        'IVTG',
    category:    Categories.ProviderInternalCredentialing,
    lifecycle:   Lifecycles.Misc,
    access: {},
    required: [M.ReasonForSupport],
    optional: [],
  },
};

module.exports = { ContentTypeNames };