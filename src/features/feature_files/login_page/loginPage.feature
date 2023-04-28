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

    @ErrorCases @LP01 @LP02
    Scenario Outline: <TC>. Verify that the user can not log in successfully when providing <testCases>
        When A user login with username '<username>' and password '<password>'
        Then The message '<message>' is present under '<fieldName>' field

        Examples:
            | TC | testCases         | username                          | password                          | fieldName | message  |
            | 02 | username is empty |                                   | ${process.env.HRM_PASSWORD_ADMIN} | username  | Required |
            | 03 | password is empty | ${process.env.HRM_USERNAME_ADMIN} |                                   | password  | Required |

    @ErrorCases @LP01 @LP02
    Scenario Outline: <TC>. Verify that the user can not log in successfully when providing <testCases>
        When A user login with username '<username>' and password '<password>'
        Then The error message 'Invalid credentials' is present

        Examples:
            | TC | testCases                          | username                          | password                          |
            | 04 | invalid username                   | ${randomString}                   | ${process.env.HRM_PASSWORD_ADMIN} |
            | 05 | invalid password                   | ${process.env.HRM_USERNAME_ADMIN} | ${randomString}                   |
            | 06 | invalid both username and password | ${randomString}                   | ${randomString}                   |

    @HappyCases @LP02
    Scenario: 07. Verify that the ESS user can log in successfully when providing the username and password correctly
        When A user login with username '${process.env.HRM_USERNAME_ADMIN}' and password '${process.env.HRM_PASSWORD_ADMIN}'
        And A user click 'Admin' item in main menu
        Then Verify the module page header is 'Admin'
        Then Verify the level page header is 'User Management'
        When A user click on the 'Add' button
        And A user select option 'ESS' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option 'Enabled' in dropdown 'Status'
        And A user input a string '${process.env.HRM_USERNAME_ESS}' in the 'Username' field
        And A user input a string '${process.env.HRM_PASSWORD_ESS}' in the 'Password' field
        And A user input a string '${process.env.HRM_PASSWORD_ESS}' in the 'Confirm Password' field
        And A user click on the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        When A user logout their account
        Then Page title is 'OrangeHRM'
        When A user login with username '${process.env.HRM_USERNAME_ESS}' and password '${process.env.HRM_PASSWORD_ESS}'
        Then Verify the module page header is 'Dashboard'
        And Verify the item 'Admin' in Main Menu is not displayed
        When A user logout their account
        When A user login with username '${process.env.HRM_USERNAME_ADMIN}' and password '${process.env.HRM_PASSWORD_ADMIN}'
        And A user click 'Admin' item in main menu
        Then Verify the module page header is 'Admin'
        Then Verify the level page header is 'User Management'
        When A user delete a record with key is '${process.env.HRM_USERNAME_ESS}'
        And User click the 'Yes, Delete' button on pop-up