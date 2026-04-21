import { Then } from '@cucumber/cucumber';
import { SchemaValidator } from '../utils/schemaValidator.js';
import { Helpers } from '../utils/helpers.js';
import logger from '../utils/logger.js';

Then('the response should match the {string} schema', async function (schemaName) {
  const schemas = Helpers.readJsonFile('src/data/schemas.json');
  const schema = schemas[schemaName];
  
  if (!schema) {
    throw new Error(`Schema '${schemaName}' not found in schemas.json`);
  }
  
  logger.info(`Validating response against schema: ${schemaName}`);
  SchemaValidator.validate(this.response.body, schema);
});
