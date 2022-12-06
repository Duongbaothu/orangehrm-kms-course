@E01 @SEL-E01S09
Feature: As a guest, I can send message to the PHP Travel

  Background: Open browser and navigate to Contact Us page
    Given A user visits 'https://phptravels.net/lang-en'
    Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'
    When User click on Contact Us button in Infor section
    Then The page URL is 'https://phptravels.net/contact'
    Then Page title is 'Contact - PHPTRAVELS'

  Scenario Outline: User cannot send message to PHP Travels with the incorrect email format
    When User types '<invalidFormatEmail>' into email textbox
    And User clicks on Send button
    Then The error message incorrect email format '<invalidFormatEmail>' is displayed
    Examples:
      | invalidFormatEmail |
      | test               |

  Scenario Outline: User cannot send message to PHP Travels with invalid email <invalidEmail>
    When User types '<invalidEmail>' into email textbox
    And User clicks on Send button
    Then The error message '<invalidEmail>' is displayed
    Examples:
      | invalidEmail |
      | abc@def      |
      |              |

  Scenario Outline: User can send message to PHP Travels with valid email
    When User types '<validEmail>' into email textbox
    And User types '<message>' into message textbox
    And User types '<name>' into Name textbox
    And User clicks on Send button
    Then The page URL is '<contactUsSuccessURL>'
    And The success message is displayed
    Examples:
      | validEmail  | name      | message        | contactUsSuccessURL                    |
      | abc@def.com | Thuong Do | This is a text | https://phptravels.net/contact/success |
      | abc@def.com |           |                | https://phptravels.net/contact/success |
      | abc@def.com | Thuong Do |                | https://phptravels.net/contact/success |
      | abc@def.com |           | This is a text | https://phptravels.net/contact/success |
