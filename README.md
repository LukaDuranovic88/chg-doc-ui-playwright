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
- [🔧 Advanced Usage](#-advanced-usage)
- [📊 Reports & Debugging](#-reports--debugging)
- [🤖 AI-Powered Testing](#-ai-powered-testing)
- [🐛 Troubleshooting](#-troubleshooting)

## 🎯 Overview

This test suite provides comprehensive end-to-end testing for the DocUI application using Playwright. It supports testing across multiple environments with automated authentication via Okta SSO.

### ✨ Key Features

- 🔐 **Okta SSO Integration** - Automated authentication flow
- 🌍 **Multi-Environment Support** - local, feature, dev, stage, prod
- 📱 **Cross-Browser Testing** - Chromium, Firefox, WebKit
- 🎥 **Rich Reporting** - Screenshots, videos, traces on failure
- 🤖 **AI Test Generation** - Playwright MCP agents for automated test creation
- 📊 **Page Object Model** - Maintainable and scalable test architecture
- 🔌 **API Testing** - Direct HTTP testing via Playwright's built-in request client (no REST Assured needed)

## ✅ Prerequisites

Before getting started, ensure you have:

- [ ] **Node.js** v16+ installed ([Download here](https://nodejs.org/))
- [ ] **Access to mychg.okta.com** with valid credentials
- [ ] **chg-sf-doc-service** repository cloned (for local development)
- [ ] **VS Code** with GitHub Copilot (optional, for AI features)

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
# Run smoke tests
npx playwright test tests/ui/smoke.spec.js --headed
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root with the following configuration:

```bash
# ===========================================
# ENVIRONMENT CONFIGURATION
# ===========================================
TEST_ENV=local                              # Target environment
TEST_USERNAME=your_email@chghealthcare.com  # Your Okta username
TEST_PASSWORD=your_secure_password          # Your Okta password

# ===========================================
# APPLICATION CONTEXT
# ===========================================
ENTITY_ID=003A000000pGqGo                  # Salesforce entity ID
PAGE=provider                              # Application page context
DIVISION=CHS                               # Business division

# ===========================================
# OPTIONAL SETTINGS
# ===========================================
TIMEOUT=30000                              # Default timeout in ms
PARALLEL_WORKERS=2                         # Number of parallel test workers
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
| **CHS** | CHG Healthcare |
| **CHG** | CompHealth |
| **CAP** | Capabilities |
| **CHA** | CHG Analytics |
| **CHP** | CHG Partners |
| **GMD** | Global Medical Data |
| **GMI** | Global Medical Intelligence |
| **WBY** | Weatherby Healthcare |
| **WMS** | WMS Solutions |

## 🏃‍♂️ Running Tests

### Basic Test Execution

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/ui/contentType.spec.js

# Run tests in a specific folder
npx playwright test tests/ui/

# Run tests matching a pattern
npx playwright test --grep "upload document"

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

### Browser-Specific Testing

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on all browsers
npx playwright test --project=chromium --project=firefox --project=webkit
```

### Debug Mode

```bash
# Interactive debugging
npx playwright test --debug

# Headed mode (visible browser)
npx playwright test --headed

# Slow motion for demo purposes
npx playwright test --headed --slowMo=1000
```

## 📁 Project Structure

```
📁 chg-doc-ui-playwright/
├── 📄 README.md                          # This file
├── 📄 package.json                       # Dependencies and scripts
├── 📄 playwright.config.js               # Playwright configuration
├── 📄 global-setup.js                    # One-time Okta authentication
├── 📄 .env.example                       # Environment template
├── 📁 config/
│   └── 📄 environments.js                # Environment URL configurations
├── 📁 pages/                             # Page Object Models
│   ├── 📄 BasePage.js                    # Base page class
│   ├── 📄 HomePage.js                    # Home page interactions
│   └── 📁 modals/
│       └── 📄 UploadModal.js             # Upload modal interactions
├── 📁 fixtures/
│   └── 📄 base.fixture.js                # Custom test fixtures
├── 📁 helpers/
│   └── 📄 apiClient.js                   # API utilities
├── 📁 test-data/
│   └── 📁 enums/                         # Migrated from Java/Serenity enums
│       ├── 📄 Audited.js
│       ├── 📄 Categories.js
│       ├── 📄 Classification.js
│       ├── 📄 ContentTypes.js
│       ├── 📄 Division.js
│       ├── 📄 DocumentColumns.js
│       ├── 📄 DocumentStatus.js
│       ├── 📄 MetadataFields.js
│       ├── 📄 PageEnum.js
│       ├── 📄 Signed.js
│       ├── 📄 Specialty.js
│       ├── 📄 State.js
│       ├── 📄 SubCategory.js
│       ├── 📄 TestEntityIds.js
│       ├── 📄 TestMultiEntityIds.js
│       └── 📄 VQFilter.js
├── 📁 api/                               # API test clients and specs
│   ├── 📁 clients/
│   │   ├── 📄 OktaClient.js              # Okta token retrieval
│   │   └── 📄 DmsApiClient.js            # DMS GET/DELETE HTTP client
│   └── 📄 ApiStepsV2.spec.js             # DELETE endpoint tests                          # UI tests
│       ├── 📄 smoke.spec.js
│       └── 📄 contentType.spec.js
├── 📁 docs/
│   └── 📄 MCP-AGENTS_SETUP.md           # AI testing guide
└── 📁 .vscode/
    └── 📄 mcp.json                       # MCP server config
```

## 🔧 Advanced Usage

### Custom Test Filters

```bash
# Run tests by tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"

# Exclude specific tests
npx playwright test --grep-invert "@skip"

# Run tests in specific file pattern
npx playwright test tests/**/*.smoke.spec.js
```

### Parallel Execution

```bash
# Control number of workers
npx playwright test --workers=4

# Disable parallel execution
npx playwright test --workers=1

# Run tests in serial within files
npx playwright test --fullyParallel=false
```

### Recording Tests

```bash
# Record a new test
npx playwright codegen localhost:8081

# Record against specific environment
TEST_ENV=stage npx playwright codegen
```

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

## 🤖 AI-Powered Testing

This project includes Playwright MCP agents for AI-assisted test creation and maintenance.

### Available Agents

| Agent | Purpose |
|-------|---------|
| 🧠 `@playwright-test-planner` | Create test plans from application exploration |
| ⚡ `@playwright-test-generator` | Generate tests from plans |
| 🔧 `@playwright-test-healer` | Fix failing tests automatically |

### Quick Setup

```bash
# Install MCP packages (already included)
npm install @playwright/mcp playwright-mcp-server

# Initialize agents
npx playwright init-agents --loop=vscode
```

> 📖 **Detailed Guide:** See [docs/MCP-AGENTS_SETUP.md](docs/MCP-AGENTS_SETUP.md) for complete setup instructions.

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **"Timeout waiting for element"** | Increase timeout in `playwright.config.js` or use `waitFor()` |
| **"Authentication failed"** | Verify credentials in `.env` and check Okta access |
| **"Service not running"** | Start local service with correct IntelliJ script |
| **"Browser not found"** | Run `npx playwright install` |
| **"Port already in use"** | Stop existing local services or change port configuration |

### Debug Steps

1. **Check Environment Configuration**
   ```bash
   # Verify .env file exists and has correct values
   cat .env
   ```

2. **Verify Service Status**
   ```bash
   # Check if local service is running
   curl http://localhost:8081/health
   ```

3. **Run with Verbose Logging**
   ```bash
   # Enable debug output
   DEBUG=pw:api npx playwright test
   ```

4. **Test Authentication**
   ```bash
   # Run auth setup only
   npx playwright test global-setup.js
   ```

### Getting Help

- 📖 **Playwright Docs:** [playwright.dev](https://playwright.dev)
- 🎭 **Project Issues:** [Report bugs or request features]
- 💬 **Team Chat:** Contact the QA team for assistance

---

## 🚀 Contributing

1. **Feature Branches:** Create feature branches from `main`
2. **Test Coverage:** Ensure new features include corresponding tests
3. **Code Review:** All changes require peer review
4. **Documentation:** Update README when adding new features

## 📝 License

This project is part of CHG Healthcare's internal testing infrastructure.

---

> **Happy Testing!** 🎭✨

## How Authentication Works

1. `global-setup.js` runs **once** before all tests
2. It logs into Okta and saves the session to `.auth/session.json`
3. Every test reuses that session — no login overhead per test
4. If the session expires, just re-run the tests — it will re-authenticate automatically