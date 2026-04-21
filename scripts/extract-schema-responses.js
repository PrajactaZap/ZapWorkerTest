import fs from 'fs';

// Read the combined log file
const logContent = fs.readFileSync('logs/combined.log', 'utf8');

// Split logs by timestamp to identify individual test runs
const logLines = logContent.split('\n');

// Find schema validation test responses (from the most recent run)
const schemaValidationResponses = {
  feature: "API Response Schema Validation",
  executionTime: new Date().toISOString(),
  scenarios: []
};

let currentScenario = null;
let captureResponse = false;
let responseBuffer = '';

for (let i = 0; i < logLines.length; i++) {
  const line = logLines[i];
  
  // Detect scenario start
  if (line.includes('Scenario:') && line.includes('Validate')) {
    const scenarioMatch = line.match(/Scenario: (.+)/);
    if (scenarioMatch) {
      currentScenario = {
        name: scenarioMatch[1].trim(),
        request: null,
        response: null,
        schema: null,
        status: null
      };
    }
  }
  
  // Capture API Request
  if (line.includes('API Request {') && currentScenario) {
    let requestBuffer = '';
    let braceCount = 0;
    for (let j = i; j < logLines.length; j++) {
      const reqLine = logLines[j];
      if (reqLine.includes('{')) braceCount++;
      if (reqLine.includes('}')) braceCount--;
      
      const jsonPart = reqLine.substring(reqLine.indexOf('{') !== -1 ? reqLine.indexOf('{') : reqLine.indexOf('"'));
      requestBuffer += jsonPart;
      
      if (braceCount === 0 && reqLine.includes('}')) {
        try {
          currentScenario.request = JSON.parse(requestBuffer);
        } catch (e) {
          // Skip if parse fails
        }
        break;
      }
    }
  }
  
  // Capture API Response
  if ((line.includes('API Response {') || line.includes('API Response Error {')) && currentScenario) {
    captureResponse = true;
    responseBuffer = '';
    let braceCount = 0;
    
    for (let j = i; j < logLines.length; j++) {
      const respLine = logLines[j];
      if (respLine.includes('{')) braceCount++;
      if (respLine.includes('}')) braceCount--;
      
      const jsonPart = respLine.substring(respLine.indexOf('{') !== -1 ? respLine.indexOf('{') : respLine.indexOf('"'));
      responseBuffer += jsonPart;
      
      if (braceCount === 0 && respLine.includes('}')) {
        try {
          const responseData = JSON.parse(responseBuffer);
          currentScenario.response = {
            status: responseData.status,
            statusText: responseData.statusText,
            responseTime: responseData.responseTime,
            body: typeof responseData.body === 'string' ? JSON.parse(responseData.body) : responseData.body
          };
        } catch (e) {
          // Skip if parse fails
        }
        captureResponse = false;
        break;
      }
    }
  }
  
  // Capture schema validation
  if (line.includes('Validating response against schema:') && currentScenario) {
    const schemaMatch = line.match(/schema: (.+)/);
    if (schemaMatch) {
      currentScenario.schema = schemaMatch[1].trim();
    }
  }
  
  // Capture scenario status
  if (line.includes('Scenario Status:') && currentScenario) {
    const statusMatch = line.match(/Status: (.+)/);
    if (statusMatch) {
      currentScenario.status = statusMatch[1].trim();
      schemaValidationResponses.scenarios.push(currentScenario);
      currentScenario = null;
    }
  }
}

// Filter to only keep the last 5 scenarios (most recent schemaValidation run)
const recentScenarios = schemaValidationResponses.scenarios.slice(-5);
schemaValidationResponses.scenarios = recentScenarios;

// Save to JSON file
const outputPath = 'test-results/schemaValidation-responses.json';
fs.writeFileSync(outputPath, JSON.stringify(schemaValidationResponses, null, 2));

console.log('✅ Schema Validation response bodies extracted successfully!');
console.log(`📁 Output file: ${outputPath}`);
console.log(`📊 Total scenarios: ${schemaValidationResponses.scenarios.length}`);
console.log('\n📝 Scenarios extracted:');
schemaValidationResponses.scenarios.forEach((scenario, index) => {
  console.log(`  ${index + 1}. ${scenario.name}`);
  console.log(`     Schema: ${scenario.schema}`);
  console.log(`     Status: ${scenario.status} (${scenario.response?.status})`);
});
