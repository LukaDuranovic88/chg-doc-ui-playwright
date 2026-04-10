# 🏗️ Framework Architecture — chg-doc-ui-playwright

> 📖 Internal reference for the QA team during Serenity BDD → Playwright migration.
> Read this before adding files, layers, or patterns to the framework.

---

## 🎯 What This Framework Tests

End-to-end workflows for the CHG Document Management UI (`chg-sf-doc-service`):

- 📤 Document **upload**, **request**, and **upload-to-request**
- ✅ Document **verification** via the Verification Queue (VQ)
- 🏷️ **Content type metadata** validation across 160+ content types
- 🔗 Across Salesforce entity types: `provider`, `assignment`, `opportunity`, `client`
- 🏢 Across business divisions: `CHS`, `CHG`, `WBY`, etc.

---

## 📐 Layer Diagram

```
┌─────────────────────────────────────────────┐
│              tests/ui/*.spec.js             │  ← What to test
├─────────────────────────────────────────────┤
│          fixtures/base.fixture.js           │  ← How objects are injected
├──────────────────────┬──────────────────────┤
│     pages/**/*.js    │   helpers/           │  ← How to interact with UI
│   (single surface)   │   documentActions.js │  ← (multi-page workflows)
├──────────────────────┴──────────────────────┤
│         api/clients/DmsApiClient.js         │  ← Cleanup + API assertions
├─────────────────────────────────────────────┤
│    test-data/enums/  │  config/environments │  ← What data to use
└─────────────────────────────────────────────┘
```

> ⬇️ **Rule:** Dependencies only flow downward. Tests import fixtures. Fixtures import pages. Pages never import helpers. Helpers never import fixtures.

---

## 📁 File-by-File Reference

### 🗂️ Root

| File | Purpose |
|------|---------|
| `playwright.config.js` | UI test config — single worker, Chromium, `retries: 1`, `headless: false` |
| `playwright.api.config.js` | API-only config — no browser, used with `--config` flag |
| `global-setup.js` | Runs once before all tests. Authenticates two Okta users, writes sessions to `.auth/` |
| `.env` | Local credentials and `TEST_ENV`. Never committed. Copy from `.env.example` |
| `CLAUDE.md` | AI constraint rules for Claude/Copilot. Not a human doc. |
| `README.md` | Setup, install, and run commands. Start here for local dev. |

---

### 🔐 `.auth/`

Pre-authenticated browser sessions. Written by `global-setup.js`, consumed by fixtures.

| File | User | Used By |
|------|------|---------|
| `session.json` | Default user (`CHS_USERNAME`) | All UI tests except VQ |
| `cssuser.json` | VQ user (`VQ_CSS_USERNAME`) | `vqContext` / `vqPage` fixtures only |

> 🚫 Never commit these. Never manually edit them. If auth breaks, delete them and re-run — `global-setup.js` will regenerate.

---

### ⚙️ `config/`

| File | Purpose |
|------|---------|
| `environments.js` | Maps `TEST_ENV` values (`local`, `feature`, `dev`, `stage`, `prod`) to base URLs. All URLs in the framework come from here — never hardcoded. |

---

### 🌐 `api/clients/`

| File | Purpose |
|------|---------|
| `DmsApiClient.js` | All HTTP calls to the DMS V2 API. Used for test cleanup (`deleteAllDocumentsForEntity()`) and API assertions. **Only file allowed to make HTTP calls.** |
| `OktaClient.js` | Fetches and caches Okta OAuth2 tokens. Used by `DmsApiClient` only. **Never call directly from tests, helpers, or fixtures.** |

> ⚠️ `helpers/apiClient.js` is an empty placeholder marked for deletion. Do not add logic there — all HTTP work belongs in `api/clients/DmsApiClient.js`.

---

### 🔧 `fixtures/`

| File | Purpose |
|------|---------|
| `base.fixture.js` | Single source of all fixture definitions. Composes page objects via Playwright's `test.extend()`. Exports `test` and `expect` — these are what spec files import, never `@playwright/test` directly. |

**Two fixture sessions in use:**

| Fixture | Session | Scope |
|---------|---------|-------|
| Default page fixtures | `session.json` | default |
| `vqContext`, `vqPage` | `cssuser.json` | `'test'` (isolated per test) |

> 🔒 The VQ fixtures must use `scope: 'test'` because the cssuser session state must be isolated — VQ actions (verify, archive, transfer) mutate shared queue state.

---

### 🛠️ `helpers/`

| File | Purpose |
|------|---------|
| `documentActions.js` | The only place for multi-page workflow abstractions. Contains exactly three helpers (see below). |

**The three workflows:**

| Helper | What it does |
|--------|-------------|
| `uploadWithNoRequest` | Opens upload modal → selects category/content type → attaches file → submits |
| `makeRequest` | Opens request modal → selects category/content type → submits |
| `uploadToRequest` | Uploads a file directly to an existing open request |

> 📏 **Decision rule:** If a workflow spans more than one page object and is used in more than one test, it goes here. If it's used in only one test, it stays in the spec. If it touches only one page object, it's a page object method.

---

### 📄 `pages/`

#### `BasePage.js`
Base class for all page objects. Provides `navigate()`, `waitForPageLoad()`, `getTitle()`. Every page object extends this. Constructor receives only `page`.

#### `HomePage.js`
Home page interactions — entity navigation, division selection.

#### `LoginPage.js`
🚧 Empty stub. Do not add logic until there is a ticket requiring it. Auth is handled by `global-setup.js`.

