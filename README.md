# 🎭 DocUI Playwright Test Suite

> **Modern E2E testing for `chg-sf-doc-service` (EGG)**
> Migrated from Java/Selenium/Serenity BDD to Playwright for improved reliability and performance.

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✅ Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🏃‍♂️ Running Tests](#️-running-tests)
- [📁 Project Structure](#-project-structure)
- [📊 Reports & Debugging](#-reports--debugging)
- [🤖 AI-Powered Testing](#-ai-powered-testing)
- [🐛 Troubleshooting](#-troubleshooting)
- [🚀 Contributing](#-contributing)

---

## 🎯 Overview

This test suite provides comprehensive end-to-end testing for the DocUI application using Playwright. It supports testing across multiple environments with automated authentication via Okta SSO.

### ✨ Key Features

- 🔐 **Okta SSO Integration** - Automated authentication flow
- 🌍 **Multi-Environment Support** - local, feature, dev, stage, prod
- 🎥 **Rich Reporting** - Screenshots, videos, traces on failure
- 🤖 **AI Test Generation** - Playwright MCP agents for automated test creation
- 📊 **Page Object Model** - Maintainable and scalable test architecture
- 🔌 **API Testing** - Direct HTTP testing via Playwright's built-in request client (no REST Assured needed)

---

## ✅ Prerequisites

Before getting started, ensure you have:

- [ ] **Node.js** v16+ installed ([Download here](https://nodejs.org/))
- [ ] **Access to mychg.okta.com** with valid credentials
- [ ] **chg-sf-doc-service** repository cloned (for local development)
- [ ] **VS Code** with GitHub Copilot (optional, for AI features)

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd chg-doc-ui-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
```

> ⚠️ **Never commit `.env` to the repository.**
> It contains your personal Okta credentials and is already listed in `.gitignore`.
> Each developer maintains their own local copy — only `.env.example` gets pushed to git.

### 3. Run Your First Test

```bash
# Run all UI tests
npx playwright test tests/ui/
```

### How Authentication Works

1. `global-setup.js` runs **once** before all tests
2. It logs into Okta and saves the session to `.auth/session.json` (default user) and `.auth/cssuser.json` (VQ user)
3. Every test reuses the appropriate session — no login overhead per test
4. If the session expires, delete the relevant `.auth/*.json` file and re-run — `global-setup.js` will regenerate it

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following configuration:

```bash
# ===========================================
# ENVIRONMENT CONFIGURATION
# ===========================================
TEST_ENV=local                              # Target environment
TEST_USERNAME=your_email@chghealthcare.com  # Your Okta username (default user)
TEST_PASSWORD=your_secure_password          # Your Okta password (default user)

# ===========================================
# VQ USER (Verification Queue)
# ===========================================
VQ_CSS_USERNAME=cssuser_email@chghealthcare.com  # CSS user for VQ tests
VQ_CSS_PASSWORD=cssuser_secure_password          # CSS user password

# ===========================================
# APPLICATION CONTEXT
# ===========================================
ENTITY_ID=003A000000pGqGo                  # Salesforce entity ID
PAGE=provider                              # Application page context
DIVISION=CHS                               # Business division
```

### Headless Mode

Headless mode is configured directly in `playwright.config.js` and `global-setup.js` — not via an environment variable.

| File | Controls |
|------|----------|
| `playwright.config.js` → `use.headless` | All test browsers |
| `global-setup.js` → `chromium.launch({ headless })` | The one-time Okta login browser |

Set both to `false` when debugging, `true` for CI and normal runs.

### Environment Options

| Environment | Description | Local Service Required |
|-------------|-------------|----------------------|
| **local** | Local development server | ✅ Yes (`serve:local`) |
| **feature** | Feature branch environment | ✅ Yes (`serve:feature`) |
| **dev** | Development environment | ✅ Yes (`serve:dev`) |
| **stage** | Staging environment | ❌ No |
| **prod** | Production environment | ❌ No |

### Division Options

| Code | Division Name |
|------|---------------|
| **CHS** | 
| **CHG** | 
| **CAP** | 
| **CHA** | 
| **CHP** | 
| **GMD** | 
| **GMI** | 
| **WBY** | 
| **WMS** |

---

## 🏃‍♂️ Running Tests

### Basic Test Execution

```bash
# Run all UI tests
npx playwright test tests/ui/

# Run specific test file
npx playwright test tests/ui/contentType.spec.js
npx playwright test tests/ui/categories.spec.js
npx playwright test tests/ui/vq.spec.js

# Run tests matching a pattern
npx playwright test --grep "upload document"
```

### Debug Mode

```bash
# Interactive debugging
npx playwright test --debug

# Headed mode (visible browser)
npx playwright test --headed

# Run a specific test by name in headed mode
npx playwright test tests/ui/vq.spec.js --grep "Document with no request transferred to CT with no request" --headed

# Slow motion for demo purposes
npx playwright test --headed --slowMo=1000
```

### API Test Execution

```bash
# Run API tests (no browser required)
npx playwright test --config=playwright.api.config.js
```

> 📖 **Detailed API Guide:** See [docs/API-TESTING-SETUP.md](docs/API-TESTING-SETUP.md) for full API testing documentation.

### Environment-Specific Testing

#### For Local/Feature/Dev Environments

**Step 1:** Start the local service
```bash
# Open chg-sf-doc-service in IntelliJ and run:
# - serve:local    (for TEST_ENV=local)
# - serve:feature  (for TEST_ENV=feature)
# - serve:dev      (for TEST_ENV=dev)
```

**Step 2:** Run tests
```bash
# Option A: Use .env configuration
npx playwright test

# Option B: Override environment inline
TEST_ENV=local npx playwright test
TEST_ENV=feature npx playwright test
TEST_ENV=dev npx playwright test
```

#### For Stage/Prod Environments

```bash
# No local service needed - runs against live environments
TEST_ENV=stage npx playwright test
TEST_ENV=prod npx playwright test
```

> ⚠️ **Important:** Run each environment command separately. Never run multiple environments simultaneously.
> CI always targets `stage`. Never set `TEST_ENV=prod` in automated or CI runs.

### Custom Test Filters

```bash
# Run tests by tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"

# Exclude specific tests
npx playwright test --grep-invert "@skip"
```

### Parallel Execution

```bash
# Control number of workers
npx playwright test --workers=4

# Disable parallel execution
npx playwright test --workers=1
```

### Recording Tests

```bash
# Record a new test
npx playwright codegen localhost:8081

# Record against specific environment
TEST_ENV=stage npx playwright codegen

# Record with existing auth session (e.g. verification queue)
npx playwright codegen --load-storage='.auth/cssuser.json' --ignore-https-errors 'https://localhost:8081/#/verification-queue?page=verification-queue&division=CHG'
```

---

## 📁 Project Structure

```
📁 chg-doc-ui-playwright/
├── 📄 README.md                          # This file
├── 📄 CLAUDE.md                          # AI constraint rules (Claude/Copilot) — not a human doc
├── 📄 ARCHITECTURE.md                    # Framework architecture and file responsibilities
├── 📄 package.json                       # Dependencies and scripts
├── 📄 playwright.config.js               # UI test config (Chromium only)
├── 📄 playwright.api.config.js           # API-only config — no browser
├── 📄 global-setup.js                    # One-time Okta authentication (two users)
├── 📄 .env.example                       # Environment template
├── 📁 config/
│   └── 📄 environments.js                # Base URLs per environment
├── 📁 pages/                             # Page Object Models
│   ├── 📄 BasePage.js                    # Base class — all page objects extend this
│   ├── 📄 HomePage.js                    # Home page interactions
│   ├── 📄 CategoryComponent.js           # Collapsible category table component
│   ├── 📄 VerificationQueuePage.js       # VQ filtering, sorting, review actions
│   └── 📁 modals/
│       ├── 📄 BaseModal.js               # All metadata field locators + submit logic
│       ├── 📄 UploadModal.js             # Extends BaseModal — file upload
│       └── 📄 RequestModal.js            # Extends BaseModal — document request
├── 📁 fixtures/
│   └── 📄 base.fixture.js                # All fixtures — import test/expect from here
├── 📁 helpers/
│   └── 📄 documentActions.js             # Multi-page workflow helpers (upload, request, uploadToRequest)
├── 📁 api/
│   ├── 📁 clients/
│   │   ├── 📄 OktaClient.js              # Okta OAuth2 token fetcher — used by DmsApiClient only
│   │   └── 📄 DmsApiClient.js            # All DMS HTTP calls — only file allowed to make HTTP requests
│   └── 📄 ApiStepsV2.spec.js             # API-only test suite
├── 📁 test-data/
│   ├── 📁 enums/                         # 21 enum files — one concern per file, no cross-imports
│   │   ├── 📄 ContentTypes.js            # All content types with required/optional field definitions
│   │   ├── 📄 TestEntityIds.js           # All Salesforce entity IDs used in tests
│   │   ├── 📄 VQFilter.js                # VQ filter type keys
│   │   ├── 📄 Division.js                # Division codes
│   │   ├── 📄 Categories.js              # Category names
│   │   └── 📄 ...                        # Supporting enums (states, subcategories, etc.)
│   └── 📁 test-files/
│       ├── 📄 test.pdf                   # Standard upload file
│       └── 📁 corrupted-files/           # DM-1933 error testing only
├── 📁 tests/
│   ├── 📁 ui/
│   │   ├── 📄 categories.spec.js         # 25 tests — upload/request/uploadToRequest across categories
│   │   ├── 📄 contentType.spec.js        # 14 tests — content type metadata smoke
│   │   └── 📄 vq.spec.js                 # 18 tests — VQ workflows
│   └── 📁 api/
│       └── 📄 users.api.spec.js          # 🚧 Stub — do not add tests without a ticket
├── 📁 docs/
│   ├── 📄 API-TESTING-SETUP.md           # API testing guide
│   └── 📄 MCP-AGENTS_SETUP.md           # AI test generation guide
└── 📁 .vscode/
    └── 📄 mcp.json                       # MCP server config
```

> 📖 For detailed file responsibilities and architectural rules, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 📊 Reports & Debugging

### Test Reports

```bash
# Open HTML report
npx playwright show-report

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit XML (for CI/CD)
npx playwright test --reporter=junit
```

### Trace Viewing

```bash
# Open trace viewer
npx playwright show-trace test-results/trace.zip

# Open specific trace file
npx playwright show-trace test-results/example-test/trace.zip
```

### Screenshots and Videos

By default, Playwright captures:
- 📸 **Screenshots** on test failure
- 🎥 **Videos** for failed tests
- 🔍 **Traces** for debugging

Files are saved to `test-results/` and `playwright-report/` directories.

---

## 🤖 AI-Powered Testing

This project includes Playwright MCP agents for AI-assisted test creation and maintenance.

### Available Agents

| Agent | Purpose |
|-------|---------|
| 🧠 `@playwright-test-planner` | Create test plans from application exploration |
| ⚡ `@playwright-test-generator` | Generate tests from plans |
| 🔧 `@playwright-test-healer` | Fix failing tests automatically |

> 📖 **Detailed Guide:** See [docs/MCP-AGENTS_SETUP.md](docs/MCP-AGENTS_SETUP.md) for complete setup instructions.

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **"Timeout waiting for element"** | Use `waitFor()`, `waitForLoadState()`, or expect-based polling — never increase `retries` to mask flakiness |
| **"Authentication failed"** | Verify credentials in `.env` and check Okta access. Delete `.auth/*.json` and re-run to regenerate sessions |
| **"Service not running"** | Start local service with correct IntelliJ script for your `TEST_ENV` |
| **"Browser not found"** | Run `npx playwright install` |
| **"Port already in use"** | Stop existing local services or change port configuration |

### Debug Steps

1. **Check Environment Configuration**
   ```bash
   cat .env
   ```

2. **Verify Service Status**
   ```bash
   curl http://localhost:8081/health
   ```

3. **Run with Verbose Logging**
   ```bash
   DEBUG=pw:api npx playwright test
   ```

4. **Regenerate Auth Sessions**
   ```bash
   rm .auth/*.json && npx playwright test
   ```

### Getting Help

- 📖 **Playwright Docs:** [playwright.dev](https://playwright.dev)
- 📐 **Framework Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- 💬 **Team Chat:** Contact the QA team for assistance

---

## 🚀 Contributing

1. **Feature Branches:** Create feature branches from `main`
2. **Test Coverage:** Ensure new features include corresponding tests
3. **Code Review:** All changes require peer review
4. **Documentation:** Update `README.md` and `ARCHITECTURE.md` when adding new files or patterns
5. **AI Constraints:** Review `CLAUDE.md` before making structural changes — it governs what Claude and Copilot are allowed to do in this repo

## 📝 License

This project is part of CHG Healthcare's internal testing infrastructure.

---

> **Happy Testing!** 🎭✨