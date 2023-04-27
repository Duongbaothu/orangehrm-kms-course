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
        When Get number of records found in table
        Then User click the 'Add' button
        And Verify that the header title is 'Add Employment Status'
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And Verify the total number of records found in the table is increased by '1' unit
        And Clean up employment status name '<name>' after running

        Examples:
            | name                 |
            | Name ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a new employment status.
        When User click the 'Add' button
        Then Verify that the header title is 'Add Employment Status'
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And A user click edit a record with key is '<name>'
        And Verify that the header title is 'Edit Employment Status'
        And User enter a new employment status name as '<nameUpdate>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Updated'
        And Verify that new employment status '<nameUpdate>' is visible in the table
        And Clean up employment status name '<nameUpdate>' after running

        Examples:
            | name                 | nameUpdate                  |
            | Name ${randomString} | Name_update ${randomString} |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing employment status
        When User click the 'Add' button
        Then Verify that the header title is 'Add Employment Status'
        And User enter a new employment status name as 'Name ${randomString}'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status 'Name ${randomString}' is visible in the table
        And Get number of records found in table
        And User click the delete icon of employement status 'Name ${randomString}'
        And Verify the confirm pop-up appears
        And User click the 'No, Cancel' button on pop-up
        And Verify the confirm pop-up disappears
        And User click the delete icon of employement status 'Name ${randomString}'
        And Verify the confirm pop-up appears
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the table is decreased by '1' unit

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
        And Get number of records found in table
        And A user select checkbox with keys are '<name_1>,<name_2>'
        And User click the 'Delete Selected' button
        And Verify the confirm pop-up appears
        And User click the 'No, Cancel' button on pop-up
        And Verify the confirm pop-up disappears
        And User click the 'Delete Selected' button
        And Verify the confirm pop-up appears
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the table is decreased by '2' unit

        Examples:
            | name_1                 | name_2                 | records | message              |
            | Name_1 ${randomString} | Name_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an employment status with a duplicate name.
        When User click the 'Add' button
        Then Verify that the header title is 'Add Employment Status'
        And User enter a new employment status name as '<name>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new employment status '<name>' is visible in the table
        And User click the 'Add' button
        And User enter the name of an existing employment status as '<name>'
        And Verify that the label should be displayed as 'Already exists'

        Examples:
            | name                 |
            | Name ${randomString} |

    @ErrorCases
    Scenario: 06. Verify the message error appears when adding the employment status with null value for name
        When User click the 'Add' button
        Then Verify that the header title is 'Add Employment Status'
        And User click the 'Save' button
        And Verify that the label should be displayed as 'Required'

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new employment status with '<name>'
        When User click the 'Add' button
        Then Verify that the header title is 'Add Employment Status'
        And User enter a new employment status name as '<name>'
        And Verify that the label should be displayed as 'Should not exceed 50 characters'

        Examples:
            | name                                                                   |
            | Employment status name should not exceed 50 characters ${randomString} |