const TestMultiEntityIds = {
  PAY_BILL_SUMMARY_MULTIPLE_ENTITIES: {
    providerId:       '0031H00001vd4NJ',
    assignmentId:     'a0CPF00002f2eLp',
    assignmentName:   'ASG-1815144',
    payBillSummaryId: 'a1jPF000001Lj3H',
    origin:           'FOX',
  },
  ASSIGNMENT_MULTIPLE_ENTITIES: {
    providerId:       '0031H00001vd4NJ',
    assignmentId:     'a0CPF00002f2eLp',
    assignmentName:   'ASG-1815144',
    payBillSummaryId: null,
    origin:           'FOX',
  },
};

function buildEntityParam(entity) {
  const parts = [
    `${entity.providerId}|provider|${entity.origin}`,
    `${entity.assignmentId}|assignment|${entity.origin}`,
    `${entity.assignmentName}|assignmentName|${entity.origin}`,
  ];
  if (entity.payBillSummaryId) {
    parts.push(`${entity.payBillSummaryId}|payBillSummary|${entity.origin}`);
  }
  return parts.join(',');
}

module.exports = { TestMultiEntityIds, buildEntityParam };