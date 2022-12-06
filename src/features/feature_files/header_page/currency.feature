@E01 @SEL-E01S07
Feature: Currency function

  Background: Open browser and navigate to main page
    Given A user visits 'https://phptravels.net'

  Scenario: TC01 - Validate default currecy set to USD
    Then Currency button show "USD"
    And All price in page will show in "USD"

  Scenario Outline: TC02 - Validate user can select the designed currency and the booking uses selected currency
    When User select a "<currency>" in Currency dropdown box
    Then Currency button show "<currency>"
    And All price in page will show in "<currency>"
    When User select an item in Featured Tours
    Then The booking uses selected "<currency>"
    Examples:
        | currency        | 
        | GBP             | 
        | CNY             |
        | JPY             |
        | RUB             |
        | SAR             |