# CLAUDE.md — chg-doc-ui-playwright

> AI constraint rules for Claude and GitHub Copilot.
> This is not a human onboarding doc. For project structure and file responsibilities, see `ARCHITECTURE.md` (lowercase `.md`).

---

## 1. Project Overview

Playwright E2E test suite for the CHG Document Management UI (`chg-doc-ui`). Covers document upload, request, and verification workflows across Salesforce entity types (provider, assignment, opportunity, client) and business divisions.

- Language: JavaScript (`.js`) — all tests, pages, fixtures, helpers.
- Auth: Okta SAML, pre-authenticated in `global-setup.js`, sessions stored in `.auth/`.
- Two configs: `playwright.config.js` (UI), `playwright.api.config.js` (API-only).
- Single worker. `retries: 1`. Chromium only. `headless: false` locally, `headless: true` in CI.

> For full folder structure and file-by-file responsibilities, see `ARCHITECTURE.md`.

---

## 2. Locator Strategy — Priority Order

Use these in order. Stop at the first that works.

1. `getByRole()` — buttons, menus, tabs, inputs with implicit ARIA
2. `getByLabel()` — form inputs associated with a label
3. `getByPlaceholder()` — search inputs and date pickers without an associated label
4. `getByText()` — visible text content when role is not distinct
5. `getByTestId()` — `data-testid` attributes (currently rare in this codebase)
6. `locator('select.gear-qa-*')` — custom `gear-qa-` class selectors (app-specific QA hooks)
7. `locator('css selector')` — structural selectors only when no semantic alternative exists

**Scope rules:**
- When the same locator matches multiple elements, scope it to a unique parent first: `page.getByRole('tabpanel', { name: '...' }).locator(...)`.
- Use `.first()` only when strict mode cannot be satisfied via scoping.
- Never select by class names that are not `gear-qa-*` prefixed unless the element has no other stable attribute.
- If the only unique parent is a non-`gear-qa-*` class, use it and add a comment explaining why.

---

## 3. Page Object, Component, and Fixture Rules

**Page objects:**
- All must extend `BasePage`.
- Constructor receives only `page`. No other dependencies.
- Locators defined in constructor or lazily via getter — not recreated per call.
- Private helpers prefixed with `_` (e.g., `_isExpanded()`, `_filterContainer()`).
- Assertion methods prefixed with `assert` (e.g., `assertDocumentCount()`).
- No `expect()` in constructors or locator getters. Only in methods explicitly named `assert*` or `verify*`.
- Methods called only from within the page object are private (`_` prefix). Methods called from spec files or helpers are public (no prefix).

**Modals:**
- All modals extend `BaseModal`.
- File upload: always use `setInputFiles()` on `input[type="file"]`. No JS workarounds.
- `submitAndClose(modalLocator)` receives the scoping locator as a parameter from the caller. It must handle: submit click → submit hidden → spinner hidden → close click → modal hidden.
- Never duplicate locators from `BaseModal` in `UploadModal` or `RequestModal`.

**CategoryComponent:**
- Always scope locators by `categoryId` to prevent strict mode violations across multiple expanded categories.
- To detect expansion state, check for `aria-expanded` on the toggle element first. If the app does not expose `aria-expanded`, fall back to SVG caret transform (`rotate(90)`). Never infer expansion from child visibility.

**Fixtures:**
- Fixtures defined only in `fixtures/base.fixture.js`. Never create a new fixture file.
- VQ page objects always use `vqContext` (cssuser session), never the default session.
- Fixtures that hold browser context use `scope: 'test'`. Stateless service fixtures (API clients) use default scope.
- Export only `test` and `expect` from the fixture file. Import these in all test specs.

---

## 4. Test Structure Rules

- **Test names** follow the pattern: `[action] [entity/context] [condition]`
  - Correct: `uploads provider document with required fields only`
  - Incorrect: `test upload`, `should upload document when valid`
- **One `test.describe` block per workflow group.** Named after the scenario, not the page.
- **Split a spec file when** tests require a different fixture setup, a different auth session, or cover an entity type with no shared `beforeEach` with existing tests in that file. Do not split based on test count alone.
- **Every test must run in isolation** via `--grep`. No test may depend on state created by a prior test in the same file.
- **`beforeEach`** handles navigation and entity setup only. Workflow steps go in helpers.
- **`afterEach`** handles cleanup only — never navigation or workflow steps.
- **`expect.soft()` is not permitted.**
- **`test.only` must not be committed.** It silently disables all other tests in CI. Use `--grep` to run a subset locally.
- **`test.skip` must not be committed** without a comment explaining why.
- **Spec file placement** — use the first match:
  - Test covers metadata field visibility → `contentType.spec.js`
  - Test covers upload/request workflow across categories → `categories.spec.js`
  - Test involves the Verification Queue → `vq.spec.js`

