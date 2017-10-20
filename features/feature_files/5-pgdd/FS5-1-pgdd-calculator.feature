Feature: Total Funds Required Calculation - Tier 4 Student post graduate doctor or dentist In London (single current account and no dependants)

#    Acceptance criteria

#    Requirement to meet Tier 4 post graduate doctor or dentist passed and not passed

#    In London - The applicant must show evidence of funds to cover £1,265 for each month remaining of the course up to a maximum of 2 months

#    Required Maintenance threshold calculation to pass this feature file
#    Maintenance threshold amount =  (Required Maintenance funds doctorate in London
#    (£1265) * remaining course length) -  Accommodation fees paid

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
        #Added to Jira PT-27 - Add 'Account holder name' to FSPS UI
  Scenario: Raj is a postgraduate doctor or dentist in London student and does not have sufficient funds

    And the api condition codes response will be 2--
    And caseworker is on page t4/main/pgdd
    When the financial status check is performed with
      | Application raised date    | 29/06/2016 |
      | End date                   | 30/05/2016 |
      | In London                  | Yes        |
      | Course start date          | 30/05/2016 |
      | Course end date            | 30/07/2016 |
      | Accommodation fees paid    | 0          |
      | Dependants                 | 0          |
      | Continuation Course        | Yes        |
      | Original Course Start Date | 30/10/2015 |

    Then the service displays the following result
      | Outcome                    | £16,090.00                                 |
      | Total funds required       | £16,090.00                                 |
      | Maintenance period checked | 03/05/2016 to 30/05/2016                   |
      | Condition Code             | 2 - Applicant                              |
      | Course dates checked       | 30/05/2016 to 30/07/2016                   |
      | Tier                       | Tier 4                                     |
      | Applicant type             | Main applicant (with & without dependants) |
      | Student type               | Postgraduate doctor or dentist             |
      | In London                  | Yes                                        |
      | Course length              | 3 (limited to 9)                           |
      | Accommodation fees paid    | £0.00 (limited to £1,265.00)               |
      | Dependants                 | 0                                          |
      | Continuation Course        | Yes                                        |
      | Original Course Start Date | 30/10/2015                                 |