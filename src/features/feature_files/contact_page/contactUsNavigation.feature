@E01 @SEL-E01S08
Feature: As a guest, I can access the Contact Us page from Infor section

    Background: Open browser and navigate to main page
        Given A user visits 'https://phptravels.net/lang-en'
        Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'

    Scenario: User can access the Contact Us page from Infor section
        When User click on Contact Us button in Infor section
        Then The page URL is 'https://phptravels.net/contact'
        Then Page title is 'Contact - PHPTRAVELS'
