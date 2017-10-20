Feature: Non Doctorate Content - Tier 4 student (with dependants)

    Background:
        Given the api health check response has status 200
        And the api threshold response will be t4
        And caseworker is on page t4/main/general
        And the api condition codes response will be -3-1
        And the default details are
            | Application raised date | 05/06/2016 |
            | End date                | 30/05/2016 |
            | In London               | Yes        |
            | Course start date       | 30/05/2016 |
            | Course end date         | 30/11/2016 |
            | Tuition fees            | 8500.00    |
            | Tuition fees paid       | 0          |
            | Accommodation fees paid | 0          |
            | Dependants              | 1          |
            | Continuation Course     | No         |
            | Course type             | main       |
            | Course institution      | recognised       |

    Scenario: Page checks for text write up
#    This is a scenario to check if applicant meets minimum financial requirement text write up
        When the financial status check is performed
        Then the service displays the following page content
            | Outcome        | £16,090.00                                          |
        And the service displays the following result headers in order
            | Total funds required     |
            | 28-day period required |
            | Condition code           |
            | Estimated leave end date |
            | Result timestamp         |
            | Course length            |
        And the service displays the following criteria headers in order
            | Tier                                  |
            | Applicant type                        |
            | Student type                          |
            | Application raised date               |
            | In London                             |
            | Accommodation fees already paid       |
            | Number of dependants                  |
            | Course dates checked                  |
            | Continuation course                   |
            | Course type                           |
            | Course institution                    |
            | Total tuition fees for the first year |
            | Tuition fees already paid             |