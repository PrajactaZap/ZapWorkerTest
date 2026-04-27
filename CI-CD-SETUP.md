# CI/CD Pipeline Setup Guide

## Quick Start - 5 Minutes Setup

Follow these steps to enable CI/CD for your API automation framework.

---

## Step 1: Add GitHub Secrets (2 minutes)

### Navigate to Repository Settings
1. Go to your GitHub repository: https://github.com/PrajactaZap/ZapWorkerTest
2. Click Settings (top menu)
3. Click Secrets and variables then Actions (left sidebar)
4. Click New repository secret

### Add Required Secret

Secret 1: REQRES_API_KEY
Name: REQRES_API_KEY
Value: pro_c0642a7a2a7adabfac5cc179919e2ed06ab288767205e21f2862ec858ec381e0

Click Add secret

### Optional Secret

Secret 2: BASE_URL (Optional - defaults to https://reqres.in/api)
Name: BASE_URL
Value: https://reqres.in/api

---

## Step 2: Enable Workflow Permissions (1 minute)

1. Go to Settings then Actions then General
2. Scroll down to Workflow permissions
3. Select Read and write permissions
4. Check Allow GitHub Actions to create and approve pull requests
5. Click Save

---

## Step 3: Enable GitHub Pages (2 minutes)

1. Go to Settings then Pages
2. Under Source:
   - Branch: Select gh-pages (will be created automatically after first run)
   - Folder: / (root)
3. Click Save

Note: The gh-pages branch will be created automatically after the first successful workflow run on the main branch.

---

## Step 4: Push CI/CD Configuration

The CI/CD workflow file is already created at:
.github/workflows/ci-cd.yml

Commit and push it to your repository:

git add .github
git commit -m "Add CI/CD pipeline with GitHub Actions"
git push origin feature/update-user-id-scenario

---

## Step 5: Verify Pipeline is Running

1. Go to Actions tab in your GitHub repository
2. You should see the workflow running
3. Click on the workflow run to see details
4. Wait for it to complete (usually 2-5 minutes)

---

## What Happens Next?

### On Every Pull Request:
- Tests run automatically
- Allure report is generated
- Test results are posted as a comment on the PR
- Artifacts are uploaded (reports, logs)

### On Push to Main/Develop:
- All of the above, plus:
- Allure report is published to GitHub Pages (main branch only)

---

## Viewing Test Reports

### Option 1: GitHub Actions Artifacts
1. Go to Actions tab
2. Click on a workflow run
3. Scroll down to Artifacts section
4. Download allure-report-node-20.x
5. Extract and open index.html

### Option 2: GitHub Pages (After first main branch run)
Visit: https://prajactazap.github.io/ZapWorkerTest/allure-report/

### Option 3: PR Comments
Check the PR comments for a summary of test results

---

## Testing the Pipeline

### Create a Test PR:
1. Make a small change to any feature file
2. Commit and push to your feature branch
3. Create a Pull Request
4. Watch the pipeline run automatically
5. Check the PR comment for test results

---

## Troubleshooting

### Pipeline Not Running?
- Check that the workflow file exists in .github/workflows/
- Verify workflow permissions are set correctly
- Check that Actions are enabled in repository settings

### Tests Failing?
- Check that REQRES_API_KEY secret is set correctly
- Review the workflow logs in Actions tab
- Verify tests pass locally first

### GitHub Pages Not Working?
- Wait for first successful run on main branch
- Check that gh-pages branch was created
- Verify Pages is enabled in Settings

---

## Next Steps

1. Add CI/CD status badge to README
2. Configure branch protection rules
3. Set up notifications for failed builds
4. Customize workflow for your needs

---

## Support

For detailed documentation, see:
- .github/workflows/README.md
- GitHub Actions docs: https://docs.github.com/en/actions
