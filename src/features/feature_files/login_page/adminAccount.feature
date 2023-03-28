Feature: As an Admin, I am able to login with Admin role

  Background: Open the browser
    Given A user visits 'http://localhost:8200'
    Then Page title is 'OrangeHRM'
    And set:
      | username                   | password                   | randomString                       |
      | process.env.ADMIN_USERNAME | process.env.ADMIN_PASSWORD | ${moment().format("YYMMDDHHmmss")} |

  @HappyCase @LP-01
  Scenario: Verify that the administrator can log in successfully when providing the username and password correctly
    When A user login with username '${username}' and password '${password}'
    Then The 'Dashboard' page is displayed
    And The account name is present

  @ErrorCases @LP-01
  Scenario Outline: Verify that the administrator can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The message '<message>' is present under '<fieldName>' field

    Examples:
      | testCases         | username    | password    | fieldName | message  |
      | username is empty |             | ${password} | username  | Required |
      | password is empty | ${username} |             | password  | Required |

  @ErrorCases @LP-01
  Scenario Outline: Verify that the administrator can not log in successfully when providing <testCases>
    When A user login with username '<username>' and password '<password>'
    Then The error message 'Invalid credentials' is present

    Examples:
      | testCases        | username        | password        |
      | invalid username | ${randomString} | ${password}     |
      | invalid password | ${username}     | ${randomString} |
