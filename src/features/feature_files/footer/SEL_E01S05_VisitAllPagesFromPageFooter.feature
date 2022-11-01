Feature: As a guest, I can visit all pages from the page footer

  Background: Open browser and navigate to main page
    Given A user visits 'https://phptravels.net/lang-en'
    Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'

  Scenario Outline: User can visit <name> page frome the main page footer
    When User scroll to the element
    And User click "<name>" text with href: "<href>"
    Then Page title is '<pageTitle>'
    Examples: 
      | name              | pageTitle                                            | href                                      |
      | Logo              | PHPTRAVELS \| Travel Technology Partner - PHPTRAVELS | 'https://phptravels.net/'                 |
      | Contact Us        | Contact - PHPTRAVELS                                 | 'https://phptravels.net/contact'          |
      | Company           | company - PHPTRAVELS                                 | 'company'                                 |
      | About Us          | About Us - PHPTRAVELS                                | 'https://phptravels.net/about-us'         |
      | Terms Of Use      | Terms of Use - PHPTRAVELS                            | 'https://phptravels.net/terms-of-use'     |
      | Cookies Policy    | Cookies policy - PHPTRAVELS                          | 'https://phptravels.net/cookies-policy'   |
      | Private Policy    | Privacy Policy - PHPTRAVELS                          | 'https://phptravels.net/privacy-policy'   |
      | Support           | supprt - PHPTRAVELS                                  | 'supprt'                                  |
      | Become Supplier   | Become Supplier - PHPTRAVELS                         | 'https://phptravels.net/become-supplier'  |
      | FAQ               | FAQ - PHPTRAVELS                                     | 'https://phptravels.net/faq'              |
      | Booking Tips      | Booking Tips - PHPTRAVELS                            | 'https://phptravels.net/booking-tips'     |
      | How To Book       | How to Book - PHPTRAVELS                             | 'https://phptravels.net/how-to-book'      |
      | Service           | services - PHPTRAVELS                                | 'services'                                |
      | File A Claim      | File a claim - PHPTRAVELS                            | 'https://phptravels.net/file-a-claim'     |
      | Last Minute Deals | Offers - PHPTRAVELS                                  | 'https://phptravels.net/offers'           |
      | Add Your Business | Signup - PHPTRAVELS                                  | 'https://phptravels.net/signup-supplier'  |
      | Careers And Jobs  | Careers and Jobs - PHPTRAVELS                        | 'https://phptravels.net/careers'          |
    