#### `CategoryComponent.js`
Represents the collapsible category table on the document management page. Always scoped by `categoryId` to prevent strict mode violations when multiple categories are expanded. Expansion state is detected via SVG caret transform, not child visibility.

#### `VerificationQueuePage.js`
Full VQ page — filtering, sorting, pagination, document review panel, and Edit Content Type modal interactions. Scoped to the `Documents in Review` tabpanel to avoid strict mode violations from the duplicate `Edit Pending` tab.

> 🔜 The Edit Content Type modal behavior is currently embedded here. It will be extracted to `EditContentTypeModal.js extends BaseModal` when the VQ refactor ticket is picked up.

---

### 🪟 `pages/modals/`

#### `BaseModal.js`
Parent class for all modals. Contains:
- 📋 All metadata field locators (40+ fields) across dropdowns, text inputs, and date inputs
- 🗺️ `_optionalFieldLocators` map — keys match `ContentTypes.js` `optional[]` field label strings exactly
- ✔️ `verifyRequiredFields()` and `verifyOptionalFields()` — driven by `ContentTypes.js` data
- 📨 `submitAndClose(modalLocator)` — handles submit → spinner → close sequence

> ⚠️ **Silent failure risk:** If a field label in `ContentTypes.js` does not match a key in `_optionalFieldLocators`, `verifyOptionalFields()` silently skips it. When adding a new content type, verify the field label matches exactly.

#### `UploadModal.js`
Extends `BaseModal`. Adds:
- 📁 `fileInput` — `input[type="file"]`, set via `setInputFiles()` only
- 📤 `uploadFile(fileName)` — resolves path from `test-data/test-files/`
- 📃 `getContentTypes()`, `getSubCategories()` — for dropdown validation tests
- ❌ `closeModal()` — Escape key + wait for hidden
- 📨 `submitAndClose()` — delegates to `super.submitAndClose(this.modal)`

#### `RequestModal.js`
Extends `BaseModal`. Only override is `submitAndClose()` — passes `#request-document-modal` locator to base. No other differences.

---

### 🗄️ `test-data/`

#### `enums/` (21 files)
Flat objects with `UPPER_CASE` or `PascalCase` keys. One concern per file. No cross-imports.

| File | Purpose |
|------|---------|
| `ContentTypes.js` | Defines every content type with `displayName`, `required[]`, and `optional[]` field labels. Drives `BaseModal` field verification. |
| `TestEntityIds.js` | All Salesforce entity IDs used in tests. Check here before creating a new entity. |
| `VQFilter.js` | Filter type keys used by `VerificationQueuePage.addFilter()` and `clearFilter()` |
| `Division.js` | Division codes used across tests and VQ filters |
| `Categories.js` | Category names used in modal `openCategory()` calls |
| All others | Supporting enum values (states, subcategories, classifications, etc.) |

#### `test-files/`
| File/Folder | Purpose |
|-------------|---------|
| `test.pdf` | Standard file used in all upload tests |
| `corrupted-files/` | Files used exclusively in DM-1933 corrupted file error tests |

---

### 🧪 `tests/`

#### `tests/ui/`

| File | Count | Scope |
|------|-------|-------|
| `categories.spec.js` | 25 tests | Upload/request/uploadToRequest across document categories |
| `contentType.spec.js` | 14 tests | Content type metadata field smoke across entity types and divisions |
| `vq.spec.js` | 18 tests | VQ workflows — verify, archive, transfer, corrupted file handling |

#### `tests/api/`

| File | Purpose |
|------|---------|
| `users.api.spec.js` | 🚧 Empty stub. Do not add tests without a ticket. |

---

### 📚 `docs/`

| File | Purpose |
|------|---------|
| `API-TESTING-SETUP.md` | Guide for running and extending API tests |
| `MCP-AGENTS_SETUP.md` | Setup guide for AI-assisted test generation via Playwright MCP |

---

## 🧹 What Needs Cleanup

These are known issues to resolve during migration — not architectural decisions:

| Item | Issue | Action |
|------|-------|--------|
| `EditContentTypeModal` | Embedded in `VerificationQueuePage.js` | Extract to `pages/modals/EditContentTypeModal.js` when VQ refactor is picked up |
| `_optionalFieldLocators` silent skip | Missing field labels fail silently | Convert to throw on unrecognized key |
| `helpers/apiClient.js` | Empty placeholder in wrong location | Delete — all HTTP work belongs in `api/clients/DmsApiClient.js` |

---

## 🧭 Decision Rules — Where Does New Code Go?

| Scenario | Where it goes |
|----------|--------------|
| 🔍 New locator | Page object constructor or `BaseModal._optionalFieldLocators`. Never in a spec file or helper. |
| 🔄 New multi-step workflow | `helpers/documentActions.js`, only if used in 2+ existing tests in the same PR. Otherwise inline in the spec. |
| 🏷️ New content type | `ContentTypes.js` entry + `BaseModal._optionalFieldLocators` entry only if a new metadata field is introduced. No new enum file. |
| 🆔 New Salesforce entity ID | `TestEntityIds.js`. Check there first before adding. |
| 🔧 New fixture | `fixtures/base.fixture.js` only. No new fixture files. |
| 📄 New page or modal | Extend `BasePage` or `BaseModal`. Register in `fixtures/base.fixture.js`. Never instantiate directly in a test. |
| 🌐 New environment URL | `config/environments.js`. Never hardcode. |
| 🔑 New auth or token logic | `api/clients/OktaClient.js` only. Never call `OktaClient` directly from tests, helpers, or fixtures. |