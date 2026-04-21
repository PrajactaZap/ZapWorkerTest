# Command Reference

## Installation Commands

```bash
# Install all dependencies
npm install

# Install Playwright browsers
npx playwright install

# Clean install (remove node_modules first)
npm run clean:all
npm install
```

## Test Execution Commands

### Basic Execution
```bash
# Run all tests
npm test

# Run all tests (alternative)
npx cucumber-js

# Dry run (validate scenarios without execution)
npx cucumber-js --dry-run
```

### Profile-Based Execution
```bash
# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression
```

### Tag-Based Execution
```bash
# Run tests with specific tag
npm run test:tags "@smoke"

# Run positive tests only
npm run test:tags "@positive"

# Run negative tests only
npm run test:tags "@negative"

# Run authentication tests
npm run test:tags "@authentication"

# Run tests with multiple tags (AND)
npm run test:tags "@smoke and @positive"

# Run tests with multiple tags (OR)
npm run test:tags "@smoke or @regression"

# Exclude tests with specific tag
npm run test:tags "not @skip"
```

### Feature-Based Execution
```bash
# Run specific feature file
npx cucumber-js src/features/authentication.feature

# Run specific feature file with tag
npx cucumber-js src/features/userManagement.feature --tags "@positive"

# Run multiple feature files
npx cucumber-js src/features/authentication.feature src/features/userManagement.feature
```

### Scenario-Based Execution
```bash
# Run specific scenario by name
npx cucumber-js --name "Successful login"

# Run scenarios matching pattern
npx cucumber-js --name "Create.*user"
```

### Parallel Execution
```bash
# Run tests in parallel (2 workers)
npm run test:parallel

# Run tests in parallel (custom workers)
npx cucumber-js --parallel 4
```

### Retry Failed Tests
```bash
# Retry failed tests once
npx cucumber-js --retry 1

# Retry failed tests twice
npx cucumber-js --retry 2

# Retry only tests with @flaky tag
npx cucumber-js --retry 1 --retry-tag-filter "@flaky"
```

## Reporting Commands

### Allure Reports
```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Generate and open report (combined)
npm run report

# Serve Allure report (with auto-refresh)
npm run allure:serve

# Clean Allure results
rimraf allure-results allure-report
```

### Cucumber Reports
```bash
# Reports are automatically generated in test-results/ folder
# - cucumber-report.html
# - cucumber-report.json

# View HTML report
start test-results/cucumber-report.html  # Windows
open test-results/cucumber-report.html   # macOS
xdg-open test-results/cucumber-report.html  # Linux
```

## Cleanup Commands

```bash
# Clean test artifacts only
npm run clean

# Clean everything including node_modules
npm run clean:all

# Clean specific directories
rimraf allure-results
rimraf allure-report
rimraf test-results
rimraf logs
```

## Debugging Commands

### Verbose Output
```bash
# Run with verbose output
npx cucumber-js --format-options '{"snippetInterface": "async-await"}'

# Run with progress bar
npx cucumber-js --format progress-bar

# Run with detailed output
npx cucumber-js --format progress
```

### List Scenarios
```bash
# List all scenarios (dry run)
npx cucumber-js --dry-run

# List scenarios with specific tag
npx cucumber-js --dry-run --tags "@smoke"

# List scenarios in specific feature
npx cucumber-js --dry-run src/features/authentication.feature
```

### Generate Step Definitions
```bash
# Generate missing step definitions
npx cucumber-js --dry-run --format snippets
```

## Environment Commands

### Set Environment Variables
```bash
# Windows (PowerShell)
$env:BASE_URL="https://reqres.in/api"
$env:LOG_LEVEL="debug"
npm test

# Windows (CMD)
set BASE_URL=https://reqres.in/api
set LOG_LEVEL=debug
npm test

# Linux/macOS
BASE_URL=https://reqres.in/api LOG_LEVEL=debug npm test
```

### Use Different .env File
```bash
# Copy environment-specific file
cp .env.qa .env
npm test

# Or create custom .env files
cp .env.example .env.staging
# Edit .env.staging
cp .env.staging .env
npm test
```

## Useful Combinations

### Run smoke tests and generate report
```bash
npm run test:smoke && npm run report
```

### Clean, install, and run tests
```bash
npm run clean && npm install && npm test
```

### Run specific tag and open report
```bash
npx cucumber-js --tags "@positive" && npm run allure:serve
```

### Run tests with custom timeout
```bash
npx cucumber-js --timeout 60000
```

### Run tests and save output to file
```bash
npm test > test-output.log 2>&1
```

## CI/CD Commands

### For Jenkins/GitHub Actions
```bash
# Install dependencies
npm ci

# Run tests with JUnit reporter
npx cucumber-js --format json:test-results/cucumber-report.json

# Generate Allure report
npm run allure:generate

# Exit with proper code
npm test || exit 1
```

## Troubleshooting Commands

### Check Node version
```bash
node --version
# Should be >= 18.0.0
```

### Check npm version
```bash
npm --version
```

### Verify Playwright installation
```bash
npx playwright --version
```

### List installed packages
```bash
npm list --depth=0
```

### Check for outdated packages
```bash
npm outdated
```

### Update packages
```bash
npm update
```

### Reinstall specific package
```bash
npm uninstall @playwright/test
npm install @playwright/test
```

## Quick Reference

| Task | Command |
|------|---------|
| Install | `npm install` |
| Run all tests | `npm test` |
| Run smoke tests | `npm run test:smoke` |
| Run with tag | `npm run test:tags "@smoke"` |
| Run specific feature | `npx cucumber-js src/features/auth.feature` |
| Parallel execution | `npm run test:parallel` |
| Generate report | `npm run report` |
| Clean artifacts | `npm run clean` |
| Dry run | `npx cucumber-js --dry-run` |

## Tips

1. **Always run dry-run first** to validate scenarios
2. **Use tags** for better test organization
3. **Run smoke tests** before full regression
4. **Generate reports** after test execution
5. **Clean artifacts** regularly to save space
6. **Use parallel execution** for faster results
7. **Check logs** in `logs/` directory for debugging
8. **Use environment variables** for different environments
