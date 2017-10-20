Feature: Edit search button to return UI populated with current values (for all routes on all output pages - pass & non passed)

########################################################################################################################
  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And caseworker is on page t4/main/general

  Scenario: Caseworker needs to edit the information input into the UI after the API has been called and results displayed.
    Given the financial status check is performed with
      | Application raised date | 02/05/2016 |
      | End Date                | 01/05/2016 |
      | Dependants              | 0          |
      | In London               | No         |
      | Course Start Date       | 30/05/2016 |
      | Course End Date         | 29/07/2016 |
      | Course type             | main       |
      | Course institution      | recognised |
      | Tuition fees            | 3000       |
      | Tuition fees paid       | 2000       |
      | Continuation course     | No         |
      | Accommodation fees paid | 100        |
    When the edit search button is clicked
    Then the inputs will be populated with
      | End Date                | 01/05/2016 |
      | Application raised date | 02/05/2016 |
      | Dependants              | 0          |
      | In London               | No         |
      | Course Start Date       | 30/05/2016 |
      | Course End Date         | 29/07/2016 |
      | Tuition fees            | 3000       |
      | Tuition fees paid       | 2000       |
      | Accommodation fees paid | 100        |
