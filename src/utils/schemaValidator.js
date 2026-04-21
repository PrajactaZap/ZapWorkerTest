import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import logger from './logger.js';

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

export class SchemaValidator {
  static validate(data, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      const errors = validate.errors;
      logger.error('Schema Validation Failed', {
        errors: JSON.stringify(errors, null, 2)
      });
      throw new Error(`Schema validation failed: ${JSON.stringify(errors, null, 2)}`);
    }

    logger.info('Schema Validation Passed');
    return true;
  }

  static validatePartial(data, schema) {
    try {
      this.validate(data, schema);
      return true;
    } catch (error) {
      logger.warn('Partial Schema Validation Failed', { error: error.message });
      return false;
    }
  }
}

export default SchemaValidator;
