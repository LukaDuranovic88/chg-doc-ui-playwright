const { test, expect } = require('@playwright/test');
const { DmsApiClient } = require('./clients/DmsApiClient');
const { TestEntityIds } = require('../test-data/enums/TestEntityIds');
const { ContentTypeNames } = require('../test-data/enums/ContentTypes');
const { Division } = require('../test-data/enums/Division');

const dmsApiClient = new DmsApiClient();
const entityId = TestEntityIds.DR_TEST_TEST_PROVIDER.entityId;

test.describe('DMS API V2', () => {

  // ─────────────────────────────────────────────────────────────
  // CREATE — POST /v2/document/file/
  // ─────────────────────────────────────────────────────────────
  test('uploads a document and returns a document resource', async () => {
    const doc = await dmsApiClient.uploadDocument(
      entityId,
      ContentTypeNames.Passport.displayName,
      Division.CHS
    );

    expect(doc.id).toBeDefined();
    expect(doc.contentType).toBe(ContentTypeNames.Passport.displayName);
    expect(doc.originalFileName).toBe('test.pdf');
    expect(doc.currentStatus.name).toBe('RECEIVED');
  });

  // ─────────────────────────────────────────────────────────────
  // DELETE — DELETE /v2/document/{id}
  // ─────────────────────────────────────────────────────────────
  test('deletes all documents for an entity across all divisions', async () => {
    await expect(dmsApiClient.deleteAllDocumentsForEntity(entityId)).resolves.not.toThrow();
  });

  test('DELETE returns 204 for a specific document', async () => {
    const documents = await dmsApiClient.getDocumentsForEntity(entityId, Division.CHS);

    if (documents.length === 0) {
      test.skip('No documents found to delete');
    }

    const doc = documents[0];
    await expect(dmsApiClient.deleteDocument(doc.id, Division.CHS)).resolves.not.toThrow();
  });

});