@E01 @SEL-E01S04
Feature: As a guest, I can visit all Pages from the page Header

  Background: Open browser and navigate to main page
    Given A user visits 'https://phptravels.net/lang-en'
    Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'

  @HappyCase
  Scenario: User can visit Main page from the main page header
    When User click Logo image
    Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'

  @HappyCase
  Scenario Outline: User can visit to <pageName> page
    When User click '<pageName>' page with href is '<href>'
    Then Page title is '<pageTitle>'
    Examples:
      | pageName  | href                           | pageTitle                     |
      | Tours     | https://phptravels.net/tours   | Search Tours - PHPTRAVELS     |
      | Transfers | https://phptravels.net/cars    | Search Transfers - PHPTRAVELS |
      | Flights   | https://phptravels.net/flights | Search flights - PHPTRAVELS   |
      | Hotels    | https://phptravels.net/hotels  | Search Hotels - PHPTRAVELS    |
      | Visa      | https://phptravels.net/visa    | Submit Visa - PHPTRAVELS      |
      | Blog      | https://phptravels.net/blog    | Blog - PHPTRAVELS             |
      | Offers    | https://phptravels.net/offers  | Offers - PHPTRAVELS           |

  @HappyCase
  Scenario Outline: User can visit to Company - <pageName> page
    When User hover Company button
    Then User click '<pageName>' option on Company dropdown list
    Then Page title is '<pageTitle>'
    Examples:
      | pageName     | pageTitle                 |
      | About Us     | About Us - PHPTRAVELS     |
      | Terms of Use | Terms of Use - PHPTRAVELS |
      | FAQ          | FAQ - PHPTRAVELS          |
      | How to Book  | How to Book - PHPTRAVELS  |

  @HappyCase
  Scenario Outline: User can visit to Account - <pageName> page
    When User click Account button
    When User click '<pageName>' page with href is '<href>'
    Then Page title is '<pageTitle>'
    Examples:
      | pageName        | href                          | pageTitle           |
      | Customer Login  | https://phptravels.net/login  | Login - PHPTRAVELS  |
      | Customer Signup | https://phptravels.net/signup | Signup - PHPTRAVELS |
      | Agents Login    | https://phptravels.net/login  | Login - PHPTRAVELS  |
      | Agents Signup   | https://phptravels.net/signup | Signup - PHPTRAVELS |
      | Supplier Login  | https://phptravels.net/login  | Login - PHPTRAVELS  |
      | Supplier Signup | https://phptravels.net/signup | Signup - PHPTRAVELS |