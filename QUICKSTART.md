# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

## Step 2: Verify Setup (1 min)

```bash
npx cucumber-js --dry-run
```

You should see all scenarios listed without errors.

## Step 3: Run Your First Test (1 min)

```bash
npm run test:smoke
```

This runs all smoke tests tagged with `@smoke`.

## Step 4: View Report (1 min)

```bash
npm run report
```

This generates and opens the Allure HTML report in your browser.

## 🎉 Success!

You've successfully:
- ✅ Installed the framework
- ✅ Verified the setup
- ✅ Run smoke tests
- ✅ Generated a report

## What's Next?

### Explore Test Scenarios

1. **Authentication Tests**
   ```bash
   npx cucumber-js src/features/authentication.feature
   ```

2. **User Management Tests**
   ```bash
   npx cucumber-js src/features/userManagement.feature
   ```

3. **Complete CRUD Flow**
   ```bash
   npx cucumber-js src/features/crudFlow.feature
   ```

4. **Schema Validation**
   ```bash
   npx cucumber-js src/features/schemaValidation.feature
   ```

5. **Data-Driven Tests**
   ```bash
   npx cucumber-js src/features/datadriven.feature
   ```

### Run Different Test Types

```bash
# Positive tests only
npm run test:tags "@positive"

# Negative tests only
npm run test:tags "@negative"

# Regression suite
npm run test:regression
```

### Understand the Framework

1. **Read the Architecture**
   - Open `ARCHITECTURE.md` to understand the framework structure

2. **Check Test Data**
   - Review `src/data/testData.json` for test data
   - Review `src/data/schemas.json` for validation schemas

3. **Explore Services**
   - Check `src/services/userService.js` for API operations
   - All API logic is in service classes

4. **Review Step Definitions**
   - Look at `src/step-definitions/` for step implementations
   - Notice how they use services, not direct API calls

### Add Your Own Test

1. **Add test data** in `src/data/testData.json`:
   ```json
   {
     "users": {
       "myTestUser": {
         "name": "My Test User",
         "job": "QA Engineer"
       }
     }
   }
   ```

2. **Create a scenario** in any feature file:
   ```gherkin
   @smoke @positive
   Scenario: Create my test user
     Given I have user data from "myTestUser"
     When I send a POST request to "/users" with the user data
     Then the response status code should be 201
     And the response "name" should be "My Test User"
   ```

3. **Run your test**:
   ```bash
   npm test
   ```

4. **View the report**:
   ```bash
   npm run report
   ```

## Common Tasks

### Run Tests
```bash
npm test                    # All tests
npm run test:smoke          # Smoke tests
npm run test:regression     # Regression tests
```

### Generate Reports
```bash
npm run report              # Generate and open
npm run allure:serve        # Serve with auto-refresh
```

### Clean Up
```bash
npm run clean               # Clean test artifacts
```

### Debug
```bash
# Check logs
cat logs/combined.log       # Linux/macOS
type logs\combined.log      # Windows

# Run single scenario
npx cucumber-js --name "Successful login"
```

## Tips for Success

1. **Start with smoke tests** - They're fast and cover critical paths
2. **Check logs** - All requests/responses are logged in `logs/`
3. **Use tags** - Organize and run specific test subsets
4. **Review reports** - Allure reports show detailed test execution
5. **Read documentation** - Check `README.md` for comprehensive guide

## Need Help?

- **Setup issues?** → Check `SETUP.md`
- **Commands?** → Check `COMMANDS.md`
- **Architecture?** → Check `ARCHITECTURE.md`
- **Contributing?** → Check `CONTRIBUTING.md`

## Example Workflow

```bash
# 1. Clean previous results
npm run clean

# 2. Run smoke tests
npm run test:smoke

# 3. If smoke passes, run regression
npm run test:regression

# 4. Generate report
npm run report

# 5. Review logs if needed
cat logs/combined.log
```

## Troubleshooting

### Tests not running?
```bash
# Reinstall dependencies
npm run clean:all
npm install
```

### Import errors?
- Ensure Node.js >= 18.0.0
- Check that all imports have `.js` extensions

### Allure not working?
```bash
# Use serve instead
npm run allure:serve
```

---

**You're all set! Happy Testing! 🚀**
