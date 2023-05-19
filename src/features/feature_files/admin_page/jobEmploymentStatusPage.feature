@AP @AP04
Feature: As a Admin, I can manage Employment Status in Job session

    Background: Open browser, login and navigate to the Employment Status page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Employment Status' item in topbar menu
        Then Verify the main title 'Employment Status' is displayed correctly
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: 01. Verify that it is possible to ADD a new employment status.
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as '<name>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name>' is displayed in table after adding successfully
        When Delete the record '<name>' to clean environment
        Then Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | name                 |
            | Name ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a new employment status.
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as '<name>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name>' is displayed in table after adding successfully
        When User click the 'Add' button
        And Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as '<nameUpdate>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<nameUpdate>' is displayed in table after adding successfully
        When Delete the record '<name>' to clean environment
        Then Verify '<name>' is not displayed in table after removing successfully
        When Delete the record '<nameUpdate>' to clean environment
        Then Verify '<nameUpdate>' is not displayed in table after removing successfully

        Examples:
            | name                 | nameUpdate                  |
            | Name ${randomString} | Name_update ${randomString} |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing employment status
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as 'Name ${randomString}'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify 'Name ${randomString}' is displayed in table after adding successfully
        When A user delete a record with key is 'Name ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When A user delete a record with key is 'Name ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify 'Name ${randomString}' is not displayed in table after removing successfully

    @HappyCases
    Scenario Outline: 04. Verify that it is possible to DELETE multiple existing employment status
        When User click the 'Add' button
        And User enter a new employment status name as '<name_1>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name_1>' is displayed in table after adding successfully
        When User click the 'Add' button
        And User enter a new employment status name as '<name_2>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name_2>' is displayed in table after adding successfully
        When A user select checkbox with keys are '<name_1>,<name_2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<name_1>' is not displayed in table after removing successfully
        And Verify '<name_2>' is not displayed in table after removing successfully

        Examples:
            | name_1                 | name_2                 | records | message              |
            | Name_1 ${randomString} | Name_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an employment status with a duplicate name.
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as '<name>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name>' is displayed in table after adding successfully
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        And User enter the name of an existing employment status as '<name>'
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        Then Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | name                 |
            | Name ${randomString} |

    @ErrorCases
    Scenario: 06. Verify the message error appears when adding the employment status with null value for name
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new employment status with '<name>'
        When User click the 'Add' button
        Then Verify the main title 'Add Employment Status' is displayed correctly
        When User enter a new employment status name as '<name>'
        Then Verify a error message 'Should not exceed 50 characters' is shown under 'Name' field

        Examples:
            | name                                                                   |
            | Employment status name should not exceed 50 characters ${randomString} |