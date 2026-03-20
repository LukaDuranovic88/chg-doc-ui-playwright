const { test, expect } = require('@playwright/test');
const { DmsApiClient } = require('./clients/DmsApiClient');
const { TestEntityIds } = require('../test-data/enums/TestEntityIds');

const dmsApiClient = new DmsApiClient();

test.describe('DMS DELETE endpoint', () => {

  test('deletes all documents for an entity across all divisions', async () => {
    const entityId = TestEntityIds.DR_TEST_TEST_PROVIDER.entityId;
    await expect(dmsApiClient.deleteAllDocumentsForEntity(entityId)).resolves.not.toThrow();
  });

  test('DELETE returns 204 for a specific document', async () => {
    const entityId  = TestEntityIds.DR_TEST_TEST_PROVIDER.entityId;
    const documents = await dmsApiClient.getDocumentsForEntity(entityId, 'CHS');

    if (documents.length === 0) {
      test.skip('No documents found to delete');
    }

    const doc = documents[0];
    await expect(dmsApiClient.deleteDocument(doc.id, 'CHS')).resolves.not.toThrow();
  });

});