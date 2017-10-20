Feature: Route selection screen inputs - All tiers
  This screen allows caseworker to select Tier 2, 4 & 5 application type, which will direct to the right Financial status check form

  Background:
    Given the api health check response has status 200


  Scenario: Caseworker selects Tier 4 Check status
    When caseworker is on page t4
    Then the service displays the following page content
      | Main Applicant | Main applicant  |
      | Dependant Only | Dependants only |


  Scenario: Caseworker selects the student type - Tier 4
    When caseworker is on page t4/main
    Then the service displays the following page content
      | general | General student                  |
      | des     | Doctorate extension scheme       |
      | pgdd    | Postgraduate doctor or dentist   |
      | suso    | Student union sabbatical officer |

        #### TIER 2 ####

  Scenario: Caseworker selects Tier 2 (General)
    When caseworker is on page t2
    Then the service displays the following page content
      | Main Applicant | Main applicant  |
      | Dependant Only | Dependants only |

        #### TIER 5 incorporate youth mobility scheme and temporary worker####

  Scenario: Caseworker selects Tier 5
    When caseworker is on page t5
    Then the service displays the following page content
      | Temp  | Temporary Worker      |
      | Youth | Youth Mobility Scheme |

  Scenario: Caseworker selects Tier 5 temporary worker
    When caseworker is on page t5/temp
    Then the service displays the following page content
      | Main Applicant | Main applicant  |
      | Dependant Only | Dependants only |

  Scenario: Caseworker selects Tier 5 youth mobility
    When caseworker is on page t5/youth
    Then the service displays the following page content
      | Page Subtitle | Tier 5 application (main applicant) |

  Scenario Outline: Routes to form pages
    When caseworker is on page <Page>
    Then the service displays the following page content
      | Page Subtitle | <Subtitle> |
    Examples:
      | Page                 | Subtitle                                 |
      | t2/main/details      | Tier 2 application (main applicant)      |
      | t2/dependant/details | Tier 2 application (dependant applicant) |
      | t4/main/general      | Tier 4 application (main applicant)      |
      | t4/dependant/general | Tier 4 application (dependant applicant) |
      | t4/main/pgdd         | Tier 4 application (main applicant)      |
      | t4/dependant/pgdd    | Tier 4 application (dependant applicant) |
      | t4/main/des          | Tier 4 application (main applicant)      |
      | t4/dependant/des     | Tier 4 application (dependant applicant) |
      | t4/main/suso         | Tier 4 application (main applicant)      |
      | t4/dependant/suso    | Tier 4 application (dependant applicant) |
      | t5/temp/main         | Tier 5 application (main applicant)      |
      | t5/temp/dependant    | Tier 5 application (dependant applicant) |
      | t5/youth             | Tier 5 application (main applicant)      |
      | t5/youth/main        | Tier 5 application (main applicant)      |
