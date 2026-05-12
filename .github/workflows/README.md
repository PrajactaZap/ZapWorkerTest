# CI/CD Pipeline Documentation

## Overview

This repository uses **GitHub Actions** for continuous integration and continuous deployment (CI/CD). The pipeline automatically runs tests, generates reports, and publishes results.

---

## Pipeline Features

### ✅ Automated Testing
- Runs on every **Pull Request** and **Push** to `main` or `develop` branches
- Executes all Cucumber BDD test scenarios
- Tests run on multiple Node.js versions (18.x, 20.x)

### 📊 Allure Reporting
- Automatically generates Allure HTML reports
- Publishes reports to GitHub Pages (for main branch)
- Uploads reports as artifacts for every run

### 🔍 Code Quality
- ESLint checks (if configured)
- Automated code quality validation

### 💬 PR Comments
- Automatically posts test results as comments on Pull Requests
- Shows pass/fail statistics and pass rate

---

## Workflow Triggers

The CI/CD pipeline runs on:

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

---

## Jobs

### 1. **Test Job**

Runs the API automation tests and generates reports.

**Steps:**
1. Checkout code
2. Setup Node.js (18.x, 20.x)
3. Install dependencies
4. Setup Java 17 (for Allure)
5. Install Allure CLI
6. Create `.env` file with secrets
7. Run Cucumber tests
8. Generate Allure report
9. Upload artifacts (results, reports, logs)
10. Publish to GitHub Pages (main branch only)
11. Comment on PR with results

### 2. **Lint Job**

Checks code quality using ESLint.

---

## Required GitHub Secrets

Configure these secrets in your repository settings:

### **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Description | Required | Example |
|-------------|-------------|----------|---------|
| `BASE_URL` | API base URL | No (has default) | `https://reqres.in/api` |
| `REQRES_API_KEY` | ReqRes API key | Yes | `pro_c0642a7a...` |

**Note:** If `BASE_URL` is not set, it defaults to `https://reqres.in/api`

---

## Setting Up GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

```
Name: REQRES_API_KEY
Value: pro_c0642a7a2a7adabfac5cc179919e2ed06ab288767205e21f2862ec858ec381e0
```

---

## Viewing Test Results

### **Option 1: GitHub Actions Tab**

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. View test results in the workflow summary
4. Download artifacts:
   - `allure-results-node-XX.x`
   - `allure-report-node-XX.x`
   - `test-results-node-XX.x`
   - `logs-node-XX.x`

### **Option 2: GitHub Pages (Main Branch Only)**

After a successful run on `main` branch:
- Visit: `https://[your-username].github.io/[repo-name]/allure-report/`
- Example: `https://PrajactaZap.github.io/ZapWorkerTest/allure-report/`

### **Option 3: Pull Request Comments**

Test results are automatically posted as comments on Pull Requests.

---

## Enabling GitHub Pages

To view Allure reports on GitHub Pages:

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**
4. Wait a few minutes for deployment
5. Visit the URL shown (e.g., `https://prajactazap.github.io/ZapWorkerTest/allure-report/`)

---

## Matrix Strategy

The pipeline runs tests on multiple Node.js versions:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

This ensures compatibility across different Node.js versions.

---

## Artifacts Retention

| Artifact | Retention Period |
|----------|------------------|
| Allure Results | 30 days |
| Allure Report | 30 days |
| Test Results | 30 days |
| Logs | 7 days |

---

## Manual Workflow Trigger

You can manually trigger the workflow:

1. Go to **Actions** tab
2. Select **API Automation CI/CD Pipeline**
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow**

---

## Local Testing Before Push

Before pushing changes, test locally:

```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open
```

---

## Troubleshooting

### **Tests Failing in CI but Passing Locally**

1. Check environment variables are set correctly in GitHub Secrets
2. Verify `.env` file is created properly in the workflow
3. Check Node.js version compatibility

### **Allure Report Not Generated**

1. Ensure Java 17 is installed (handled by workflow)
2. Check `allure-results` directory exists
3. Verify Allure CLI is installed globally

### **GitHub Pages Not Working**

1. Enable GitHub Pages in repository settings
2. Ensure `gh-pages` branch exists
3. Check workflow permissions (Settings → Actions → General → Workflow permissions)
4. Set to "Read and write permissions"

### **PR Comments Not Appearing**

1. Check workflow permissions
2. Ensure `GITHUB_TOKEN` has write access
3. Verify the workflow completed successfully

---

## Workflow Permissions

Ensure the workflow has proper permissions:

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

---

## Customization

### **Change Node.js Versions**

Edit `.github/workflows/ci-cd.yml`:

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x]  # Add or remove versions
```

### **Add More Branches**

```yaml
on:
  push:
    branches: [main, develop, staging]  # Add more branches
```

### **Change Test Command**

```yaml
- name: Run Cucumber Tests
  run: npm run test:smoke  # Change to specific test suite
```

---

## Best Practices

1. ✅ Always run tests locally before pushing
2. ✅ Keep secrets secure - never commit them
3. ✅ Review test results before merging PRs
4. ✅ Monitor artifact storage usage
5. ✅ Update dependencies regularly
6. ✅ Keep workflow files in version control

---

## Pipeline Status Badge

Add this badge to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/PrajactaZap/ZapWorkerTest/actions/workflows/ci-cd.yml/badge.svg)
```

---

## Support

For issues with the CI/CD pipeline:
1. Check workflow logs in Actions tab
2. Review this documentation
3. Check GitHub Actions documentation: https://docs.github.com/en/actions

---

**Last Updated:** April 2026
