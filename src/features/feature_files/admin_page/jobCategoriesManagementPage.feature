@AP @AP05
Feature: As a Admin, I can manage Job Categories in Job session

    Background: Open browser, login and navigate to the Job Categories page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Categories' item in topbar menu
        Then Verify the main title 'Job Categories' is displayed correctly
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: 01. Verify that it is possible to ADD a new Job Category
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User enter a new job category as '<job>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<job>' is displayed in table after adding successfully
        When Delete the record '<job>' to clean environment
        And Verify '<job>' is not displayed in table after removing successfully

        Examples:
            | job                 |
            | Job ${randomString} |

    @HappyCases
    Scenario Outline: 02. Verify that it is possible to EDIT a Job Category.
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User enter a new job category as '<job>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<job>' is displayed in table after adding successfully
        When A user click edit a record with key is '<job>'
        Then Verify the main title 'Edit Job Category' is displayed correctly
        When User enter a new job category as '<jobUpdate>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '<jobUpdate>' is displayed in table after adding successfully
        When Delete the record '<jobUpdate>' to clean environment
        Then Verify '<jobUpdate>' is not displayed in table after removing successfully

        Examples:
            | job                | jobUpdate                 | message            |
            | Job${randomString} | Job_update${randomString} | Successfully Saved |

    @HappyCases
    Scenario: 03. Verify that it is possible to DELETE an existing Job Category
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User enter a new job category as 'Job ${randomString}'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify 'Job ${randomString}' is displayed in table after adding successfully
        When A user delete a record with key is 'Job ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When A user delete a record with key is 'Job ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify 'Job ${randomString}' is not displayed in table after removing successfully

    @HappyCases
    Scenario Outline: 04. Verify that it is possible to DELETE multiple existing Job Category
        When User click the 'Add' button
        And User enter a new job category as '<job_1>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<job_1>' is displayed in table after adding successfully
        When User click the 'Add' button
        And User enter a new job category as '<job_2>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<job_2>' is displayed in table after adding successfully
        When A user select checkbox with keys are '<job_1>,<job_2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<job_1>' is not displayed in table after removing successfully
        And Verify '<job_2>' is not displayed in table after removing successfully

        Examples:
            | job_1                 | job_2                 | records | message              |
            | Job_1 ${randomString} | Job_2 ${randomString} | 2       | Successfully Deleted |

    @ErrorCases
    Scenario Outline: 05. Verify that it is not possible to ADD an Job Category with a duplicate name.
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User enter a new job category as '<job>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<job>' is displayed in table after adding successfully
        When User click the 'Add' button
        And User enter the name of an existing job category as '<job>'
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '<job>' to clean environment
        Then Verify '<job>' is not displayed in table after removing successfully

        Examples:
            | job                 |
            | Job ${randomString} |

    @ErrorCases
    Scenario Outline: 06. Verify the message error appears when adding the Job Category with null value for name
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 07. Verify the error massage when adding the new Job Category with '<job>'
        When User click the 'Add' button
        Then Verify the main title 'Add Job Category' is displayed correctly
        When User enter a new job category as '<job>'
        Then Verify a error message 'Should not exceed 50 characters' is shown under 'Name' field

        Examples:
            | job                                                               |
            | Job Category name should not exceed 50 characters ${randomString} |