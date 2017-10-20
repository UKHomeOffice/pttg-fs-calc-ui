Feature: Dependant only stuff

  Background:
    Given the api health check response has status 200
    And the api threshold response will be t4
    And the api condition codes response will be -3-1
    And caseworker is on page t4/dependant/des
    And the default details are
      | Application raised date | 29/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | Yes        |
      | Accommodation fees paid | 100        |
      | Dependants              | 1          |

  Scenario: Rhianna is dependant only doctorate application and has sufficient funds
    When the financial status check is performed
    Then the service displays the following result
      | Outcome                    | £16,090.00                               |
      | Total funds required       | £16,090.00                               |
      | Maintenance period checked | 03/05/2016 to 30/05/2016                 |
      | Condition code             | 3 - Adult dependant\n1 - Child dependant |
      | Student type               | Doctorate extension scheme               |
      | Tier                       | Tier 4                                   |
      | In London                  | Yes                                      |
      | Dependants                 | 1                                        |
      | Application raised date    | 29/06/2016                               |

  Scenario: Latoya and Janet are a dependant only (x2) application for a Doctorate not in London and has sufficient funds
    When the financial status check is performed with
      | Application raised date | 20/06/2016 |
      | End date                | 30/05/2016 |
      | In London               | No         |
      | Dependants              | 2          |
    Then the service displays the following result
      | Outcome                    | £16,090.00                               |
      | Total funds required       | £16,090.00                               |
      | Maintenance period checked | 03/05/2016 to 30/05/2016                 |
      | Condition code             | 3 - Adult dependant\n1 - Child dependant |
      | Tier                       | Tier 4                                   |
      | Student type               | Doctorate extension scheme               |
      | In London                  | No                                       |
      | Dependants                 | 2                                        |
      | Application raised date    | 20/06/2016                               |