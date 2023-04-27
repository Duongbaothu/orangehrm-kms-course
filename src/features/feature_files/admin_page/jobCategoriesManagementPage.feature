@AP @AP05
Feature: As a Admin, I can manage Job Categories in Job session

    Background: Open browser, login and navigate to the Job Categories page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Categories' item in topbar menu
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: 01. Verify that it is possible to ADD a new Job Category
        When Get number of records found in table
        Then User click the 'Add' button
        And Verify that the header title is 'Add Job Category'
        And User enter a new Job Category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new Job Category '<job>' is visible in the table
        And Verify the total number of records found in the table is increased by '1' unit
        And Clean up job category '<job>' after adding

        Examples:
            | job                 |
            | Job ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a Job Category.
        When User click the 'Add' button
        Then Verify that the header title is 'Add Job Category'
        And User enter a new Job Category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new Job Category '<job>' is visible in the table
        And A user click edit a record with key is '<job>'
        And Verify that the header title is 'Edit Job Category'
        And User enter a new Job Category as '<jobUpdate>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Updated'
        And Verify that new Job Category '<jobUpdate>' is visible in the table
        And Clean up job category '<jobUpdate>' after adding

        Examples:
            | job                | jobUpdate                 | message            |
            | Job${randomString} | Job_update${randomString} | Successfully Saved |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing Job Category
        When User click the 'Add' button
        Then Verify that the header title is 'Add Job Category'
        And User enter a new Job Category as 'Job ${randomString}'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new Job Category 'Job ${randomString}' is visible in the table
        And Get number of records found in table
        And User click the delete icon of job category 'Job ${randomString}'
        And Verify the confirm pop-up appears
        And User click the 'No, Cancel' button on pop-up
        And Verify the confirm pop-up disappears
        And User click the delete icon of job category 'Job ${randomString}'
        And Verify the confirm pop-up appears
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the table is decreased by '1' unit

    @HappyCases
    Scenario Outline: 04. Verify that it is possible to DELETE multiple existing Job Category
        When User click the 'Add' button
        And User enter a new Job Category as '<job_1>'
        Then User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And User click the 'Add' button
        And User enter a new Job Category as '<job_2>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Get number of records found in table
        And A user select checkbox with keys are '<job_1>,<job_2>'
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
            | job_1                 | job_2                 | records | message              |
            | Job_1 ${randomString} | Job_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an Job Category with a duplicate name.
        When User click the 'Add' button
        Then Verify that the header title is 'Add Job Category'
        And User enter a new Job Category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new Job Category '<job>' is visible in the table
        And User click the 'Add' button
        And User enter the name of an existing Job Category as '<job>'
        And Verify that the label should be displayed as 'Already exists'

        Examples:
            | job                 |
            | Job ${randomString} |

    @ErrorCases
    Scenario Outline: 06. Verify the message error appears when adding the Job Category with null value for name
        When User click the 'Add' button
        Then Verify that the header title is 'Add Job Category'
        And User click the 'Save' button
        And Verify that the label should be displayed as 'Required'

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new Job Category with '<job>'
        When User click the 'Add' button
        Then Verify that the header title is 'Add Job Category'
        And User enter a new Job Category as '<job>'
        And Verify that the label should be displayed as 'Should not exceed 50 characters'

        Examples:
            | job                                                               |
            | Job Category name should not exceed 50 characters ${randomString} |