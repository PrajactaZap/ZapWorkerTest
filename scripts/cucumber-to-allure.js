import fs from 'fs';
import path from 'path';
import { AllureRuntime, InMemoryAllureWriter } from 'allure-js-commons';

const cucumberJsonPath = 'test-results/cucumber-report.json';
const allureResultsDir = 'allure-results';

// Ensure allure-results directory exists
if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir, { recursive: true });
}

// Read Cucumber JSON report
const cucumberReport = JSON.parse(fs.readFileSync(cucumberJsonPath, 'utf8'));

// Create Allure writer
const writer = new InMemoryAllureWriter();
const runtime = new AllureRuntime({ resultsDir: allureResultsDir, writer });

// Convert each feature
cucumberReport.forEach((feature) => {
  feature.elements.forEach((scenario) => {
    const test = runtime.startTest(scenario.name);
    
    // Add tags as labels
    if (scenario.tags) {
      scenario.tags.forEach(tag => {
        test.addLabel('tag', tag.name.replace('@', ''));
      });
    }
    
    // Add feature name
    test.addLabel('feature', feature.name);
    test.addLabel('suite', feature.name);
    
    // Process steps
    let passed = true;
    scenario.steps.forEach((step) => {
      const stepName = `${step.keyword}${step.name}`;
      const stepResult = runtime.startStep(stepName);
      
      if (step.result.status === 'passed') {
        stepResult.status = 'passed';
      } else if (step.result.status === 'failed') {
        stepResult.status = 'failed';
        passed = false;
        if (step.result.error_message) {
          stepResult.statusDetails = {
            message: step.result.error_message,
            trace: step.result.error_message
          };
        }
      } else if (step.result.status === 'skipped') {
        stepResult.status = 'skipped';
      }
      
      if (step.result.duration) {
        stepResult.stage = 'finished';
      }
      
      runtime.stopStep();
    });
    
    // Set test status
    test.status = passed ? 'passed' : 'failed';
    test.stage = 'finished';
    
    // Set duration
    const totalDuration = scenario.steps.reduce((sum, step) => {
      return sum + (step.result.duration || 0);
    }, 0);
    test.stop(totalDuration / 1000000); // Convert nanoseconds to milliseconds
    
    runtime.writeTest(test);
  });
});

// Write results to files
const results = writer.getResults();
results.forEach((result, index) => {
  const filename = `${result.uuid}-result.json`;
  fs.writeFileSync(
    path.join(allureResultsDir, filename),
    JSON.stringify(result, null, 2)
  );
});

// Write containers
const containers = writer.getGroups();
containers.forEach((container, index) => {
  const filename = `${container.uuid}-container.json`;
  fs.writeFileSync(
    path.join(allureResultsDir, filename),
    JSON.stringify(container, null, 2)
  );
});

console.log('✅ Cucumber JSON converted to Allure format successfully!');
console.log(`📁 Results written to: ${allureResultsDir}`);
console.log(`📊 Total scenarios: ${cucumberReport.reduce((sum, f) => sum + f.elements.length, 0)}`);
