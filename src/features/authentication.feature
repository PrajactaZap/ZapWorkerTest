@regression @authentication
Feature: User Authentication
  As an API consumer
  I want to authenticate users
  So that I can access protected resources

  Background:
    Given the API base URL is configured

  @smoke @positive
  Scenario: Successful login with valid credentials
    Given I have login credentials from "validLogin"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 200
    And the response should contain "token" field
    And the "token" should not be empty

  @positive
  Scenario: Successful user registration
    Given I have registration data from "validRegistration"
    When I send a POST request to "/register" with the registration data
    Then the response status code should be 200
    And the response should contain "id" field
    And the response should contain "token" field

  @negative
  Scenario: Login fails with missing password
    Given I have login credentials from "missingPassword"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field
    And the response "error" should be "Missing password"

  @negative
  Scenario: Login fails with invalid credentials
    Given I have login credentials from "invalidLogin"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field

  @negative
  Scenario: Registration fails with missing password
    Given I have registration data from "missingPasswordRegistration"
    When I send a POST request to "/register" with the registration data
    Then the response status code should be 400
    And the response should contain "error" field
    And the response "error" should be "Missing password"

  @negative
  Scenario: Registration fails with missing email
    Given I have registration data from "missingEmail"
    When I send a POST request to "/register" with the registration data
    Then the response status code should be 400
    And the response should contain "error" field

  @random
  Scenario: Login with only given credentials
    Given I have login credentials from "onlyEmail"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field 

  @testrandom
  Scenario: Login with only given password
    Given I have login credentials from "onlyPassword"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field 

  @invalidemailformat
  Scenario: Login with invalid email format
    Given I have login credentials from "invalidEmail"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field 

  @invalidPasswordFormat
  Scenario: Login with invalid password format
    Given I have login credentials from "invalidPassword"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be 400
    And the response should contain "error" field 

  @resetPassword
  Scenario: Reset password with valid email
    Given I have reset password data from "validEmail"
    When I send a POST request to "/reset-password" with the reset password data
    Then the response status code should be 200
    And the response should contain "message" field 

