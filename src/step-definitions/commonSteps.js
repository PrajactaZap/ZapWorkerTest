import { Given, When, Then } from '@cucumber/cucumber';
import { AssertionHelper } from '../utils/assertions.js';
import logger from '../utils/logger.js';

Given('the API base URL is configured', async function () {
  logger.info('API base URL is configured');
});

Then('the response status code should be {int}', async function (expectedStatus) {
  const actualStatus = this.response.status;
  AssertionHelper.assertStatusCode(actualStatus, expectedStatus);
});

Then('the response should contain {string} field', async function (fieldName) {
  AssertionHelper.assertResponseBodyContains(this.response.body, fieldName);
});

Then('the response {string} should be {int}', async function (fieldPath, expectedValue) {
  const value = this._getNestedValue(this.response.body, fieldPath);
  AssertionHelper.assertEqual(value, expectedValue);
});

Then('the response {string} should be {string}', async function (fieldPath, expectedValue) {
  const value = this._getNestedValue(this.response.body, fieldPath);
  AssertionHelper.assertEqual(value, expectedValue);
});

Then('the response {string} should not be empty', async function (fieldPath) {
  const value = this._getNestedValue(this.response.body, fieldPath);
  AssertionHelper.assertNotNull(value);
  AssertionHelper.assertTrue(value !== '', `${fieldPath} should not be empty`);
});

Then('the response {string} should be an array', async function (fieldPath) {
  const value = this._getNestedValue(this.response.body, fieldPath);
  AssertionHelper.assertTrue(Array.isArray(value), `${fieldPath} should be an array`);
});

Then('the {string} should not be empty', async function (fieldName) {
  const value = this.response.body[fieldName];
  AssertionHelper.assertNotNull(value);
  AssertionHelper.assertTrue(value !== '', `${fieldName} should not be empty`);
});

Then('the response should contain {string} field with value {int}', async function (fieldName, expectedValue) {
  AssertionHelper.assertResponseBodyContains(this.response.body, fieldName);
  const actualValue = this.response.body[fieldName];
  AssertionHelper.assertEqual(actualValue, expectedValue);
});

Then('the response should contain {string} field with value {string}', async function (fieldName, expectedValue) {
  AssertionHelper.assertResponseBodyContains(this.response.body, fieldName);
  const actualValue = this.response.body[fieldName];
  AssertionHelper.assertEqual(actualValue, expectedValue);
});
