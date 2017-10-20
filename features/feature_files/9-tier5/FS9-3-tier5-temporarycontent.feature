Feature: Tier 5 Temporary Worker

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t5
    And the default details are
      | Application raised date | 30/07/2016 |
      | End date                | 04/07/2016 |
      | Dependants              | 0          |


 ############################# Section - Check for text on Output does not meet minimum financial requirement -Not Passed ######################################

  Scenario: Page checks for Not Passed text write up temporary worker
    Given caseworker is on page t5/temp/main
    When the financial status check is performed
    Then the service displays the following result headers in order
      | Total funds required     |
      | 90-day period required   |
      | Estimated leave end date |
      | Result timestamp         |
    And the service displays the following criteria headers in order
      | Tier                    |
      | Applicant type          |
      | Variant type            |
      | Application raised date |
      | Number of dependants    |



