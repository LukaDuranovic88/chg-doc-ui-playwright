const { request } = require('@playwright/test');
const { OktaClient } = require('./OktaClient');

const DIVISIONS = ['CHS', 'CHA', 'CAP', 'CHP', 'GMD', 'GMI', 'WBY', 'WMS'];
const DOCUMENT_URL = '/v2/document/';

class DmsApiClient {
  constructor() {
    this.oktaClient = new OktaClient();
  }

  async getHeaders(contentType = 'application/json') {
    const token  = await this.oktaClient.getToken();
    const apiKey = process.env.EGG_API_KEY;
    return {
      'Authorization': `Bearer ${token}`,
      'ApiKey': apiKey,
      'Content-Type': contentType,
    };
  }

  // GET /v2/document/?entityId=xxx&delegate=xxx&delegateType=account
  async getDocumentsForEntity(entityId, division) {
    const context  = await request.newContext({ baseURL: process.env.DMS_BASE_URL });
    const headers  = await this.getHeaders();
    const response = await context.get(DOCUMENT_URL, {
      headers,
      params: {
        entityId,
        delegate: division,
        delegateType: 'account',
      },
    });

    if (!response.ok()) {
      throw new Error(`GET documents failed [${division}]: ${response.status()}`);
    }

    return response.json();
  }

  // DELETE /v2/document/{id}?delegate=xxx&delegateType=account
  async deleteDocument(documentId, division) {
    const context  = await request.newContext({ baseURL: process.env.DMS_BASE_URL });
    const headers  = await this.getHeaders();
    const response = await context.delete(`${DOCUMENT_URL}${documentId}`, {
      headers,
      params: {
        delegate: division,
        delegateType: 'account',
      },
    });

    if (response.status() !== 204) {
      throw new Error(`DELETE document failed [id: ${documentId}, division: ${division}]: ${response.status()}`);
    }
  }

  // Iterates all divisions, gets all documents, deletes each one
  async deleteAllDocumentsForEntity(entityId) {
    for (const division of DIVISIONS) {
      const documents = await this.getDocumentsForEntity(entityId, division);
      for (const doc of documents) {
        if (doc?.id) {
          await this.deleteDocument(doc.id, division);
        }
      }
    }
  }
}

module.exports = { DmsApiClient };