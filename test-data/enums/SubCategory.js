// Replaces: serenity.model.enumsForTests.SubCategory

const SubCategory = {
  ACLS: 'ACLS', ClaimsHistoryReport: 'Claims History Report', ContractTermination: 'Contract Termination',
  DD214: 'DD214', DEAFeeExempt: 'DEA Fee Exempt', DEARelease: 'DEA Release',
  MedicalSchoolCertificate: 'Medical School - Certificate', ODELetter: 'ODE Letter', Other: 'Other',
  PAChildAbuseCriminalRecordCheck: 'PA Child Abuse - Criminal Record Check',
  PAFingerprintScreening: 'PA Fingerprint Screening',
  PAHistoryCertificationClearance: 'PA History Certification/Clearance',
  NY: 'NY', ResidencyCertificate: 'Residency - Certificate', FLEX: 'FLEX',
  Explanations: 'Explanations', ProofOfPartnership: 'Proof of Partnership',
  ECFMGVerification: 'ECFMG Verification', LoQ: 'LoQ',
  TelemedicineAmendment: 'Telemedicine Amendment', ExtensionAmendment: 'Extension Amendment',
  NameChangeAmendmentClient: 'NameChange Amendment (Client)', RateChangeAmendment: 'Rate Change Amendment',
  BusinessAssociateAgreement: 'Business Associate Agreement',
  ProviderAgreementIndividual: 'Provider Agreement: Individual',
  NZIRDNumber: 'NZ IRD Number', RotatingInternship: 'Rotating Internship', HomeHealth: 'Home Health',
  Retainer: 'Retainer', StandardAP: 'Standard AP', StandardAllied: 'Standard Allied',
  NonStandardRetainer: 'Non-Standard Retainer', Telemedicine: 'Telemedicine',
  PainManagement: 'Pain Management', DualRoleEMHospitalist: 'Dual Role (EM/Hospitalist)',
  Psychiatry: 'Psychiatry', Transplant: 'Transplant', InpatientPMR: 'Inpatient PMR',
  WeightLoss: 'Weight Loss', Anesthesia: 'Anesthesia - Supervision of CRNA documentation',
  Unsure: "Unsure: I don't know where this document should go", NewZealand: 'New Zealand',
};

module.exports = { SubCategory };
