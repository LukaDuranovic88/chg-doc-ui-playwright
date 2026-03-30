const PossibleStatus = {
  EDIT_PENDING_P:             { id: 29,   name: 'EDIT PENDING',        code: 'EDIT-PENDING-P' },
  RECEIVED_P:                 { id: 10,   name: 'RECEIVED',            code: 'RECEIVED-P' },
  RECEIVED_PPD:               { id: 20,   name: 'RECEIVED',            code: 'RECEIVED-PPD' },
  RECEIVED_PVA:               { id: 24,   name: 'RECEIVED',            code: 'RECEIVED-PVA' },
  RECEIVED_CT:                { id: 30,   name: 'RECEIVED',            code: 'RECEIVED-CT' },
  RECEIVED_MD:                { id: 38,   name: 'RECEIVED',            code: 'RECEIVED-MD' },
  RECEIVED_NEW_VERSION_P:     { id: 33,   name: 'RECEIVED NEW VERSION',code: 'RECEIVED-NEW-VERSION-P' },
  RECEIVED_NEW_VERSION_CT:    { id: 34,   name: 'RECEIVED NEW VERSION',code: 'RECEIVED-NEW-VERSION-CT' },
  RECEIVED_NEW_VERSION_PPD:   { id: 35,   name: 'RECEIVED NEW VERSION',code: 'RECEIVED-NEW-VERSION-PPD' },
  RECEIVED_NEW_VERSION_PVA:   { id: 36,   name: 'RECEIVED NEW VERSION',code: 'RECEIVED-NEW-VERSION-PVA' },
  VERIFIED_P:                 { id: 11,   name: 'VERIFIED',            code: 'VERIFIED-P' },
  VERIFIED_PPD:               { id: 21,   name: 'VERIFIED',            code: 'VERIFIED-PPD' },
  VERIFIED_PVA:               { id: 25,   name: 'VERIFIED',            code: 'VERIFIED-PVA' },
  REQUESTED:                  { id: 9,    name: 'REQUESTED',           code: 'REQUESTED-P' },
  NOT_ACCEPTED_P:             { id: 12,   name: 'NOT ACCEPTED',        code: 'NOT-ACCEPTED-P' },
  NOT_ACCEPTED_PPD:           { id: 22,   name: 'NOT ACCEPTED',        code: 'NOT-ACCEPTED-PPD' },
  NOT_ACCEPTED_PVA:           { id: 26,   name: 'NOT ACCEPTED',        code: 'NOT-ACCEPTED-PVA' },
  NOT_ACCEPTED_CT:            { id: 32,   name: 'NOT ACCEPTED',        code: 'NOT-ACCEPTED-CT' },
  NOT_ACCEPTED_MD:            { id: 39,   name: 'NOT ACCEPTED',        code: 'NOT-ACCEPTED-MD' },
  COMPLETE_CT:                { id: 31,   name: 'COMPLETE',            code: 'COMPLETE-CT' },
  APPROVED_F:                 { id: 6,    name: 'APPROVED',            code: 'APPROVED-F' },
  DEFAULT:                    { id: 13,   name: 'UPLOADED',            code: 'DEFAULT' },
  TRANSFERRED:                { id: 28,   name: 'TRANSFERRED',         code: 'TRANSFERRED-S' },
  BAD_DATA:                   { id: null, name: 'null',                code: 'null' },
  FAKE_DATA:                  { id: 122345, name: 'test data',         code: 'test data-P' },
  EMPTY_DATA:                 { id: null, name: '',                    code: '' },
};

function fromCodeOrName(input) {
  if (!input) return null;
  return Object.values(PossibleStatus).find(
    s => input.toLowerCase() === s.name.toLowerCase() ||
         input.toLowerCase() === s.code.toLowerCase()
  ) ?? null;
}

module.exports = { PossibleStatus, fromCodeOrName };