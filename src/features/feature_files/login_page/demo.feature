Feature: Demo for LNI training

  Background: Open browser and navigate to main page
    Given A user visits 'https://phptravels.net/lang-en'
    Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'

  Scenario: User can login successfuly
    When User click Account button
    And User click Customer Login button
    Then Page title is 'Login - PHPTRAVELS'
    When set:
      | userName            | password |
      | user@phptravels.com | demouser |
    And User type '${userName}' into email
    And User type '${password}' into password
    And User click Login button
    Then Page title is 'Dashboard - PHPTRAVELS'
