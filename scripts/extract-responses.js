import fs from 'fs';
import path from 'path';

// Read the Cucumber JSON report
const cucumberReportPath = 'test-results/cucumber-report.json';
const cucumberReport = JSON.parse(fs.readFileSync(cucumberReportPath, 'utf8'));

// Find the schemaValidation feature
const schemaValidationFeature = cucumberReport.find(feature => 
  feature.name === 'API Response Schema Validation' || 
  feature.uri.includes('schemaValidation.feature')
);

if (!schemaValidationFeature) {
  console.error('❌ Schema Validation feature not found in the report');
  process.exit(1);
}

// Extract response bodies from each scenario
const responseBodies = {
  feature: schemaValidationFeature.name,
  description: schemaValidationFeature.description,
  scenarios: []
};

schemaValidationFeature.elements.forEach((scenario) => {
  const scenarioData = {
    name: scenario.name,
    tags: scenario.tags ? scenario.tags.map(t => t.name) : [],
    steps: [],
    responses: []
  };

  // Look for embedded data in steps (from hooks/attachments)
  scenario.steps.forEach((step) => {
    if (step.embeddings && step.embeddings.length > 0) {
      step.embeddings.forEach((embedding) => {
        if (embedding.mime_type === 'application/json') {
          try {
            const data = JSON.parse(Buffer.from(embedding.data, 'base64').toString('utf8'));
            if (data.body) {
              scenarioData.responses.push({
                step: step.name,
                status: data.status,
                statusText: data.statusText,
                body: typeof data.body === 'string' ? JSON.parse(data.body) : data.body,
                responseTime: data.responseTime
              });
            }
          } catch (e) {
            // Skip if not parseable
          }
        }
      });
    }
  });

  responseBodies.scenarios.push(scenarioData);
});

// Save to JSON file
const outputPath = 'test-results/schemaValidation-responses.json';
fs.writeFileSync(outputPath, JSON.stringify(responseBodies, null, 2));

console.log('✅ Response bodies extracted successfully!');
console.log(`📁 Output file: ${outputPath}`);
console.log(`📊 Total scenarios: ${responseBodies.scenarios.length}`);
console.log(`📝 Total responses captured: ${responseBodies.scenarios.reduce((sum, s) => sum + s.responses.length, 0)}`);
