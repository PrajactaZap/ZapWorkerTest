import { expect } from '@playwright/test';
import logger from './logger.js';

export class AssertionHelper {
  static assertEqual(actual, expected, message = '') {
    try {
      expect(actual).toBe(expected);
      logger.info(`Assertion Passed: ${message || `${actual} equals ${expected}`}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || `Expected ${expected}, but got ${actual}`}`);
      throw error;
    }
  }

  static assertNotEqual(actual, expected, message = '') {
    try {
      expect(actual).not.toBe(expected);
      logger.info(`Assertion Passed: ${message || `${actual} not equals ${expected}`}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || `Expected not ${expected}, but got ${actual}`}`);
      throw error;
    }
  }

  static assertTrue(condition, message = '') {
    try {
      expect(condition).toBeTruthy();
      logger.info(`Assertion Passed: ${message || 'Condition is true'}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || 'Expected true, but got false'}`);
      throw error;
    }
  }

  static assertFalse(condition, message = '') {
    try {
      expect(condition).toBeFalsy();
      logger.info(`Assertion Passed: ${message || 'Condition is false'}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || 'Expected false, but got true'}`);
      throw error;
    }
  }

  static assertContains(actual, expected, message = '') {
    try {
      expect(actual).toContain(expected);
      logger.info(`Assertion Passed: ${message || `${actual} contains ${expected}`}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || `Expected to contain ${expected}, but got ${actual}`}`);
      throw error;
    }
  }

  static assertStatusCode(actual, expected, message = '') {
    try {
      expect(actual).toBe(expected);
      logger.info(`Status Code Assertion Passed: Expected ${expected}, Got ${actual}`);
    } catch (error) {
      logger.error(`Status Code Assertion Failed: Expected ${expected}, Got ${actual}`);
      throw error;
    }
  }

  static assertResponseBodyContains(body, key, message = '') {
    try {
      expect(body).toHaveProperty(key);
      logger.info(`Response Body Assertion Passed: ${message || `Body contains key '${key}'`}`);
    } catch (error) {
      logger.error(`Response Body Assertion Failed: ${message || `Body does not contain key '${key}'`}`);
      throw error;
    }
  }

  static assertResponseBodyValue(body, key, expectedValue, message = '') {
    try {
      expect(body[key]).toBe(expectedValue);
      logger.info(`Response Body Value Assertion Passed: ${key} = ${expectedValue}`);
    } catch (error) {
      logger.error(`Response Body Value Assertion Failed: Expected ${key} = ${expectedValue}, Got ${body[key]}`);
      throw error;
    }
  }

  static assertGreaterThan(actual, expected, message = '') {
    try {
      expect(actual).toBeGreaterThan(expected);
      logger.info(`Assertion Passed: ${message || `${actual} > ${expected}`}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || `Expected ${actual} > ${expected}`}`);
      throw error;
    }
  }

  static assertLessThan(actual, expected, message = '') {
    try {
      expect(actual).toBeLessThan(expected);
      logger.info(`Assertion Passed: ${message || `${actual} < ${expected}`}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || `Expected ${actual} < ${expected}`}`);
      throw error;
    }
  }

  static assertNotNull(actual, message = '') {
    try {
      expect(actual).not.toBeNull();
      logger.info(`Assertion Passed: ${message || 'Value is not null'}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || 'Expected not null, but got null'}`);
      throw error;
    }
  }

  static assertNull(actual, message = '') {
    try {
      expect(actual).toBeNull();
      logger.info(`Assertion Passed: ${message || 'Value is null'}`);
    } catch (error) {
      logger.error(`Assertion Failed: ${message || 'Expected null, but got a value'}`);
      throw error;
    }
  }

  static assertArrayLength(array, expectedLength, message = '') {
    try {
      expect(array).toHaveLength(expectedLength);
      logger.info(`Array Length Assertion Passed: Length = ${expectedLength}`);
    } catch (error) {
      logger.error(`Array Length Assertion Failed: Expected length ${expectedLength}, Got ${array.length}`);
      throw error;
    }
  }
}

export default AssertionHelper;
