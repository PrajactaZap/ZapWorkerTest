import { setWorldConstructor, World } from '@cucumber/cucumber';
import { ApiClient } from '../utils/apiClient.js';
import logger from '../utils/logger.js';

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.apiClient = new ApiClient();
    this.response = null;
    this.authToken = null;
    this.userId = null;
    this.testData = {};
    this.requestLogs = [];
    this.responseLogs = [];
  }

  async initializeApiClient() {
    await this.apiClient.initialize();
    logger.info('API Client initialized');
  }

  async disposeApiClient() {
    await this.apiClient.dispose();
    logger.info('API Client disposed');
  }

  setAuthToken(token) {
    this.authToken = token;
    this.apiClient.setAuthToken(token);
    logger.info('Auth token set in World');
  }

  getAuthToken() {
    return this.authToken;
  }

  setResponse(response) {
    this.response = response;
    this.responseLogs.push({
      timestamp: new Date().toISOString(),
      status: response.status,
      body: response.body
    });
  }

  getResponse() {
    return this.response;
  }

  setUserId(userId) {
    this.userId = userId;
    logger.info(`User ID set: ${userId}`);
  }

  getUserId() {
    return this.userId;
  }

  setTestData(key, value) {
    this.testData[key] = value;
    logger.info(`Test data set: ${key} = ${JSON.stringify(value)}`);
  }

  getTestData(key) {
    return this.testData[key];
  }

  clearTestData() {
    this.testData = {};
    logger.info('Test data cleared');
  }

  addRequestLog(method, url, headers, body) {
    this.requestLogs.push({
      timestamp: new Date().toISOString(),
      method,
      url,
      headers,
      body
    });
  }

  getRequestLogs() {
    return this.requestLogs;
  }

  getResponseLogs() {
    return this.responseLogs;
  }

  clearLogs() {
    this.requestLogs = [];
    this.responseLogs = [];
    logger.info('Request and response logs cleared');
  }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
