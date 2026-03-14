# DocUIPlaywright

Playwright UI test suite for `chg-sf-doc-service` (EGG).  
Migrated from Java/Selenium/Serenity BDD.

---

## Prerequisites

- Node.js installed
- `chg-sf-doc-service` cloned and running locally (for local/feature/dev environments)
- Access to `mychg.okta.com`

---

## Setup

```bash
npm install
npx playwright install
cp .env.example .env   # then fill in your credentials
```

---

## .env Configuration

```plaintext
TEST_ENV=local                              # local | feature | dev | stage | prod
TEST_USERNAME=your_okta_email@chghealthcare.com
TEST_PASSWORD=your_okta_password

ENTITY_ID=003A000000pGqGo                  # Salesforce entity ID
PAGE=provider                              # provider | assignment | opportunity | account | client
DIVISION=CHS                              # CHS | CHG | CAP | CHA | CHP | GMD | GMI | WBY | WMS
```

---

## Running Tests

### Step 1 — Start the app (local/feature/dev only)

Open `chg-sf-doc-service` in IntelliJ and run the matching script:

| TEST_ENV | IntelliJ Script  |
|----------|------------------|
| local    | `serve:local`    |
| feature  | `serve:feature`  |
| dev      | `serve:dev`      |
| stage    | *(not needed)*   |
| prod     | *(not needed)*   |

### Step 2 — Run Playwright

**Option A — change TEST_ENV in your `.env` file, then run:**
```bash
npx playwright test
```

**Option B — inline command (overrides .env for that run only):**
```bash
# Run each command separately — one at a time
TEST_ENV=local npx playwright test
TEST_ENV=feature npx playwright test
TEST_ENV=dev npx playwright test
TEST_ENV=stage npx playwright test
```
> ⚠️ Never run all 4 lines at once — each must be run individually

---

## Running Specific Tests

```bash
# Run a single spec file
npx playwright test tests/ui/smoke.spec.js

# Run all tests in a folder
npx playwright test tests/ui/

# Run tests matching a name
npx playwright test --grep "content types"

# Run in headed mode (see the browser)
npx playwright test --headed

# Debug mode (step through test)
npx playwright test --debug
```

---

## View Test Report

```bash
npx playwright show-report
```


## How Authentication Works

1. `global-setup.js` runs **once** before all tests
2. It logs into Okta and saves the session to `.auth/session.json`
3. Every test reuses that session — no login overhead per test
4. If the session expires, just re-run the tests — it will re-authenticate automatically