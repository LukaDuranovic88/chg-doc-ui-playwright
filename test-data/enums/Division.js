const Division = {
  CAP:     'CAP',
  CHA:     'CHA',
  CHG:     'CHG',
  CHP:     'CHP',
  CHS:     'CHS',
  GMD:     'GMD',
  GMI:     'GMI',
  WBY:     'WBY',
  WMS:     'WMS',
  INVALID: 'INVALID',

  // Sentinel — means "visible for all valid divisions".
  // Never use as a real division value. Expanded by query helpers in PageDivisionMap.js.
  ALL: 'ALL',
};

// All real, testable divisions — excludes INVALID and ALL sentinel.
const ALL_DIVISIONS = [
  Division.CAP,
  Division.CHA,
  Division.CHG,
  Division.CHP,
  Division.CHS,
  Division.GMD,
  Division.GMI,
  Division.WBY,
  Division.WMS,
];

module.exports = { Division, ALL_DIVISIONS };