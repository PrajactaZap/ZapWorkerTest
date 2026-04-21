# Quick Setup Guide

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright (if needed)
```bash
npx playwright install
```

### 3. Verify Installation
```bash
npm test -- --dry-run
```

## Running Your First Test

### Run smoke tests
```bash
npm run test:smoke
```

### Run a specific feature
```bash
npx cucumber-js src/features/authentication.feature
```

### Run with specific tag
```bash
npx cucumber-js --tags "@positive"
```

## Generate Reports

### After running tests, generate Allure report
```bash
npm run allure:generate
npm run allure:open
```

### Or use the combined command
```bash
npm run report
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:regression` | Run regression tests |
| `npm run test:parallel` | Run tests in parallel |
| `npm run report` | Generate and open Allure report |
| `npm run clean` | Clean test artifacts |

## Folder Structure Overview

```
src/
├── config/          # Configuration files
├── data/            # Test data and schemas
├── features/        # Cucumber feature files
├── services/        # API service layer (business logic)
├── step-definitions/# Step implementations (glue code)
├── support/         # Hooks and World
└── utils/           # Utilities and helpers
```

## Key Concepts

### Service Layer
All API calls are made through service classes. Step definitions should NEVER contain API logic.

### World
The Cucumber World object stores:
- API client instance
- Authentication token
- Response data
- Test data
- Request/response logs

### Hooks
- `BeforeAll` - Setup test directories
- `Before` - Initialize API client
- `Before @login` - Perform authentication
- `After` - Cleanup and attach logs on failure
- `AfterAll` - Final cleanup

### Authentication
Use `@login` tag on scenarios that require authentication. The hook will automatically:
1. Login with valid credentials
2. Extract token
3. Store token in World
4. Inject token in subsequent requests

## Troubleshooting

### Module not found errors
Ensure you're using Node.js >= 18.0.0 and all imports have `.js` extensions.

### Allure command not found
Install globally: `npm install -g allure-commandline`
Or use: `npm run allure:serve`

### Tests failing
1. Check `.env` configuration
2. Verify BASE_URL is correct
3. Check internet connection
4. Review logs in `logs/` directory

## Next Steps

1. Review existing feature files in `src/features/`
2. Understand the service layer in `src/services/`
3. Check test data in `src/data/testData.json`
4. Run tests and review Allure reports
5. Add your own test scenarios

Happy Testing! 🚀
