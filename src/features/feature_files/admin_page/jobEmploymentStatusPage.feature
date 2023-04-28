@AP @AP04
Feature: As a Admin, I can manage Employment Status in Job session

    Background: Open browser, login and navigate to the Employment Status page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Employment Status' item in topbar menu
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: 01. Verify that it is possible to ADD a new employment status.
        When Get number of records found in employment status table
        Then User click the 'Add' button
        And Verify the form title 'Add Employment Status' is displayed correctly
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And Verify the total number of records found in the employment status table is increased by '1' unit
        And Delete the record '<name>' to clean environment

        Examples:
            | name                 |
            | Name ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a new employment status.
        When User click the 'Add' button
        Then Verify the form title 'Add Employment Status' is displayed correctly
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And A user click edit a record with key is '<name>'
        And Verify the form title 'Edit Employment Status' is displayed correctly
        And User enter a new employment status name as '<nameUpdate>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Updated'
        And Verify that new employment status '<nameUpdate>' is visible in the table
        And Delete the record '<nameUpdate>' to clean environment

        Examples:
            | name                 | nameUpdate                  |
            | Name ${randomString} | Name_update ${randomString} |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing employment status
        When User click the 'Add' button
        Then Verify the form title 'Add Employment Status' is displayed correctly
        And User enter a new employment status name as 'Name ${randomString}'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status 'Name ${randomString}' is visible in the table
        And Get number of records found in employment status table
        And A user delete a record with key is 'Name ${randomString}'
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And The popup with the question 'Are you Sure?' is not displayed
        And A user delete a record with key is 'Name ${randomString}'
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the employment status table is decreased by '1' unit

    @HappyCases
    Scenario Outline: 04. Verify that it is possible to DELETE multiple existing employment status
        When User click the 'Add' button
        And User enter a new employment status name as '<name_1>'
        Then User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And User click the 'Add' button
        And User enter a new employment status name as '<name_2>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Get number of records found in employment status table
        And A user select checkbox with keys are '<name_1>,<name_2>'
        And User click the 'Delete Selected' button
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And The popup with the question 'Are you Sure?' is not displayed
        And User click the 'Delete Selected' button
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the employment status table is decreased by '2' unit

        Examples:
            | name_1                 | name_2                 | records | message              |
            | Name_1 ${randomString} | Name_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an employment status with a duplicate name.
        When User click the 'Add' button
        Then Verify the form title 'Add Employment Status' is displayed correctly
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And User click the 'Add' button
        And User enter the name of an existing employment status as '<name>'
        And Verify a error message 'Already exists' is shown under 'Name' field

        Examples:
            | name                 |
            | Name ${randomString} |

    @ErrorCases
    Scenario: 06. Verify the message error appears when adding the employment status with null value for name
        When User click the 'Add' button
        Then Verify the form title 'Add Employment Status' is displayed correctly
        And User click the 'Save' button
        And Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new employment status with '<name>'
        When User click the 'Add' button
        Then Verify the form title 'Add Employment Status' is displayed correctly
        And User enter a new employment status name as '<name>'
        And Verify a error message 'Should not exceed 50 characters' is shown under 'Name' field

        Examples:
            | name                                                                   |
            | Employment status name should not exceed 50 characters ${randomString} |