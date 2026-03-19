const { DocumentColumns: D } = require('./DocumentColumns');

const Categories = {
  CV:                                      { displayName: 'CV',                                       id: 1,  columns: [D.RequestDate] },
  ClientUploadedDocuments:                 { displayName: 'Client Uploaded Documents',                id: 2,  columns: [D.ConnectID, D.FileName] },
  ProofOfIdentity:                         { displayName: 'Proof of Identity',                        id: 3,  columns: [D.IssuingAuthority, D.RequestDate, D.ExpirationDate] },
  EducationTrainingCertifications:         { displayName: 'Education, Training, Certifications',      id: 6,  columns: [D.SubCategory, D.Specialty, D.RequestDate, D.DateTo, D.ExpirationDate] },
  ProfessionalLicensure:                   { displayName: 'Professional Licensure',                   id: 7,  columns: [D.SubCategory, D.State, D.RequestDate, D.ExpirationDate] },
  JobAndAssignment:                        { displayName: 'Job and Assignment',                       id: 11, columns: [D.ContentType, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  HealthRecordsAndEmploymentScreening:     { displayName: 'Health Records and Employment Screening',  id: 12, columns: [D.RequestDate, D.Classification, D.ExpirationDate] },
  ProviderInternalCredentialing:           { displayName: 'Provider Internal Credentialing',          id: 13, columns: [D.ContentType, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  ProviderHospitalPrivilegingAndLicensing: { displayName: 'Provider Hospital Privileging & Licensing',id: 14, columns: [D.ContentType, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  ProfessionalLiability:                   { displayName: 'Professional Liability',                   id: 15, columns: [D.ContentType, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  HousingAndTravel:                        { displayName: 'Housing & Travel',                         id: 16, columns: [D.ContentType, D.AssignmentStartDate, D.AssignmentEndDate, D.TR, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  WorkGapMilitaryHistory:                  { displayName: 'Work, Gap, Military History',              id: 17, columns: [D.ContentType, D.Description, D.SubCategory, D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  International:                           { displayName: 'International',                            id: 18, columns: [D.ContentType, D.RequestDate, D.UploadedDate, D.Status, D.Options, D.SubCategory, D.Classification] },
  FinancialTax:                            { displayName: 'Financial & Tax',                          id: 19, columns: [D.RequestDate, D.UploadedDate, D.Status, D.Options] },
  Contracts:                               { displayName: 'Contracts',                                id: 20, columns: [D.ContentType, D.CON, D.Division, D.RequestDate, D.UploadedDate, D.Status, D.SubCategory, D.EffectiveDate, D.ExpirationDate, D.Options] },
  ClientDocuments:                         { displayName: 'Client Documents',                         id: 22, columns: [D.ContentType, D.SubCategory, D.Description, D.ApprovalDate, D.UploadedDate, D.Status] },
  WorkRecords:                             { displayName: 'Work Records',                             id: 23, columns: [D.ContentType, D.PayPeriodDate, D.AssignmentID, D.UploadedDate, D.Status, D.Options] },
  PayStubs:                                { displayName: 'Pay Stubs',                                id: 24, columns: [D.ContentType, D.PayPeriodStart, D.PayPeriodEnd, D.AssignmentNumber, D.UploadedDate, D.Status, D.Options] },
};

const getAllCategories = () => Object.values(Categories).map(c => c.displayName);

module.exports = { Categories, getAllCategories };