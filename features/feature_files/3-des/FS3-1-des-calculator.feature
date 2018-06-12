Feature: Total Funds Required Calculation - Tier 4 Student Doctorate In London (single current account including dependants)

    #Acceptance criteria

    #Requirement to meet Tier 4 Doctorate passed and not passed

    #In London - The applicant must show evidence of funds to cover £1,265 per month for 2 months (£2,530)

    #Dependants Required Maintenance threshold: In London - £845

    #Required Maintenance threshold calculation to pass this feature file
    #Maintenance threshold amount =  (Required Maintenance funds doctorate in London
    #(£1265) * 2) -  Accommodation fees paid

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And caseworker is on page t4/main/des
    And the api condition codes response will be 2--
    And the default details are
      | Application raised date | 29/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | Yes        |
      | Accommodation fees paid | 100        |
      | Dependants              | 0          |

  Scenario: Shelly is a Doctorate in London student and has sufficient funds
    When the financial status check is performed
    Then the service displays the following result
      | Outcome                    | £16,090.00                     |
      | Total funds required       | £16,090.00                     |
      | Maintenance period checked | 03/05/2016 to 30/05/2016       |
      | Condition Code             | 2 - Applicant                  |
      | Student type               | Doctorate extension scheme     |
      | Tier                       | Tier 4                         |
      | In London                  | Yes                            |
      | Accommodation fees paid    | £100.00 (limited to £1,265.00) |
      | Dependants                 | 0                              |

  Scenario: Laura is a Doctorate not in London student and has sufficient funds
    When the financial status check is performed with
      | Application raised date | 20/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | No         |
      | Accommodation fees paid | 265        |
      | Dependants              | 0          |
    Then the service displays the following result
      | Outcome                    | £16,090.00                                 |
      | Total funds required       | £16,090.00                                 |
      | Maintenance period checked | 03/05/2016 to 30/05/2016                   |
      | Condition Code             | 2 - Applicant                              |
      | Tier                       | Tier 4                                     |
      | Applicant type             | Main applicant (with & without dependants) |
      | Student type               | Doctorate extension scheme                 |
      | In London                  | No                                         |
      | Accommodation fees paid    | £265.00 (limited to £1,265.00)             |
      | Dependants                 | 0                                          |
      | Application raised date    | 20/06/2016                                 |

  Scenario: User clicks on the Begin a new search button after completing financial status check
    Given the financial status check is performed
    When the new search button is clicked
    Then the service displays the following page content
      | Page title | Type of application |



