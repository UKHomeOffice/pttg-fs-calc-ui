Feature: Tier 4 student union (sabbatical officer) content (single current account with dependants)

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And the api condition codes response will be 2--
    And caseworker is on page t4/main/suso
    And the default details are
      | Application raised date | 10/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | Yes        |
      | Course start date       | 01/03/2016 |
      | Course end date         | 30/03/2016 |
      | Dependants              | 2          |
      | Continuation Course     | No         |
      | Accommodation fees paid | 0          |

 ###################################### Section - Check for text on Output meets minimum financial requirement - Pass page ######################################

  Scenario: Page checks for Passed text write up
  This is a scenario to check if applicant meets minimum financial requirement text write up
    When the financial status check is performed
    Then the service displays the following result headers in order
      | Total funds required     |
      | 28-day period required   |
      | Condition code           |
      | Estimated leave end date |
      | Result timestamp         |
      | Course length            |
    And the service displays the following criteria headers in order
      | Tier                            |
      | Applicant type                  |
      | Student type                    |
      | Application raised date         |
      | Course dates checked            |
      | Continuation course             |
      | In London                       |
      | Accommodation fees already paid |
      | Number of dependants            |
