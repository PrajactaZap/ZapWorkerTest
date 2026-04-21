# Contributing Guide

## Code Structure Guidelines

### 1. Service Layer
- All API logic must be in service classes
- Extend `BaseService` for new services
- Use descriptive method names
- Add logging for all operations

Example:
```javascript
export class NewService extends BaseService {
  async getResource(id) {
    logger.info(`Getting resource: ${id}`);
    return await this.get(`/resource/${id}`);
  }
}
```

### 2. Step Definitions
- Keep step definitions clean and simple
- NO API logic in step definitions
- Use service layer for all API calls
- Use World to store and retrieve data

Example:
```javascript
When('I get resource by ID {string}', async function (id) {
  const service = new NewService(this.apiClient);
  this.response = await service.getResource(id);
  this.setResponse(this.response);
});
```

### 3. Feature Files
- Follow Gherkin syntax
- Use meaningful scenario names
- Add appropriate tags (@smoke, @regression, @positive, @negative)
- Keep scenarios focused and atomic

Example:
```gherkin
@regression @positive
Scenario: Get resource successfully
  Given I have valid credentials
  When I get resource by ID "123"
  Then the response status code should be 200
```

### 4. Test Data
- Store test data in `src/data/testData.json`
- Use descriptive keys
- Organize by feature/functionality
- Keep data realistic

### 5. Schemas
- Define schemas in `src/data/schemas.json`
- Use JSON Schema format
- Include all required fields
- Add format validations where applicable

### 6. Naming Conventions

**Files:**
- Service files: `camelCase.js` (e.g., `userService.js`)
- Step files: `camelCaseSteps.js` (e.g., `userSteps.js`)
- Feature files: `camelCase.feature` (e.g., `userManagement.feature`)

**Functions:**
- Use camelCase
- Use descriptive names
- Prefix boolean functions with `is`, `has`, `should`

**Variables:**
- Use camelCase
- Use descriptive names
- Avoid single-letter variables (except in loops)

### 7. Error Handling
- Always handle errors gracefully
- Log errors with context
- Throw meaningful error messages
- Use try-catch where appropriate

### 8. Logging
- Log all API requests and responses
- Log important operations
- Use appropriate log levels (info, warn, error)
- Include context in log messages

### 9. Assertions
- Use custom assertion helpers
- Add descriptive messages
- Assert one thing per assertion
- Use appropriate assertion methods

### 10. Comments
- Add comments for complex logic only
- Keep comments up-to-date
- Use JSDoc for function documentation
- Avoid obvious comments

## Adding New Features

### 1. Create Service Class
```javascript
// src/services/newService.js
import { BaseService } from './baseService.js';

export class NewService extends BaseService {
  constructor(apiClient) {
    super(apiClient);
    this.endpoints = {
      resource: '/resource'
    };
  }

  async getResource(id) {
    return await this.get(`${this.endpoints.resource}/${id}`);
  }
}
```

### 2. Add Test Data
```json
// src/data/testData.json
{
  "newFeature": {
    "validData": {
      "field1": "value1",
      "field2": "value2"
    }
  }
}
```

### 3. Add Schema
```json
// src/data/schemas.json
{
  "newFeatureResponse": {
    "type": "object",
    "required": ["field1", "field2"],
    "properties": {
      "field1": { "type": "string" },
      "field2": { "type": "integer" }
    }
  }
}
```

### 4. Create Feature File
```gherkin
# src/features/newFeature.feature
@regression
Feature: New Feature
  Scenario: Test new feature
    Given I have test data
    When I perform action
    Then I verify result
```

### 5. Add Step Definitions
```javascript
// src/step-definitions/newSteps.js
import { Given, When, Then } from '@cucumber/cucumber';
import { NewService } from '../services/newService.js';

When('I perform action', async function () {
  const service = new NewService(this.apiClient);
  this.response = await service.getResource('123');
  this.setResponse(this.response);
});
```

## Testing Your Changes

1. Run linter (if configured)
2. Run affected tests
3. Run full regression suite
4. Generate and review Allure report
5. Check logs for errors

## Pull Request Guidelines

1. Create feature branch from main
2. Follow code structure guidelines
3. Add tests for new features
4. Update documentation
5. Ensure all tests pass
6. Generate Allure report
7. Create PR with clear description

## Code Review Checklist

- [ ] Code follows project structure
- [ ] No API logic in step definitions
- [ ] Service layer used correctly
- [ ] Proper error handling
- [ ] Logging added
- [ ] Test data externalized
- [ ] Schemas defined
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No hardcoded values
- [ ] Meaningful variable names
- [ ] Comments added where needed

## Questions?

Create an issue or reach out to the team.
