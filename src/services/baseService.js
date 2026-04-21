import logger from '../utils/logger.js';

export class BaseService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async get(endpoint, options = {}) {
    logger.info(`BaseService: GET ${endpoint}`);
    return await this.apiClient.get(endpoint, options);
  }

  async post(endpoint, options = {}) {
    logger.info(`BaseService: POST ${endpoint}`);
    return await this.apiClient.post(endpoint, options);
  }

  async put(endpoint, options = {}) {
    logger.info(`BaseService: PUT ${endpoint}`);
    return await this.apiClient.put(endpoint, options);
  }

  async patch(endpoint, options = {}) {
    logger.info(`BaseService: PATCH ${endpoint}`);
    return await this.apiClient.patch(endpoint, options);
  }

  async delete(endpoint, options = {}) {
    logger.info(`BaseService: DELETE ${endpoint}`);
    return await this.apiClient.delete(endpoint, options);
  }

  handleResponse(response, expectedStatus = 200) {
    if (response.status === expectedStatus) {
      logger.info(`Response status matches expected: ${expectedStatus}`);
    } else {
      logger.warn(`Response status ${response.status} does not match expected ${expectedStatus}`);
    }
    return response;
  }

  handleError(error, context = '') {
    logger.error(`Error in ${context}: ${error.message}`);
    throw error;
  }
}

export default BaseService;
