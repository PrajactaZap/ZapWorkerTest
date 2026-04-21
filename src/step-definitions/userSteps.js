import { Given, When, Then } from '@cucumber/cucumber';
import { UserService } from '../services/userService.js';
import { Helpers } from '../utils/helpers.js';
import logger from '../utils/logger.js';

When('I send a GET request to {string}', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  this.response = await userService.get(endpoint);
  this.setResponse(this.response);
});

When('I send a GET request to {string} with page {string}', async function (endpoint, page) {
  const userService = new UserService(this.apiClient);
  this.response = await userService.getUsers(parseInt(page));
  this.setResponse(this.response);
});

When('I send a POST request to {string} with the user data', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const userData = this.getTestData('userData');
  this.response = await userService.post(endpoint, { data: userData });
  this.setResponse(this.response);
});

When('I send a PUT request to {string} with the user data', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const userData = this.getTestData('userData');
  this.response = await userService.put(endpoint, { data: userData });
  this.setResponse(this.response);
});

When('I send a PATCH request to {string} with the user data', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  const userData = this.getTestData('userData');
  this.response = await userService.patch(endpoint, { data: userData });
  this.setResponse(this.response);
});

When('I send a DELETE request to {string}', async function (endpoint) {
  const userService = new UserService(this.apiClient);
  this.response = await userService.delete(endpoint);
  this.setResponse(this.response);
});

Given('I have user data from {string}', async function (dataKey) {
  const testData = Helpers.readJsonFile('src/data/testData.json');
  const userData = testData.users[dataKey];
  this.setTestData('userData', userData);
  logger.info(`User data loaded from ${dataKey}`);
});

Given('I have user data with name {string} and job {string}', async function (name, job) {
  const userData = { name, job };
  this.setTestData('userData', userData);
  logger.info(`User data set: name=${name}, job=${job}`);
});

Given('I have update data with name {string} and job {string}', async function (name, job) {
  const userData = { name, job };
  this.setTestData('userData', userData);
  logger.info(`Update data set: name=${name}, job=${job}`);
});

Then('I store the user ID from the response', async function () {
  const userId = this.response.body.id;
  this.setUserId(userId);
  logger.info(`Stored user ID: ${userId}`);
});

When('I send a GET request to the stored user endpoint', async function () {
  const userId = this.getUserId();
  const userService = new UserService(this.apiClient);
  this.response = await userService.getUserById(userId);
  this.setResponse(this.response);
});

When('I send a PUT request to the stored user endpoint with the user data', async function () {
  const userId = this.getUserId();
  const userData = this.getTestData('userData');
  const userService = new UserService(this.apiClient);
  this.response = await userService.updateUser(userId, userData);
  this.setResponse(this.response);
});

When('I send a DELETE request to the stored user endpoint', async function () {
  const userId = this.getUserId();
  const userService = new UserService(this.apiClient);
  this.response = await userService.deleteUser(userId);
  this.setResponse(this.response);
});
