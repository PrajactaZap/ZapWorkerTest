@regression @datadriven
Feature: Data Driven Testing
  As an API consumer
  I want to test with multiple data sets
  So that I can validate different scenarios

  Background:
    Given the API base URL is configured

  @positive
  Scenario Outline: Create users with different data sets
    Given I have user data with name "<name>" and job "<job>"
    When I send a POST request to "/users" with the user data
    Then the response status code should be 201
    And the response "name" should be "<name>"
    And the response "job" should be "<job>"

    Examples:
      | name          | job                |
      | John Doe      | Software Engineer  |
      | Jane Smith    | Product Manager    |
      | Bob Johnson   | QA Engineer        |
      | Alice Brown   | DevOps Engineer    |

  @positive
  Scenario Outline: Update users with different job titles
    Given I have update data with name "<name>" and job "<job>"
    When I send a PUT request to "/users/<userId>" with the user data
    Then the response status code should be 200
    And the response "name" should be "<name>"
    And the response "job" should be "<job>"

    Examples:
      | userId | name          | job                    |
      | 2      | John Updated  | Senior Engineer        |
      | 3      | Jane Updated  | Senior Product Manager |
      | 4      | Bob Updated   | Lead QA Engineer       |

  @negative
  Scenario Outline: Login with invalid credentials
    Given I have login data with email "<email>" and password "<password>"
    When I send a POST request to "/login" with the credentials
    Then the response status code should be <statusCode>
    And the response should contain "error" field

    Examples:
      | email              | password    | statusCode |
      | invalid@test.com   | wrongpass   | 400        |
      | eve.holt@reqres.in |             | 400        |
      |                    | password123 | 400        |
