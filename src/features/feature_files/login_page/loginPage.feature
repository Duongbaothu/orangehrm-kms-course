@LP
Feature: As an user, I am able to login with my credentials

    Background: Open the browser
        Given A user visits OrangeHRM page
        Then Page title is 'OrangeHRM'
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases @LP01
    Scenario: 01. Verify that the administrator can log in successfully when providing the username and password correctly
        When A user login with username '${process.env.HRM_USERNAME_ADMIN}' and password '${process.env.HRM_PASSWORD_ADMIN}'
        Then Verify the module page header is 'Dashboard'
        And Verify the item 'Admin' in Main Menu is displayed

    @ErrorCases @LP01
    Scenario Outline: <TC>. Verify that the user can not log in successfully when providing <testCases>
        When A user login with username '<username>' and password '<password>'
        Then The message '<message>' is present under '<fieldName>' field

        Examples:
            | TC | testCases         | username                          | password                          | fieldName | message  |
            | 02 | username is empty |                                   | ${process.env.HRM_PASSWORD_ADMIN} | username  | Required |
            | 03 | password is empty | ${process.env.HRM_USERNAME_ADMIN} |                                   | password  | Required |

    @ErrorCases @LP01
    Scenario Outline: <TC>. Verify that the user can not log in successfully when providing <testCases>
        When A user login with username '<username>' and password '<password>'
        Then The error message 'Invalid credentials' is present

        Examples:
            | TC | testCases                          | username                          | password                          |
            | 04 | invalid username                   | ${randomString}                   | ${process.env.HRM_PASSWORD_ADMIN} |
            | 05 | invalid password                   | ${process.env.HRM_USERNAME_ADMIN} | ${randomString}                   |
            | 06 | invalid both username and password | ${randomString}                   | ${randomString}                   |
