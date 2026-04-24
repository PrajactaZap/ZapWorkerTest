@regression @schema
Feature: API Response Schema Validation
  As an API consumer
  I want to validate response schemas
  So that I can ensure API contract compliance

  Background:
    Given the API base URL is configured

  @smoke @positive
  Scenario: Validate user list response schema
    When I send a GET request to "/users" with page "1"
    Then the response status code should be 200
    And the response should match the "userList" schema

  @positive
  Scenario: Validate single user response schema
    When I send a GET request to "/users/2"
    Then the response status code should be 200
    And the response should match the "singleUser" schema

  @positive
  Scenario: Validate login response schema
    Given I have login credentials from "validLogin"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 200
    And the response should match the "loginSuccess" schema

  @positive
  Scenario: Validate create user response schema
    Given I have user data from "createUser"
    When I send a POST request to "/users" with the user data
    Then the response status code should be 201
    And the response should match the "createUser" schema

  @negative
  Scenario: Validate error response schema
    Given I have login credentials from "missingPassword"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should match the "errorResponse" schema

    @negative
  Scenario: Validate error response schema
    Given I have login credentials from "missingPassword"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should match the "errorResponse" schema
