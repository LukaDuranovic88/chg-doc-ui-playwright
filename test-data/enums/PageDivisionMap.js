const { PageEnum: Pages }          = require('../enums/PageEnum');
const { Division: D, ALL_DIVISIONS } = require('../enums/Division');
const { Categories }               = require('../enums/Categories');
const { Lifecycles }               = require('../enums/Lifecycles');
const { ContentTypeNames }         = require('../enums/ContentTypes');

// ─────────────────────────────────────────────
// QUERY HELPERS
//
// Access rules live on each ContentType in ContentTypes.js.
// These helpers query across all content types — no separate map needed.
//
// D.ALL sentinel is expanded to ALL_DIVISIONS here.
// ─────────────────────────────────────────────

const _ALL_CTS = Object.values(ContentTypeNames);

/**
 * Resolves D.ALL sentinel to the full list of valid divisions.
 * @param {string[]} divisions
 * @returns {string[]}
 */
const _resolveDivisions = (divisions) =>
  divisions.includes(D.ALL) ? ALL_DIVISIONS : divisions;

/**
 * All content types visible for a given (page, division) combo.
 * @param {string} page     - Pages.*
 * @param {string} division - Division.*  (not D.ALL — use a real division)
 * @returns {object[]}
 */
const getContentTypes = (page, division) =>
  _ALL_CTS.filter((ct) => {
    const pageDivisions = ct.access[page];
    if (!pageDivisions) return false;
    return _resolveDivisions(pageDivisions).includes(division);
  });

/**
 * Content types filtered by category for a given (page, division) combo.
 * @param {string} page
 * @param {string} division
 * @param {object} category - Categories.*
 * @returns {object[]}
 */
const getContentTypesByCategory = (page, division, category) =>
  getContentTypes(page, division).filter((ct) => ct.category === category);

/**
 * Content types filtered by lifecycle for a given (page, division) combo.
 * @param {string} page
 * @param {string} division
 * @param {string} lifecycle - Lifecycles.*
 * @returns {object[]}
 */
const getContentTypesByLifecycle = (page, division, lifecycle) =>
  getContentTypes(page, division).filter((ct) => ct.lifecycle === lifecycle);

/**
 * All pages a content type is visible on, with resolved divisions per page.
 * @param {object} contentType - ContentTypeNames.*
 * @returns {{ page: string, divisions: string[] }[]}
 */
const getPagesForContentType = (contentType) =>
  Object.entries(contentType.access).map(([page, divisions]) => ({
    page,
    divisions: _resolveDivisions(divisions),
  }));

/**
 * Get the lifecycle for a specific content type.
 * @param {object} contentType - ContentTypeNames.*
 * @returns {string}
 */
const getLifecycle = (contentType) => contentType.lifecycle;

/**
 * Get the category for a specific content type.
 * @param {object} contentType - ContentTypeNames.*
 * @returns {object}
 */
const getCategory = (contentType) => contentType.category;

/**
 * All content types visible in the Verification Queue (CHG division only).
 * @returns {object[]}
 */
const getVqContentTypes = () => _ALL_CTS.filter((ct) => ct.vqVisible);

module.exports = {
  getContentTypes,
  getContentTypesByCategory,
  getContentTypesByLifecycle,
  getPagesForContentType,
  getLifecycle,
  getCategory,
  getVqContentTypes,
};