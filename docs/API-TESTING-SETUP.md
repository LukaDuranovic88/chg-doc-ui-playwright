# 🧪 API Testing Setup

## 📋 Overview

This framework does **not** use REST Assured. REST Assured is a Java library used in the separate `documents-rest-api-tests` Java project. The Playwright framework uses **Playwright's built-in API testing capabilities** via the `request` object from `@playwright/test` — no additional library required.

---

## ⚙️ How It Works

### 🔐 Authentication Flow

API tests require a dedicated Okta bearer token obtained directly via HTTP — not through the browser login flow used by UI tests. This is equivalent to `getNewOktaTokenForUser()` in the Java REST Assured project.

```
API Test
   │
   └──> OktaClient.getToken()
              │
              └──> POST https://chghealthcare.oktapreview.com/oauth2/.../v1/token
                        headers: Authorization: Basic <base64(clientId:clientSecret)>
                        body:    grant_type=password&username=...&password=...&scope=openid
                        returns: access_token
```

> The token is cached in memory — if `getToken()` is called multiple times in the same test run, the token is only fetched once.

---

## 🌍 Environment Variables

All sensitive credentials are stored in `.env` and never committed to the repository.

| Variable | Description |
|---|---|
| `OKTA_TOKEN_URL` | Okta OAuth2 token endpoint URL |
| `CLIENT_ID` | Okta client ID for the password grant |
| `CLIENT_SECRET` | Okta client secret |
| `API_USERNAME` | External API test user email (`chgexternaluserapitestperm2@...`) |
| `API_PASSWORD` | External API test user password |
| `EGG_API_KEY` | Gateway/aggregation service API key used in request headers |
| `DMS_BASE_URL` | Base URL for the DMS service (e.g. `http://localhost:8090`) |

> ⚠️ **Note:** `API_USERNAME` / `API_PASSWORD` are different from `TEST_USERNAME` / `TEST_PASSWORD`. The API user is an external user with specific API permission sets. The test user is the browser-based UI test user.

---

## 🔑 OktaClient

**File:** `api/clients/OktaClient.js`

Responsible for obtaining and caching an Okta bearer token for the API test user.

```
OktaClient
├── constructor()   — initializes token cache to null
└── getToken()      — returns cached token or fetches a new one via Okta password grant
                      throws with full Okta error body on failure
```

**Java equivalent:** `EnvSteps.getNewOktaTokenForUser()`

---

## 📡 DmsApiClient

**File:** `api/clients/DmsApiClient.js`

Handles all HTTP calls to the DMS service. Uses `OktaClient` to obtain the bearer token and constructs the appropriate headers for each request.

```
DmsApiClient
├── constructor()                          — initializes OktaClient instance
├── getHeaders(contentType?)               — builds Authorization + ApiKey + Content-Type headers
├── getDocumentsForEntity(entityId, div)   — GET /v2/document/?entityId=...&delegate=...
├── deleteDocument(documentId, div)        — DELETE /v2/document/{id}?delegate=...
└── deleteAllDocumentsForEntity(entityId)  — iterates all divisions, gets and deletes all documents
```

**Java equivalent:** `ApiStepsV2`

### 🏢 Divisions

Both GET and DELETE iterate over all 8 divisions:

```javascript
['CHS', 'CHA', 'CAP', 'CHP', 'GMD', 'GMI', 'WBY', 'WMS']
```

### 📨 Request Headers

Every API request includes:

```
Authorization: Bearer <okta_access_token>
ApiKey:        <EGG_API_KEY>
Content-Type:  application/json
```

---

## 🛠️ playwright.api.config.js

API tests use a separate Playwright config file — completely independent from the UI test config.

| Setting | Value | Reason |
|---|---|---|
| `testDir` | `./api` | Only picks up files under `api/` |
| `globalSetup` | not set | No browser login needed |
| `storageState` | not set | No browser session needed |
| `retries` | `1` | Retry once on failure |

### ▶️ Running Tests

Run API tests:

```bash
npx playwright test --config=playwright.api.config.js
```

Run UI tests:

```bash
npx playwright test --config=playwright.config.js
```

---

## 🔄 Comparison: Playwright vs REST Assured

| Concern | REST Assured (Java) | Playwright (JavaScript) |
|---|---|---|
| HTTP client | `RestAssured.given()` | `request.newContext()` |
| Token retrieval | `EnvSteps.getNewOktaTokenForUser()` | `OktaClient.getToken()` |
| Headers setup | `setUpHeadersTokenAndEggKey()` | `DmsApiClient.getHeaders()` |
| GET documents | `ApiStepsV2.getDocumentForEntityV2()` | `DmsApiClient.getDocumentsForEntity()` |
| DELETE document | `ApiStepsV2.deleteDocument()` | `DmsApiClient.deleteDocument()` |
| Delete all | `ApiStepsV2.deleteAllDocumentsForEntity()` | `DmsApiClient.deleteAllDocumentsForEntity()` |
| Credentials source | System env vars (JSON structures) | `.env` file (flat key-value) |
| Test runner | JUnit 5 | Playwright Test |
