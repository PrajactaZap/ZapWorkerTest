import { Given, When } from '@cucumber/cucumber';
import { UserService } from '../services/userService.js';
import { Helpers } from '../utils/helpers.js';
import logger from '../utils/logger.js';

Given('I have login credentials from {string}', async function (dataKey) {
  const testData = Helpers.readJsonFile('src/data/testData.json');
  const credentials = testData.authentication[dataKey];
  this.setTestData('credentials', credentials);
  logger.info(`Login credentials loaded from ${dataKey}`);
});

Given('I have registration data from {string}', async function (dataKey) {
  const testData = Helpers.readJsonFile('src/data/testData.json');
  const registrationData = testData.authentication[dataKey];
  this.setTestData('registrationData', registrationData);
  logger.info(`Registration data loaded from ${dataKey}`);
});

Given('I have login data with email {string} and password {string}', async function (email, password) {
  const credentials = {};
  if (email) credentials.email = email;
  if (password) credentials.password = password;
  this.setTestData('credentials', credentials);
  logger.info(`Login data set: email=${email}`);
});

When('I send a POST request to {string} with the credentials', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const credentials = this.getTestData('credentials');
  this.response = await userService.post(endpoint, { data: credentials });
  this.setResponse(this.response);
});

When('I send a POST request to {string} with the registration data', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const registrationData = this.getTestData('registrationData');
  this.response = await userService.post(endpoint, { data: registrationData });
  this.setResponse(this.response);
});

Given('I am logged in with valid credentials', async function () {
  const userService = new UserService(this.apiClient);
  const loginPayload = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };
  
  const loginResponse = await userService.login(loginPayload);
  
  if (loginResponse.status === 200 && loginResponse.body.token) {
    this.setAuthToken(loginResponse.body.token);
    logger.info('User logged in successfully');
  } else {
    throw new Error('Login failed');
  }
});
