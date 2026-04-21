# Framework Architecture

## Overview

This framework follows a **Modular Clean Pattern (MCP)** with clear separation of concerns, making it scalable, maintainable, and enterprise-ready.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Feature Files                         │
│              (Business Requirements - BDD)               │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  Step Definitions                        │
│              (Glue Code - No Business Logic)             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   Service Layer                          │
│           (Business Logic & API Operations)              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    API Client                            │
│         (HTTP Operations & Request Handling)             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                 Playwright APIRequestContext             │
│                    (HTTP Client)                         │
└─────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Feature Files (BDD Layer)
**Location:** `src/features/`

**Purpose:** Define business requirements in Gherkin syntax

**Responsibilities:**
- Describe WHAT to test, not HOW
- Written in business language
- Readable by non-technical stakeholders
- Tagged for organization (@smoke, @regression, etc.)

**Example:**
```gherkin
Scenario: Create a new user
  Given I have user data from "createUser"
  When I send a POST request to "/users" with the user data
  Then the response status code should be 201
```

### 2. Step Definitions (Glue Layer)
**Location:** `src/step-definitions/`

**Purpose:** Connect Gherkin steps to code

**Responsibilities:**
- Map Gherkin steps to JavaScript functions
- Extract parameters from steps
- Call service layer methods
- Store/retrieve data from World
- **NO API LOGIC** - only orchestration

**Example:**
```javascript
When('I send a POST request to {string} with the user data', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const userData = this.getTestData('userData');
  this.response = await userService.post(endpoint, { data: userData });
  this.setResponse(this.response);
});
```

### 3. Service Layer (Business Logic Layer)
**Location:** `src/services/`

**Purpose:** Encapsulate all API business logic

**Responsibilities:**
- Define API operations
- Handle request/response logic
- Provide reusable methods
- Abstract API complexity
- Domain-specific operations

**Example:**
```javascript
export class UserService extends BaseService {
  async createUser(userData) {
    logger.info('UserService: Creating new user');
    return await this.post(this.endpoints.users, { data: userData });
  }
}
```

### 4. API Client (HTTP Layer)
**Location:** `src/utils/apiClient.js`

**Purpose:** Centralized HTTP request handling

**Responsibilities:**
- Initialize Playwright APIRequestContext
- Handle all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Manage headers and authentication
- Log requests and responses
- Error handling
- Response parsing

**Example:**
```javascript
async post(endpoint, options = {}) {
  return await this._request('POST', endpoint, options);
}
```

### 5. Support Layer
**Location:** `src/support/`

**Components:**

#### World (`world.js`)
- Cucumber World implementation
- Stores shared state across steps
- Manages API client instance
- Stores authentication token
- Stores test data and responses

#### Hooks (`hooks.js`)
- BeforeAll: Setup test environment
- Before: Initialize API client
- Before @login: Perform authentication
- After: Cleanup and attach logs
- AfterAll: Final cleanup

### 6. Utilities Layer
**Location:** `src/utils/`

**Components:**

#### Logger (`logger.js`)
- Winston-based logging
- Request/response logging
- Error logging
- File and console output

#### Assertions (`assertions.js`)
- Custom assertion helpers
- Readable assertion methods
- Automatic logging
- Detailed error messages

#### Helpers (`helpers.js`)
- Utility functions
- JSON file operations
- Random data generation
- Date formatting

#### Schema Validator (`schemaValidator.js`)
- JSON schema validation
- Ajv-based validation
- Detailed error reporting

### 7. Configuration Layer
**Location:** `src/config/`

**Purpose:** Centralized configuration management

**Responsibilities:**
- Environment variables
- Base URL configuration
- Timeout settings
- Retry configuration

### 8. Data Layer
**Location:** `src/data/`

**Components:**

#### Test Data (`testData.json`)
- External test data
- Data-driven testing
- Multiple data variations

#### Schemas (`schemas.json`)
- JSON schemas for validation
- API contract validation
- Response structure validation

## Design Patterns

### 1. Page Object Model (Adapted for APIs)
Instead of page objects, we use **Service Objects** that encapsulate API operations.

### 2. Singleton Pattern
- API Client is initialized once per scenario
- Configuration is loaded once

### 3. Factory Pattern
- Services are created on-demand
- Flexible service instantiation

### 4. Dependency Injection
- API Client injected into services
- Services injected into step definitions via World

### 5. Builder Pattern
- Request building in API Client
- Flexible request configuration

## Data Flow

### Request Flow
```
Feature Step
    ↓
Step Definition (extracts parameters)
    ↓
Service Method (business logic)
    ↓
API Client (HTTP handling)
    ↓
Playwright APIRequestContext
    ↓
API Server
```

### Response Flow
```
API Server
    ↓
Playwright APIRequestContext
    ↓
API Client (parsing & logging)
    ↓
Service Method (returns response)
    ↓
Step Definition (stores in World)
    ↓
Assertion Steps (validate response)
```

## Authentication Flow

```
@login tag detected
    ↓
Before @login hook triggered
    ↓
UserService.login() called
    ↓
Token extracted from response
    ↓
Token stored in World
    ↓
Token injected in subsequent requests
    ↓
Scenario executes with authentication
```

## Error Handling Strategy

### 1. API Client Level
- Catch network errors
- Log errors with context
- Return error response object

### 2. Service Level
- Handle business logic errors
- Log service-specific errors
- Propagate errors to step definitions

### 3. Step Definition Level
- Catch step execution errors
- Store error context in World

### 4. Hook Level
- Attach logs on failure
- Attach request/response data
- Cleanup resources

## Logging Strategy

### Request Logging
```
[INFO] API Request
  Method: POST
  URL: https://reqres.in/api/users
  Headers: {...}
  Body: {...}
```

### Response Logging
```
[INFO] API Response
  Status: 201
  Body: {...}
  Response Time: 234ms
```

### Error Logging
```
[ERROR] API Response Error
  Status: 400
  Body: { error: "..." }
```

## Reporting Strategy

### 1. Cucumber Reports
- HTML report
- JSON report
- Progress bar

### 2. Allure Reports
- Rich HTML reports
- Test history
- Trends and statistics
- Attachments (logs, requests, responses)

### 3. Logs
- File-based logs
- Separate error logs
- Combined logs

## Scalability Considerations

### 1. Modular Structure
- Easy to add new services
- Easy to add new features
- Easy to add new utilities

### 2. Separation of Concerns
- Clear layer boundaries
- Single responsibility principle
- Easy to maintain

### 3. Reusability
- Reusable service methods
- Reusable step definitions
- Reusable utilities

### 4. Parallel Execution
- Supports parallel test execution
- Independent test scenarios
- Isolated test data

### 5. Environment Management
- Multiple environment support
- Easy environment switching
- Centralized configuration

## Best Practices Enforced

1. **No API logic in step definitions**
2. **All API calls through service layer**
3. **External test data**
4. **Schema validation for all responses**
5. **Comprehensive logging**
6. **Proper error handling**
7. **Clean code principles**
8. **BDD conventions**
9. **Meaningful naming**
10. **Documentation**

## Extension Points

### Adding New API Endpoints
1. Add endpoint to service class
2. Create service method
3. Add step definition (if needed)
4. Add feature scenario

### Adding New Assertions
1. Add method to `assertions.js`
2. Use in step definitions

### Adding New Utilities
1. Add function to `helpers.js`
2. Import where needed

### Adding New Schemas
1. Add schema to `schemas.json`
2. Use in schema validation steps

This architecture ensures the framework is **production-ready**, **scalable**, **maintainable**, and follows **enterprise best practices**.
