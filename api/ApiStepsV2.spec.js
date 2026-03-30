// Run: npx playwright test --config=playwright.api.config.js
const { test, expect } = require('@playwright/test');
const { DmsApiClient } = require('./clients/DmsApiClient');
const { TestEntityIds } = require('../test-data/enums/TestEntityIds');
const { ContentTypeNames } = require('../test-data/enums/ContentTypes');
const { Division } = require('../test-data/enums/Division');

const api = new DmsApiClient();
const entityId = TestEntityIds.DR_TEST_TEST_PROVIDER.entityId;
const division = Division.CHS;

test.describe('DMS API V2', () => {

  test.afterEach(async () => {
    await api.deleteAllDocumentsForEntity(entityId);
  });

  // ─────────────────────────────────────────────────────────────
  // POST /v2/document/file/ — uploadDocumentReturnJson
  // ─────────────────────────────────────────────────────────────
  test('uploadDocumentReturnJson — returns full document resource', async () => {
    const doc = await api.uploadDocumentReturnJson(
      entityId,
      ContentTypeNames.Passport.displayName,
      division
    );

    expect(doc.id).toBeDefined();
    expect(doc.contentType).toBe(ContentTypeNames.Passport.displayName);
    expect(doc.originalFileName).toBe('test.pdf');
    expect(doc.currentStatus.name).toBe('RECEIVED');
  });

  // ─────────────────────────────────────────────────────────────
  // POST /v2/document/file/ — uploadDocumentReturnId
  // ─────────────────────────────────────────────────────────────
  test('uploadDocumentReturnId — returns document id', async () => {
    const docId = await api.uploadDocumentReturnId(
      null,
      entityId,
      'test.pdf',
      ContentTypeNames.CurriculumVitae.displayName,
      division
    );

    expect(docId).toBeDefined();
    expect(typeof docId).toBe('number');
  });

  // ─────────────────────────────────────────────────────────────
  // POST /v2/document/ — requestDocumentReturnId
  // ─────────────────────────────────────────────────────────────
  test('requestDocumentReturnId — returns request id', async () => {
    const requestId = await api.requestDocumentReturnId(
      entityId,
      ContentTypeNames.DriversLicense.displayName,
      division
    );

    expect(requestId).toBeDefined();
    expect(typeof requestId).toBe('number');
  });

  // ─────────────────────────────────────────────────────────────
  // POST /v2/document/file/ — uploadDocumentReturnId with requestId
  // ─────────────────────────────────────────────────────────────
  test('uploadDocumentReturnId with requestId — links upload to request', async () => {
    const requestId = await api.requestDocumentReturnId(
      entityId,
      ContentTypeNames.BirthCertificate.displayName,
      division
    );

    const docId = await api.uploadDocumentReturnId(
      requestId,
      entityId,
      'test.pdf',
      ContentTypeNames.BirthCertificate.displayName,
      division
    );

    expect(docId).toBeDefined();
    expect(typeof docId).toBe('number');
  });

  // ─────────────────────────────────────────────────────────────
  // GET /v2/document/ — getDocumentsForEntity
  // ─────────────────────────────────────────────────────────────
  test('getDocumentsForEntity — returns array of documents', async () => {
    await api.uploadDocumentReturnJson(
      entityId,
      ContentTypeNames.Passport.displayName,
      division
    );

    const docs = await api.getDocumentsForEntity(entityId, division);

    expect(Array.isArray(docs)).toBe(true);
    expect(docs.length).toBeGreaterThan(0);
    expect(docs[0].id).toBeDefined();
  });

  // ─────────────────────────────────────────────────────────────
  // GET /v2/document/{id} — getDocumentById
  // ─────────────────────────────────────────────────────────────
  test('getDocumentById — returns correct document', async () => {
    const uploaded = await api.uploadDocumentReturnJson(
      entityId,
      ContentTypeNames.Passport.displayName,
      division
    );

    const doc = await api.getDocumentById(uploaded.id, division);

    expect(doc.id).toBe(uploaded.id);
    expect(doc.contentType).toBe(ContentTypeNames.Passport.displayName);
    expect(doc.currentStatus).toBeDefined();
  });

  // ─────────────────────────────────────────────────────────────
  // DELETE /v2/document/{id} — deleteDocument
  // ─────────────────────────────────────────────────────────────
  test('deleteDocument — deletes a specific document', async () => {
    const doc = await api.uploadDocumentReturnJson(
      entityId,
      ContentTypeNames.Passport.displayName,
      division
    );

    await expect(api.deleteDocument(doc.id, division)).resolves.not.toThrow();

    const docs = await api.getDocumentsForEntity(entityId, division);
    expect(docs.find(d => d.id === doc.id)).toBeUndefined();
  });

  // ─────────────────────────────────────────────────────────────
  // deleteAllDocumentsForEntity
  // ─────────────────────────────────────────────────────────────
  test('deleteAllDocumentsForEntity — clears all documents across divisions', async () => {
    await api.uploadDocumentReturnJson(entityId, ContentTypeNames.Passport.displayName, division);
    await api.uploadDocumentReturnJson(entityId, ContentTypeNames.CurriculumVitae.displayName, division);

    await expect(api.deleteAllDocumentsForEntity(entityId)).resolves.not.toThrow();

    const docs = await api.getDocumentsForEntity(entityId, division);
    expect(docs.length).toBe(0);
  });

});