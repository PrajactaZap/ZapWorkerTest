# API Automation Framework

Professional API testing framework powered by Playwright, Cucumber BDD, and detailed Allure reports.

## 🚀 Tech Stack

- **Playwright** - APIRequestContext for API testing
- **JavaScript (Node.js)** - ES6+ with modules
- **Cucumber BDD** - Behavior-driven development
- **Page Object Model** - Adapted for API services
- **MCP Pattern** - Modular Clean Pattern
- **Allure** - HTML reporting
- **Winston** - Logging
- **Ajv** - JSON schema validation

## 📁 Project Structure

```
DemoFramework/
├── src/
│   ├── config/
│   │   └── environment.js          # Environment configuration
│   ├── data/
│   │   ├── testData.json           # Test data for data-driven testing
│   │   └── schemas.json            # JSON schemas for validation
│   ├── features/
│   │   ├── authentication.feature  # Authentication scenarios
│   │   ├── userManagement.feature  # User CRUD scenarios
│   │   ├── crudFlow.feature        # E2E CRUD flow
│   │   ├── schemaValidation.feature # Schema validation tests
│   │   └── datadriven.feature      # Data-driven tests
│   ├── services/
│   │   ├── baseService.js          # Base service class
│   │   └── userService.js          # User service layer
│   ├── step-definitions/
│   │   ├── commonSteps.js          # Common step definitions
│   │   ├── userSteps.js            # User-related steps
│   │   ├── authSteps.js            # Authentication steps
│   │   ├── schemaSteps.js          # Schema validation steps
│   │   └── helperSteps.js          # Helper functions
│   ├── support/
│   │   ├── world.js                # Cucumber World implementation
│   │   └── hooks.js                # Before/After hooks
│   └── utils/
│       ├── apiClient.js            # API client wrapper
│       ├── assertions.js           # Custom assertion helpers
│       ├── helpers.js              # Utility functions
│       ├── logger.js               # Winston logger
│       └── schemaValidator.js      # JSON schema validator
├── .env                            # Environment variables
├── .env.example                    # Example environment file
├── .babelrc                        # Babel configuration
├── .gitignore                      # Git ignore file
├── cucumber.js                     # Cucumber configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   cd DemoFramework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (if needed)
   ```bash
   npx playwright install
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file as needed.

## ▶️ Running Tests

### Run all tests
```bash
npm test
```

### Run smoke tests
```bash
npm run test:smoke
```

### Run regression tests
```bash
npm run test:regression
```

### Run tests with specific tags
```bash
npm run test:tags "@positive"
npm run test:tags "@negative"
npm run test:tags "@login"
npm run test:tags "@smoke and @positive"
```

### Run tests in parallel
```bash
npm run test:parallel
```

## 📊 Reporting

### Generate and open Allure report
```bash
npm run report
```

### Generate Allure report only
```bash
npm run allure:generate
```

### Open existing Allure report
```bash
npm run allure:open
```

### Serve Allure report (auto-refresh)
```bash
npm run allure:serve
```

## 🧪 Test Scenarios

### ✅ Positive Scenarios

1. **User Management**
   - Get list of users (200)
   - Get single user by ID (200)
   - Create new user (201)
   - Update user (200)
   - Partially update user (200)
   - Delete user (204)

2. **Authentication**
   - Successful login (200)
   - Successful registration (200)

3. **Schema Validation**
   - Validate user list schema
   - Validate single user schema
   - Validate login response schema
   - Validate create user schema

### ❌ Negative Scenarios

1. **User Management**
   - Get non-existent user (404)
   - Get user with invalid ID (404)

2. **Authentication**
   - Login with missing password (400)
   - Login with invalid credentials (400)
   - Registration with missing password (400)
   - Registration with missing email (400)

### 🔄 E2E Flow

- Complete CRUD flow with authentication:
  1. Login → Get token
  2. Create user
  3. Get user
  4. Update user
  5. Delete user

## 🎯 Key Features

### 1. **Service Layer Architecture**
- All API logic is in service classes
- Step definitions are clean and business-focused
- Easy to maintain and extend

### 2. **Authentication Management**
- Automatic login via `@login` tag
- Token stored in Cucumber World
- Token reused across scenarios
- Supports authenticated requests

### 3. **Data-Driven Testing**
- External JSON test data
- Parameterized scenarios
- Multiple data variations
- Easy to add new test data

