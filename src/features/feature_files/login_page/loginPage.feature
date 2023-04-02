@LP
Feature: As an user, I am able to login with my credentials

  Background: Open the browser
    Given A user visits '' page
    Then Page title is 'OrangeHRM'
    And set:
      | usernameAdmin                     | passwordAdmin                     | randomString                       |
      | ${process.env.HRM_USERNAME_ADMIN} | ${process.env.HRM_PASSWORD_ADMIN} | ${moment().format('YYMMDDHHmmss')} |

  @HappyCase @LP01
  Scenario: Verify that the administrator can log in successfully when providing the username and password correctly
    When A user login with username '${usernameAdmin}' and password '${passwordAdmin}'
    Then Verify the module page header is 'Dashboard'
    And Verify the item 'Admin' in Main Menu is displayed

  @ErrorCases @LP01
  Scenario Outline: Verify that the user can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The message '<message>' is present under '<fieldName>' field

    Examples:
      | testCases                  | username         | password         | fieldName | message  |
      | username of Admin is empty |                  | ${passwordAdmin} | username  | Required |
      | password of Admin is empty | ${usernameAdmin} |                  | password  | Required |

  @ErrorCases @LP01
  Scenario Outline: Verify that the user can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The error message 'Invalid credentials' is present

    Examples:
      | testCases                          | username         | password         |
      | invalid username of Admin          | ${randomString}  | ${passwordAdmin} |
      | invalid password of Admin          | ${usernameAdmin} | ${randomString}  |
      | invalid both username and password | ${randomString}  | ${randomString}  |
