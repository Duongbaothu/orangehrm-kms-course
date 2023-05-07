@AP @AP01
Feature: As an Admin, I can manage users in User Management session

    Background: Open browser and navigate to the specific page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        Then Verify the module page header is 'Admin'
        And Verify the level page header is 'User Management'
        And set:
            | randomNumber                          | randomStringPass                        |
            | ${Math.floor(Math.random() * 999999)} | ${Math.random().toString(36).slice(-8)} |

    @HappyCases
    Scenario: <No>. Verify that it is possible to ADD user then search that user with full info
        When User click the 'Add' button
        Then Verify the main title 'Add User' is displayed correctly
        When A user select option '<userRole>' in dropdown 'User Role'
        And A user type a hint '<hintEmployeeName>' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option '<status>' in dropdown 'Status'
        And A user type 'user${randomNumber}' into 'Username'
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify 'user${randomNumber}' is displayed in table after adding successfully
        When A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        And A user type '<username>' into 'Username'
        And A user select option '<userRole>' in dropdown 'User Role'
        And A user type a hint '<hintEmployeeName>' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option '<status>' in dropdown 'Status'
        And User click the 'Search' button
        Then Verify '<username>' is displayed in table after adding successfully
        And Verify user role of user '<username>' is '<userRole>' showing correctly in table
        And Verify employee name of user '<username>' is 'Boss A' showing correctly in table
        And Verify status of user '<username>' is '<status>' showing correctly in table
        When User click the 'Reset' button
        And A user delete a record with key is 'user${randomNumber}'
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<username>' is not displayed in table after removing successfully

        Examples:
            | No | userRole | hintEmployeeName | status   | username            | password                | confirmPassword         |
            | 01 | Admin    | Boss             | Enabled  | user${randomNumber} | ${randomStringPass}aA1! | ${randomStringPass}aA1! |
            | 02 | ESS      | A                | Enabled  | user${randomNumber} | ${randomStringPass}aA1! | ${randomStringPass}aA1! |

    @HappyCases
    Scenario: 03. As an Admin, I can add multiple users from .csv file
        When Add multiple users with .csv file in 'src/features/data/users/user_data.csv'
        And set 'user1' to '${lastRun[0]}'
        And set 'user2' to '${lastRun[1]}'
        Then Verify '${user1}' is displayed in table after adding successfully
        And Verify '${user2}' is displayed in table after adding successfully
        When A user select checkbox with keys are '${user1},${user2}'
        And User click the 'Delete Selected' button
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '${user1}' is not displayed in table after removing successfully
        And Verify '${user2}' is not displayed in table after removing successfully

    @ErrorCases
    Scenario: 04. As an Admin, I can see error message 'Required' when missing all field in add form
        When User click the 'Add' button
        And A user delete all text in 'Username'
        And A user delete all text in 'Password'
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'User Role' field
        And Verify a error message 'Required' is shown under 'Employee Name' field
        And Verify a error message 'Required' is shown under 'Status' field
        And Verify a error message 'Required' is shown under 'Username' field
        And Verify a error message 'Required' is shown under 'Password' field
        And Verify a error message 'Required' is shown under 'Confirm Password' field

    @ErrorCases
    Scenario: <No>. As an Admin, I can see error message <msg> when <case> <field> in add form
        When User click the 'Add' button
        And A user type '<content>' into '<field>'
        And User click the 'Save' button
        Then Verify a error message '<msg>' is shown under '<field>' field

        Examples:
            | No | case                           | field            | content             | msg                                                    |
            | 05 | type invalid                   | Employee Name    | ${randomStringPass} | Invalid                                                |
            | 06 | type already exist             | Username         | admin               | Already exists                                         |
            | 07 | type less than 5 characters of | Username         | admi                | Should be at least 5 characters                        |
            | 08 | type less than 8 characters of | Password         | admin               | Should have at least 8 characters                      |
            # | 09 | type is not strong of          | Password         | Admin1234           | Your password must contain minimum 1 special character |
            | 10 | type not correct for           | Confirm Password | Admin12             | Passwords do not match                                 |

    @HappyCases
    Scenario: <No>. As an Admin, I can search user with <field> field
        When User click the 'Add' button
        Then Verify the main title 'Add User' is displayed correctly
        When A user select option 'ESS' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option 'Enabled' in dropdown 'Status'
        And A user type 'user${randomNumber}' into 'Username'
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify 'user${randomNumber}' is displayed in table after adding successfully
        When A user type '<username>' into 'Username'
        And A user select option '<userRole>' in dropdown 'User Role'
        And <employeeAction>
        And A user select option '<status>' in dropdown 'Status'
        And User click the 'Search' button
        Then Verify 'user${randomNumber}' is displayed in table after adding successfully
        And Verify user role of user 'user${randomNumber}' is 'ESS' showing correctly in table
        And Verify employee name of user 'user${randomNumber}' is 'Boss A' showing correctly in table
        And Verify status of user 'user${randomNumber}' is 'Enabled' showing correctly in table
        When User click the 'Reset' button
        And A user delete a record with key is 'user${randomNumber}'
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<username>' is not displayed in table after removing successfully

        Examples:
            | No | field                            | username            | userRole     | employeeAction                                                                                                    | status       |
            | 11 | Username                         | user${randomNumber} | -- Select -- | A user type '' into 'Employee Name'                                                                               | -- Select -- |
            | 12 | User Role                        |                     | ESS          | A user type '' into 'Employee Name'                                                                               | -- Select -- |
            | 13 | Employee Name                    |                     | -- Select -- | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | -- Select -- |
            | 14 | Status                           |                     | -- Select -- | A user type '' into 'Employee Name'                                                                               | Enabled      |
            | 15 | Username,User Role               | user${randomNumber} | ESS          | A user type '' into 'Employee Name'                                                                               | -- Select -- |
            | 16 | Username,Employee Name           | user${randomNumber} | -- Select -- | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | -- Select -- |
            | 17 | Username,Status                  | user${randomNumber} | -- Select -- | A user type '' into 'Employee Name'                                                                               | Enabled      |
            | 18 | User Role,Employee Name          |                     | ESS          | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | -- Select -- |
            | 19 | User Role,Status                 |                     | ESS          | A user type '' into 'Employee Name'                                                                               | Enabled      |
            | 20 | Employee Name,Status             |                     | -- Select -- | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | Enabled      |
            | 21 | Username,User Role,Employee Name | user${randomNumber} | ESS          | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | -- Select -- |
            | 22 | Username,User Role,Status        | user${randomNumber} | ESS          | A user type '' into 'Employee Name'                                                                               | Enabled      |
            | 23 | User Role,Employee Name,Status   |                     | ESS          | A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list | Enabled      |

    @ErrorCases
    Scenario: <No>. As an Admin, I can see <msg> when <case>
        When A user type '${randomStringPass}' into '<field>'
        And User click the 'Search' button
        And <action>

        Examples:
            | No | msg              | case                       | field         | action                                                                |
            | 24 | No Records Found | search invalid Username    | Username      | Verify alert message is 'No Records Found'                            |
            | 25 | error message    | type invalid Employee Name | Employee Name | Verify a error message 'Invalid' is shown under 'Employee Name' field |

    @HappyCases
    Scenario: <No>. As an Admin, I can edit <field> field
        When User click the 'Add' button
        Then Verify the main title 'Add User' is displayed correctly
        And A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option 'Enabled' in dropdown 'Status'
        And A user type '<user>' into 'Username'
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<user>' is displayed in table after adding successfully
        When A user click edit a record with key is '<user>'
        And User click the 'Cancel' button
        And A user click edit a record with key is '<user>'
        And <action>
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '<user>' is displayed in table after adding successfully
        And Verify user role of user '<user>' is '<expectedUserRole>' showing correctly in table
        And Verify employee name of user '<user>' is 'Boss A' showing correctly in table
        And Verify status of user '<user>' is '<expectedStatus>' showing correctly in table
        When A user delete a record with key is '<user>'
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<user>' is not displayed in table after removing successfully

        Examples:
            | No | field     | user                | action                                               | expectedUserRole | expectedStatus |
            | 26 | User Role | user${randomNumber} | A user select option 'ESS' in dropdown 'User Role'   | ESS              | Enabled        |
            | 27 | Status    | user${randomNumber} | A user select option 'Disabled' in dropdown 'Status' | Admin            | Disabled       |

    @HappyCases
    Scenario: 28. As an Admin, I can edit Username and Password for specific account
        When User click the 'Add' button
        Then Verify the main title 'Add User' is displayed correctly
        When A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option 'Enabled' in dropdown 'Status'
        And A user type 'user${randomNumber}' into 'Username'
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        And A user click edit a record with key is 'user${randomNumber}'
        And A user type 'User${randomNumber}1' into 'Username'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify 'User${randomNumber}1' is displayed in table after adding successfully
        When A user click edit a record with key is 'User${randomNumber}1'
        And A user click checkbox Change Password
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        When A user click 'Logout' item in User Profile dropdown
        And A user login with username 'User${randomNumber}1' and password '${randomStringPass}aA1!'
        And A user is on '/web/index.php/dashboard/index' page
        And A user click 'Logout' item in User Profile dropdown
        And A user logged in by admin role
        And A user click 'Admin' item in main menu
        And A user select checkbox with keys are 'all'
        And User click the 'Delete Selected' button
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify 'User${randomNumber}1' is not displayed in table after removing successfully

    @ErrorCases
    Scenario: 29. As an Admin, I can see error message 'Required' when missing all field in edit form
        When A user click edit a record with key is 'admin'
        And A user select option '-- Select --' in dropdown 'User Role'
        And A user delete all text in 'Employee Name'
        And A user select option '-- Select --' in dropdown 'Status'
        And A user click checkbox Change Password
        And A user delete all text in 'Username'
        And A user delete all text in 'Password'
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'User Role' field
        And Verify a error message 'Required' is shown under 'Employee Name' field
        And Verify a error message 'Required' is shown under 'Status' field
        And Verify a error message 'Required' is shown under 'Username' field
        And Verify a error message 'Required' is shown under 'Password' field
        And Verify a error message 'Required' is shown under 'Confirm Password' field

    @ErrorCases
    Scenario: <No>. As an Admin, I can see error message <msg> when <case> <field> in edit form
        When User click the 'Add' button
        Then Verify the main title 'Add User' is displayed correctly
        When A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        And A user select option 'Enabled' in dropdown 'Status'
        And A user type 'user${randomNumber}' into 'Username'
        And A user type '${randomStringPass}aA1!' into 'Password'
        And A user type '${randomStringPass}aA1!' into 'Confirm Password'
        And User click the 'Save' button
        And A user click edit a record with key is 'user${randomNumber}'
        And A user click checkbox Change Password
        And A user type '<content>' into '<field>'
        And User click the 'Save' button
        Then Verify a error message '<msg>' is shown under '<field>' field
        When A user click 'Admin' item in main menu
        And A user select checkbox with keys are 'all'
        And User click the 'Delete Selected' button
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify 'user${randomNumber}' is not displayed in table after removing successfully

        Examples:
            | No | case                           | field            | content             | msg                                                   |
            | 30 | type invalid                   | Employee Name    | ${randomStringPass} | Invalid                                                |
            | 31 | type already exist             | Username         | Admin               | Already exists                                         |
            | 32 | type less than 5 characters of | Username         | admi                | Should be at least 5 characters                        |
            | 33 | type less than 8 characters of | Password         | admin               | Should have at least 8 characters                      |
            # | 34 | type is not strong of          | Password         | Admin1234           | Your password must contain minimum 1 special character |
            | 35 | type not correct for           | Confirm Password | Admin12             | Passwords do not match                                 |

    @HappyCases
    Scenario: 36. As an Admin, I can delete all users.
        When Add multiple users with .csv file in 'src/features/data/users/user_data.csv'
        And set 'user1' to '${lastRun[0]}'
        And set 'user2' to '${lastRun[1]}'
        When A user select checkbox with keys are 'all'
        And User click the 'Delete Selected' button
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '${user1}' is not displayed in table after removing successfully
        And Verify '${user2}' is not displayed in table after removing successfully

    @ErrorCases
    Scenario: 37. As an Admin, I can see error alert when delete my account
        When A user delete a record with key is 'admin'
        Then Verify alert message is 'Cannot be deleted'
