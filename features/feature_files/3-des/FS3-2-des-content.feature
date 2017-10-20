Feature: Tier 4 doctorate extension scheme content (single current account with dependants)

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And the api condition codes response will be 2--
    And caseworker is on page t4/main/des

 ###################################### Section - Check for text on Output does not meet minimum financial requirement - Not Passed ######################################

  Scenario: Page checks for Not Passed text write up
  #This is a scenario to check if Applicant does not meet minimum financial requirement text write up
    When the financial status check is performed with
      | Application raised date | 29/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | Yes        |
      | Accommodation fees paid | 100        |
      | Dependants              | 0          |
    Then the service displays the following page content
      | Outcome | £16,090.00 |
    And the service displays the following result headers in order
      | Total funds required     |
      | 28-day period required   |
      | Condition code           |
      | Estimated leave end date |
      | Result timestamp         |
    And the service displays the following criteria headers in order
      | Tier                            |
      | Applicant type                  |
      | Student type                    |
      | Application raised date         |
      | In London                       |
      | Accommodation fees already paid |
      | Number of dependants            |



