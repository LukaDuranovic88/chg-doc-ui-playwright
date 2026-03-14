# 🎭 Playwright MCP Agents Setup Guide

> **Reference:** [playwright.dev/docs/test-agents](https://playwright.dev/docs/test-agents)

## 📋 Overview

Playwright MCP (Model Context Protocol) provides AI-powered test automation through three specialized agents that integrate seamlessly with VS Code Copilot. These agents work together to create, generate, and maintain your test suite automatically.

## 🤖 Available Agents

| Agent | Purpose | Input | Output |
|-------|---------|-------|--------|
| 🧠 **`playwright-test-planner`** | Explores your application and creates comprehensive test plans | URL + feature description | Markdown test plan (`specs/`) |
| ⚡ **`playwright-test-generator`** | Converts test plans into executable Playwright tests | Test plan file | Test files (`tests/`) |
| 🔧 **`playwright-test-healer`** | Automatically fixes failing tests by analyzing errors | Failing test file | Patched, working test |

## ✅ Prerequisites

Before setting up the agents, ensure you have:

- [ ] **VS Code** v1.105 or later
- [ ] **GitHub Copilot** extension installed and active
- [ ] **Playwright** v1.40+ installed in your project
- [ ] **Node.js** v16+ for MCP server support

## 🚀 Setup Instructions

### Step 1: Install Required Packages

```bash
# Install the Playwright MCP package
npm install @playwright/mcp

# Or if you prefer the test-specific server
npm install playwright-mcp-server
```

### Step 2: Initialize Agents

```bash
npx playwright init-agents --loop=vscode
```

This command creates the following project structure:

```
📁 chg-doc-ui-playwright/
├── 📁 .github/
│   ├── 📁 agents/                    # ← Agent configuration files
│   │   ├── 📄 playwright-test-generator.agent.md
│   │   ├── 📄 playwright-test-healer.agent.md
│   │   └── 📄 playwright-test-planner.agent.md
│   └── 📁 workflows/
│       └── 📄 copilot-setup-steps.yml
├── 📁 specs/                        # ← Test plans (human-readable)
│   └── 📄 README.md
├── 📁 tests/
│   └── 📄 seed.spec.ts              # ← Base context for all agents
└── 📁 .vscode/
    └── 📄 mcp.json                  # ← MCP server configuration
```

### Step 3: Configure MCP Server

Verify your `.vscode/mcp.json` contains the correct configuration:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "type": "stdio"
    },
    "playwright-test-planner": {
      "command": "npx",
      "args": ["playwright-mcp-server"],
      "type": "stdio"
    }
  },
  "inputs": []
}
```

### Step 4: Start MCP Servers

1. **Open** `.vscode/mcp.json` in VS Code
2. **Click** the **▷ Start** button above the `"servers"` line
3. **Verify** the status shows **Running | 24+ tools**

> ⚠️ **Troubleshooting:** If servers fail to start, check that packages are installed and VS Code Copilot is active.

### Step 5: Verify Agent Availability

1. **Open** Copilot Chat (`Ctrl/Cmd + Shift + I`)
2. **Click** the **@** symbol or **Agent** dropdown
3. **Confirm** you see all three agents:
   - ✅ `@playwright-test-planner`
   - ✅ `@playwright-test-generator`  
   - ✅ `@playwright-test-healer`

## 🎯 How to Use the Agents

### 🧠 Planning Tests with `@playwright-test-planner`

**Purpose:** Analyze your application and create structured test plans.

**Example prompt:**
```
@playwright-test-planner

Explore the DocUI application at:
https://localhost:8081/#/home?primaryEntityId=003A000000pGqGo&entityIds=003A000000pGqGo&page=provider&division=CHS

Create a comprehensive test plan for:
- Document upload functionality
- File validation (PDF, images)
- Upload progress tracking
- Error handling for invalid files
```

**Expected output:** `specs/document-upload.md` with structured test scenarios

---

### ⚡ Generating Tests with `@playwright-test-generator`

**Purpose:** Convert test plans into executable Playwright test files.

**Example prompt:**
```
@playwright-test-generator

Generate Playwright tests from the attached spec file: specs/document-upload.md

Requirements:
- Use our existing page object models
- Include proper error assertions
- Add screenshot capture on failure
```

**Expected output:** Test files in `tests/` directory with full implementation

---

### 🔧 Healing Tests with `@playwright-test-healer`

**Purpose:** Automatically fix failing tests by analyzing errors and updating selectors or logic.

**Example prompt:**
```
@playwright-test-healer

Fix the failing test: tests/ui/contentType.spec.js

Error: Locator 'button[data-testid="upload-btn"]' not found
Test: "should upload a valid PDF document"
```

**Expected output:** Updated test with corrected selectors and improved reliability

## ⚙️ Configuration

### Seed Test Setup

The `tests/seed.spec.ts` file provides the foundational page context for all agents. Update it to match your authentication setup:

```typescript
import { test, expect } from './fixtures/base.fixture.js';

test('seed', async ({ page }) => {
  // Authentication is handled by global-setup.js
  // This test provides the base logged-in context for all agents
  
  await test.step('Navigate to home page', async () => {
    await page.goto('/home');
    await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
  });
  
  await test.step('Verify user permissions', async () => {
    // Add any permission checks needed for test context
    await expect(page.locator('[data-testid="upload-section"]')).toBeVisible();
  });
});
```

### Environment Configuration

Ensure your agents can access the correct environment:

```javascript
// config/environments.js
module.exports = {
  staging: {
    baseURL: 'https://staging.docui.app',
    credentials: {
      username: process.env.STAGING_USERNAME,
      password: process.env.STAGING_PASSWORD
    }
  },
  local: {
    baseURL: 'https://localhost:8081',
    credentials: {
      username: process.env.LOCAL_USERNAME,
      password: process.env.LOCAL_PASSWORD
    }
  }
};
```

## 🔄 Workflow Best Practices

1. **Planning Phase**
   - Start with `@playwright-test-planner` to explore and document test scenarios
   - Review generated specs before proceeding to implementation

2. **Generation Phase**
   - Use `@playwright-test-generator` to convert specs into tests
   - Review generated code for adherence to project patterns

3. **Maintenance Phase**
   - Use `@playwright-test-healer` for quick fixes
   - Regularly update seed tests to maintain context

## 📝 Important Notes

| Action | Frequency | Purpose |
|--------|-----------|---------|
| Re-run `npx playwright init-agents --loop=vscode` | After every Playwright update | Sync agent capabilities with new Playwright features |
| Commit `.github/agents/` | Always | These are agent definitions essential for team collaboration |
| Commit `specs/` | Always | Human-readable test plans serve as living documentation |
| Review generated tests | Before committing | Ensure code quality and project standards compliance |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Agents not appearing in Copilot | Restart VS Code and check MCP server status |
| MCP server won't start | Verify package installation: `npm ls @playwright/mcp` |
| Generated tests fail immediately | Update `seed.spec.ts` with correct authentication |
| Planner can't access application | Check network connectivity and URL accessibility |

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [GitHub Copilot for VS Code](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-your-ide)
- [Model Context Protocol](https://modelcontextprotocol.io/docs)