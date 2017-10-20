Feature: Total Funds Required Calculation - Tier 4 Student (sabbatical officer) In London (single current account with dependants)

  Acceptance criteria

  Requirement to meet Tier 4 Doctorate passed and not passed

  In London - The applicant must show evidence of funds to cover £1,265 for each month remaining of the course up to a maximum of 2 months

  Required Maintenance threshold calculation to pass this feature file
  Maintenance threshold amount =  (Required Maintenance funds doctorate in London
  (£1265) * 2) -  Accommodation fees paid

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And the api condition codes response will be 2--
    And caseworker is on page t4/main/suso


  Scenario: Raj is a sabbatical officer in London student and does not have sufficient funds
    When the financial status check is performed with
      | Application raised date    | 29/06/2016 |
      | End date                   | 30/05/2016 |
      | In London                  | Yes        |
      | Course start date          | 01/03/2016 |
      | Course end date            | 20/04/2016 |
      | Accommodation fees paid    | 0          |
      | Dependants                 | 0          |
      | Continuation Course        | Yes        |
      | Original Course Start Date | 30/10/2015 |
    Then the service displays the following result
      | Outcome                 | £16,090.00                       |
      | Total funds required    | £16,090.00                       |
      | Tier                    | Tier 4                           |
      | Student type            | Student union sabbatical officer |
      | In London               | Yes                              |
      | Course length           | 2 (limited to 9)                 |
      | Accommodation fees paid | £0.00 (limited to £1,265.00)     |
      | Dependants              | 0                                |
    And the result table contains the following
      | Total funds required     | £16,090.00       |
      | Condition Code           | 2 - Applicant    |
      | Course length            | 2 (limited to 9) |
      | Entire Course Length     | 6                |
      | Estimated Leave End Date | 22/10/2017       |


  Scenario: Shelly is a sabbatical officer in London student and has sufficient funds
    When the financial status check is performed with
      | Application raised date    | 10/06/2016 |
      | End date                   | 30/05/2016 |
      | In London                  | No         |
      | Course start date          | 01/03/2016 |
      | Course end date            | 30/03/2016 |
      | Accommodation fees paid    | 100        |
      | Dependants                 | 0          |
      | Continuation Course        | Yes        |
      | Original Course Start Date | 30/10/2015 |
    Then the service displays the following result
      | Outcome                    | £16,090.00                       |
      | Total funds required       | £16,090.00                       |
      | Tier                       | Tier 4                           |
      | Student type               | Student union sabbatical officer |
      | In London                  | No                               |
      | Course length              | 1 (limited to 9)                 |
      | Accommodation fees paid    | £100.00 (limited to £1,265.00)   |
      | Dependants                 | 0                                |
      | Continuation Course        | Yes                              |
      | Original Course Start Date | 30/10/2015                       |
    And the result table contains the following
      | Total funds required     | £16,090.00       |
      | Condition Code           | 2 - Applicant    |
      | Course length            | 1 (limited to 9) |
      | Entire course length     | 6                |
      | Estimated Leave End Date | 22/10/2017       |

## Not Pass - Dependant only ##

  Scenario: Hugo is a dependant only application - sabbatical officer in London student and does not have sufficient funds
    Given the api condition codes response will be -4B-1
    And caseworker is on page t4/dependant/suso
    When the financial status check is performed with
      | Application raised date    | 29/06/2016 |
      | End date                   | 30/05/2016 |
      | In London                  | Yes        |
      | Course start date          | 01/03/2016 |
      | Course end date            | 20/04/2016 |
      | Dependants                 | 1          |
      | Continuation Course        | Yes        |
      | Original Course Start Date | 30/10/2015 |
    Then the service displays the following result
      | Outcome              | £16,090.00                       |
      | Total funds required | £16,090.00                       |
      | Tier                 | Tier 4                           |
      | Student type         | Student union sabbatical officer |
      | In London            | Yes                              |
      | Course length        | 2 (limited to 9)                 |
      | Dependants           | 1                                |
    And the result table contains the following
      | Total funds required     | £16,090.00                                |
      | Condition Code           | 4B - Adult dependant\n1 - Child dependant |
      | Course length            | 2 (limited to 9)                          |
      | Entire Course Length     | 6                                         |
      | Estimated Leave End Date | 22/10/2017                                |

## Pass - Dependant only ##

  Scenario: Adele and Grace are a dependant only application - sabbatical officer in London student and has sufficient funds
    Given the api condition codes response will be -4B-1
    And caseworker is on page t4/dependant/suso
    When the financial status check is performed with
      | Application raised date    | 10/06/2016 |
      | End date                   | 30/05/2016 |
      | In London                  | Yes        |
      | Course start date          | 01/03/2016 |
      | Course end date            | 30/03/2016 |
      | Dependants                 | 2          |
      | Continuation Course        | Yes        |
      | Original Course Start Date | 30/10/2015 |
    Then the service displays the following result
      | Outcome                    | £16,090.00                       |
      | Total funds required       | £16,090.00                       |
      | Tier                       | Tier 4                           |
      | Student type               | Student union sabbatical officer |
      | In London                  | Yes                              |
      | Course length              | 1 (limited to 9)                 |
      | Dependants                 | 2                                |
      | Continuation Course        | Yes                              |
      | Original Course Start Date | 30/10/2015                       |
    And the result table contains the following
      | Total funds required     | £16,090.00                                |
      | Condition Code           | 4B - Adult dependant\n1 - Child dependant |
      | Course length            | 1 (limited to 9)                          |
      | Entire course length     | 6                                         |
      | Estimated Leave End Date | 22/10/2017                                |
