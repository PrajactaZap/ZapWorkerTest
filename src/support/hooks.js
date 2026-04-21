import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import logger from '../utils/logger.js';
import fs from 'fs';
import path from 'path';

BeforeAll(async function () {
  logger.info('========================================');
  logger.info('Test Execution Started');
  logger.info('========================================');
  
  const dirs = ['allure-results', 'test-results', 'logs'];
  dirs.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
});

Before(async function (scenario) {
  logger.info('========================================');
  logger.info(`Scenario: ${scenario.pickle.name}`);
  logger.info(`Tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}`);
  logger.info('========================================');
  
  await this.initializeApiClient();
  this.clearTestData();
  this.clearLogs();
});

Before({ tags: '@login' }, async function () {
  logger.info('Executing @login hook - Performing authentication');
  
  const { UserService } = await import('../services/userService.js');
  const userService = new UserService(this.apiClient);
  
  const loginPayload = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };
  
  const loginResponse = await userService.login(loginPayload);
  
  if (loginResponse.status === 200 && loginResponse.body.token) {
    this.setAuthToken(loginResponse.body.token);
    logger.info('Login successful - Token stored in World');
  } else {
    logger.error('Login failed in @login hook');
    throw new Error('Authentication failed in Before hook');
  }
});

After(async function (scenario) {
  const scenarioStatus = scenario.result.status === Status.PASSED ? 'PASSED' : 'FAILED';
  
  logger.info('========================================');
  logger.info(`Scenario Status: ${scenarioStatus}`);
  logger.info('========================================');
  
  if (scenario.result.status === Status.FAILED) {
    logger.error(`Scenario Failed: ${scenario.pickle.name}`);
    logger.error(`Error: ${scenario.result.message}`);
    
    const requestLogs = this.getRequestLogs();
    const responseLogs = this.getResponseLogs();
    
    if (requestLogs.length > 0) {
      const logsAttachment = JSON.stringify({
        requests: requestLogs,
        responses: responseLogs
      }, null, 2);
      
      await this.attach(logsAttachment, 'application/json');
      logger.info('Request/Response logs attached to report');
    }
    
    if (this.response) {
      const responseAttachment = JSON.stringify({
        status: this.response.status,
        statusText: this.response.statusText,
        headers: this.response.headers,
        body: this.response.body
      }, null, 2);
      
      await this.attach(responseAttachment, 'application/json');
    }
  }
  
  await this.disposeApiClient();
});

AfterAll(async function () {
  logger.info('========================================');
  logger.info('Test Execution Completed');
  logger.info('========================================');
});
