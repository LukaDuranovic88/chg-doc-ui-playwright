const { request } = require('@playwright/test');

class OktaClient {
  constructor() {
    this.token = null;
  }

  async getToken() {
    if (this.token) return this.token;

    const clientId     = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const username     = process.env.API_USERNAME;
    const password     = process.env.API_PASSWORD;

    const body = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
      scope: 'openid',
    }).toString();

    const context = await request.newContext();
    const response = await context.post(process.env.OKTA_TOKEN_URL, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
    });

    if (!response.ok()) {
      const errorBody = await response.text();
      throw new Error(`Okta token request failed: ${response.status()} — ${errorBody}`);
    }

    const json = await response.json();
    this.token = json.access_token;
    return this.token;
  }
}

module.exports = { OktaClient };