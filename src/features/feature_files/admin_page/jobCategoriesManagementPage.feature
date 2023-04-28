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
        When Get number of records found in job categories table
        Then User click the 'Add' button
        And Verify the form title 'Add Job Category' is displayed correctly
        And User enter a new job category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new job category '<job>' is visible in the table
        And Verify the total number of records found in the job categories table is increased by '1' unit
        And Delete the record '<job>' to clean environment

        Examples:
            | job                 |
            | Job ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a Job Category.
        When User click the 'Add' button
        Then Verify the form title 'Add Job Category' is displayed correctly
        And User enter a new job category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new job category '<job>' is visible in the table
        And A user click edit a record with key is '<job>'
        And Verify the form title 'Edit Job Category' is displayed correctly
        And User enter a new job category as '<jobUpdate>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Updated'
        And Verify that new job category '<jobUpdate>' is visible in the table
        And Delete the record '<jobUpdate>' to clean environment

        Examples:
            | job                | jobUpdate                 | message            |
            | Job${randomString} | Job_update${randomString} | Successfully Saved |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing Job Category
        When User click the 'Add' button
        Then Verify the form title 'Add Job Category' is displayed correctly
        And User enter a new job category as 'Job ${randomString}'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new job category 'Job ${randomString}' is visible in the table
        And Get number of records found in job categories table
        And A user delete a record with key is 'Job ${randomString}'
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And The popup with the question 'Are you Sure?' is not displayed
        And A user delete a record with key is 'Job ${randomString}'
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the job categories table is decreased by '1' unit

    @HappyCases
    Scenario Outline: 04. Verify that it is possible to DELETE multiple existing Job Category
        When User click the 'Add' button
        And User enter a new job category as '<job_1>'
        Then User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And User click the 'Add' button
        And User enter a new job category as '<job_2>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Get number of records found in job categories table
        And A user select checkbox with keys are '<job_1>,<job_2>'
        And User click the 'Delete Selected' button
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And The popup with the question 'Are you Sure?' is not displayed
        And User click the 'Delete Selected' button
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        And Verify alert message is 'Successfully Deleted'
        And Verify the total number of records found in the job categories table is decreased by '2' unit

        Examples:
            | job_1                 | job_2                 | records | message              |
            | Job_1 ${randomString} | Job_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an Job Category with a duplicate name.
        When User click the 'Add' button
        Then Verify the form title 'Add Job Category' is displayed correctly
        And User enter a new job category as '<job>'
        And User click the 'Save' button
        And Verify alert message is 'Successfully Saved'
        And Verify that new job category '<job>' is visible in the table
        And User click the 'Add' button
        And User enter the name of an existing job category as '<job>'
        And Verify a error message 'Already exists' is shown under 'Name' field

        Examples:
            | job                 |
            | Job ${randomString} |

    @ErrorCases
    Scenario Outline: 06. Verify the message error appears when adding the Job Category with null value for name
        When User click the 'Add' button
        Then Verify the form title 'Add Job Category' is displayed correctly
        And User click the 'Save' button
        And Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new Job Category with '<job>'
        When User click the 'Add' button
        Then Verify the form title 'Add Job Category' is displayed correctly
        And User enter a new job category as '<job>'
        And Verify a error message 'Should not exceed 50 characters' is shown under 'Name' field

        Examples:
            | job                                                               |
            | Job Category name should not exceed 50 characters ${randomString} |