### 4. **Hooks Implementation**

**BeforeAll**
- Initialize test directories
- Setup logging

**Before**
- Initialize API client
- Clear test data
- Clear logs

**Before @login**
- Perform authentication
- Store token in World

**After**
- Attach logs on failure
- Attach request/response data
- Dispose API client

**AfterAll**
- Cleanup and summary

### 5. **Logging**
- Request logging (method, URL, headers, body)
- Response logging (status, body, time)
- Error logging with stack traces
- Logs attached to reports on failure
- Winston logger with file rotation

### 6. **Schema Validation**
- JSON schema validation using Ajv
- Predefined schemas for all endpoints
- Detailed validation error messages
- Easy to add new schemas

### 7. **Custom Assertions**
- Readable assertion methods
- Automatic logging
- Detailed error messages
- Supports nested object validation

### 8. **Environment Configuration**
- Multiple environment support
- .env file configuration
- Easy to switch environments
- Centralized config management

## 📝 Adding New Tests

### 1. Add Test Data
Edit `src/data/testData.json`:
```json
{
  "users": {
    "newTestCase": {
      "name": "Test User",
      "job": "Tester"
    }
  }
}
```

### 2. Add Schema (if needed)
Edit `src/data/schemas.json`:
```json
{
  "newSchema": {
    "type": "object",
    "required": ["field1", "field2"],
    "properties": {
      "field1": { "type": "string" },
      "field2": { "type": "integer" }
    }
  }
}
```

### 3. Create Feature File
Create `src/features/newFeature.feature`:
```gherkin
@regression
Feature: New Feature
  Scenario: New test case
    Given I have user data from "newTestCase"
    When I send a POST request to "/users" with the user data
    Then the response status code should be 201
```

### 4. Add Step Definitions (if needed)
Create or update step definition files in `src/step-definitions/`

### 5. Add Service Methods (if needed)
Extend service classes in `src/services/`

## 🔧 Utilities

### API Client
- Centralized API request handling
- Automatic logging
- Error handling
- Token management
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)

### Helpers
- `readJsonFile()` - Read JSON files
- `writeJsonFile()` - Write JSON files
- `generateRandomEmail()` - Generate random email
- `generateRandomString()` - Generate random string
- `getCurrentTimestamp()` - Get current timestamp
- `sleep()` - Async sleep
- `deepClone()` - Deep clone objects

### Assertions
- `assertEqual()` - Assert equality
- `assertNotEqual()` - Assert inequality
- `assertTrue()` - Assert true
- `assertFalse()` - Assert false
- `assertContains()` - Assert contains
- `assertStatusCode()` - Assert HTTP status
- `assertResponseBodyContains()` - Assert response field
- `assertArrayLength()` - Assert array length

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| BASE_URL | API base URL | https://reqres.in/api |
| TIMEOUT | Request timeout (ms) | 30000 |
| RETRY_COUNT | Retry count for failed requests | 2 |
| LOG_LEVEL | Logging level | info |
| ENV | Environment name | qa |
| ALLURE_RESULTS_DIR | Allure results directory | allure-results |
| ALLURE_REPORT_DIR | Allure report directory | allure-report |

## 🧹 Cleanup

### Clean test artifacts
```bash
npm run clean
```

### Clean everything (including node_modules)
```bash
npm run clean:all
```

## 📚 Best Practices

1. **Keep step definitions clean** - No API logic in steps
2. **Use service layer** - All API calls go through services
3. **Use meaningful tags** - Tag scenarios appropriately
4. **Data-driven approach** - Use external test data
5. **Schema validation** - Validate all responses
6. **Proper logging** - Log all requests and responses
7. **Error handling** - Handle errors gracefully
8. **Reusable code** - DRY principle
9. **Clear naming** - Use descriptive names
10. **Documentation** - Document complex logic

## 🐛 Troubleshooting

### Tests not running
- Check Node.js version (>= 18.0.0)
- Run `npm install` again
- Check `.env` file configuration

### Allure report not generating
- Install Allure: `npm install -g allure-commandline`
- Or use: `npm run allure:serve`

### Import errors
- Ensure `"type": "module"` is in package.json
- Use `.js` extensions in imports
- Check file paths

## 📄 License

ISC

## 👥 Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Follow BDD conventions
5. Keep services separate from step definitions

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Testing! 🚀**