---

## 5. What You Must Never Do

- **Never import `{ test, expect }` from `@playwright/test` directly in spec files.** Always import from `../../fixtures/base.fixture`.
- **Never hardcode Salesforce IDs, URLs, credentials, or environment-specific values in tests.** Use `TestEntityIds`, `environments.js`, and `.env`.
- **Never instantiate `DmsApiClient` directly in a spec file.** Use the `api` fixture from `base.fixture.js`.
- **Never add page object logic to spec files.** Locators and actions belong in `pages/`.
- **Never add test workflow logic to page objects.** Multi-step flows across pages belong in `helpers/documentActions.js`.
- **Never add a helper to `documentActions.js`** unless two or more tests calling it exist in the codebase at the time of the commit.
- **Never create a new fixture file.** All fixtures go in `fixtures/base.fixture.js`.
- **Never add a new enum file for data that fits in an existing enum.** Extend the existing file. No cross-imports between enum files.
- **Never skip `afterEach` cleanup.** Every test that creates documents must delete them via `api.deleteAllDocumentsForEntity()`. Use `try/finally` — re-throw after logging if cleanup fails.
- **Never use `page.waitForTimeout()`.** Use `waitFor()`, `waitForLoadState()`, or expect-based polling.
- **Never write raw HTTP calls outside `DmsApiClient.js`.**
- **Never add a second `playwright.config.js`.** UI tests use `playwright.config.js`, API tests use `playwright.api.config.js`.
- **Never commit `.env` or `.auth/*.json`.**
- **Never set `TEST_ENV=prod` in automated or CI runs.** CI targets `stage` only.
- **Never add modal logic to `VerificationQueuePage.js`.** New modals go in `pages/modals/`.
- **Never fix a flaky test by increasing `retries`.** The fix must be a deterministic wait (`waitForResponse`, `waitFor` on a locator state, or expect-based polling). Open a bug ticket instead.
- **Never re-create `helpers/apiClient.js`, `pages/LoginPage.js`, `tests/seed.spec.ts`, or the `specs/` folder.** These were deleted intentionally.

---

## 6. Code Change Discipline

Before touching any file, state:

1. **What** — the exact change (e.g., "add `selectDivision()` to `BaseModal`").
2. **Why** — the reason (e.g., "division dropdown missing from VQ transfer modal").
3. **Which files** — list every file that will change and why.

Then read each file before editing. Do not infer from memory.

**Adding a new test:**
- Check `TestEntityIds.js` for a suitable entity before creating one.
- Check `ContentTypes.js` for existing required/optional field definitions before modifying `BaseModal`.
- New test goes in the existing spec file that matches its scope (see Section 4).
- Use `uploadWithNoRequest`, `makeRequest`, or `uploadToRequest` from `helpers/documentActions.js` unless the workflow genuinely differs.

**Adding a new content type:**
- Add the entry to `ContentTypes.js` with `displayName`, `required`, and `optional` arrays.
- Add a locator to `BaseModal._optionalFieldLocators` only if a new metadata field is introduced.
- Do not add a new enum file.
- Verify the field label string matches a key in `_optionalFieldLocators` exactly — mismatches fail silently.

**Adding a new page or modal:**
- Extend `BasePage` or `BaseModal`.
- Register it as a fixture in `fixtures/base.fixture.js`.
- Do not instantiate it directly in tests.

**Modifying locators:**
- Confirm the `gear-qa-*` attribute exists in the running app before writing a selector against it.
- If switching locator strategy, update all usages of the old locator in the same PR.

**Environment/config changes:**
- Changes to `.env` structure require updating `config/environments.js` and `global-setup.js` together.

---

## 7. Known Issues — Do Not Replicate

| Issue | Location | Do Not |
|-------|----------|--------|
| Edit Content Type modal embedded in page class | `VerificationQueuePage.js` | Add more modal logic here. New modals go in `pages/modals/`. |
| `_optionalFieldLocators` silently skips unrecognized field labels | `BaseModal.js` | Rely on this behavior. It will be fixed to throw on unrecognized keys. |
| Double-click on radio button | `clickTransferWithRequest()` in `VerificationQueuePage.js` | Copy this pattern. It is a bug under investigation. |