@regression
Feature: User Management API
  As an API consumer
  I want to perform CRUD operations on users
  So that I can manage user data effectively

  Background:
    Given the API base URL is configured

  @smoke @positive
  Scenario: Get list of users successfully
    When I send a GET request to "/users" with page "2"
    Then the response status code should be 200
    And the response should contain "data" field
    And the response "data" should be an array
    And the response should contain "page" field with value 2

  @smoke @positive
  Scenario: Get single user by ID
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response should contain "data" field
    And the response "data.id" should be 1
    And the response "data.email" should not be empty
    And the response "data.first_name" should not be empty

  @positive
  Scenario: Create a new user
    Given I have user data from "createUser"
    When I send a POST request to "/users" with the user data
    Then the response status code should be 201
    And the response should contain "name" field
    And the response should contain "job" field
    And the response should contain "id" field
    And the response should contain "createdAt" field

  @positive
  Scenario: Update an existing user
    Given I have user data from "updateUser"
    When I send a PUT request to "/users/1" with the user data
    Then the response status code should be 200
    And the response should contain "name" field
    And the response should contain "job" field
    And the response should contain "updatedAt" field

  @positive
  Scenario: Partially update a user
    Given I have user data from "patchUser"
    When I send a PATCH request to "/users/2" with the user data
    Then the response status code should be 200
    And the response should contain "name" field
    And the response should contain "updatedAt" field

  @positive
  Scenario: Delete a user
    When I send a DELETE request to "/users/2"
    Then the response status code should be 204

  @negative
  Scenario: Get non-existent user returns 404
    When I send a GET request to "/users/999999"
    Then the response status code should be 404

  @negative
  Scenario: Get user with invalid ID format
    When I send a GET request to "/users/invalid"
    Then the response status code should be 404

  @new
  Scenario: Delete created user id
    When I send a DELETE request to the stored user endpoint
    Then the response status code should be 204 
    And the response should be empty
