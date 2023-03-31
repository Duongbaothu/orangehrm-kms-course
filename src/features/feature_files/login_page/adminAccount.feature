@LP @LP01
Feature: As an Admin, I am able to login with Admin role

  Background: Open the browser
    Given A user visits '' page
    Then Page title is 'OrangeHRM'
    And set:
      | username                          | password                          | randomString                       |
      | ${process.env.HRM_USERNAME_ADMIN} | ${process.env.HRM_PASSWORD_ADMIN} | ${moment().format('YYMMDDHHmmss')} |

  @HappyCase
  Scenario: Verify that the administrator can log in successfully when providing the username and password correctly
    When A user logged in by admin role
    Then Verify the module page header is 'Dashboard'
    And Verify the item 'Admin' in Main Menu is displayed

  @ErrorCases
  Scenario Outline: Verify that the administrator can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The message '<message>' is present under '<fieldName>' field

    Examples:
      | testCases         | username    | password    | fieldName | message  |
      | username is empty |             | ${password} | username  | Required |
      | password is empty | ${username} |             | password  | Required |

  @ErrorCases
  Scenario Outline: Verify that the administrator can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The error message 'Invalid credentials' is present

    Examples:
      | testCases        | username        | password        |
      | invalid username | ${randomString} | ${password}     |
      | invalid password | ${username}     | ${randomString} |
