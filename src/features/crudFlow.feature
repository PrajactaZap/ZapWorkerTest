@regression @e2e
Feature: Complete CRUD Flow with Authentication
  As an authenticated user
  I want to perform complete CRUD operations
  So that I can manage user lifecycle

  Background:
    Given the API base URL is configured

  # @smoke @login
  # Scenario: Complete CRUD flow - Login, Create, Update, Delete
  #   Given I am logged in with valid credentials
  #   And I have user data from "createUser"
  #   When I send a POST request to "/users" with the user data
  #   Then the response status code should be 201
  #   And I store the user ID from the response
    
  #   When I send a GET request to the stored user endpoint
  #   Then the response status code should be 200
    
  #   Given I have user data from "updateUser"
  #   When I send a PUT request to the stored user endpoint with the user data
  #   Then the response status code should be 200
  #   And the response should contain "updatedAt" field
    
  #   When I send a DELETE request to the stored user endpoint
  #   Then the response status code should be 204

  @login
  Scenario: Verify authenticated user can access resources
    Given I am logged in with valid credentials
    When I send a GET request to "/users/2"
    Then the response status code should be 200
    And the response should contain "data" field
