@E01 @AP02
Feature: As a admin, We can add, edit and delete a Job Title on the Job page

    Background: Open browser, login and navigate to the Job Titles page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Titles' item in topbar menu
        Then Verify the main title 'Job Titles' is displayed correctly
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify the job can be added to system successfully <note>
        Then User click the 'Add' button
        And Verify the main title '<addTitle>' is displayed correctly
        And Enter Job Title '<title>'
        And Enter Job Description '<description>'
        And Add the Note '<note>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify the Job Titles records with title '<title>' and '<description>' is added successfully
        And Delete the record '<title>' to clean environment
        Then Verify '<title>' is not displayed in table after removing successfully

        Examples:
            | TC | note                            | addTitle      | title                 | description                 |
            | 01 | with full data                  | Add Job Title | Title ${randomString} | Description ${randomString} |
            | 02 | with the option fields are null | Add Job Title | Title${randomString}  |                             |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error appears when adding the Job Title with null value for Job title
        When User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And User click the 'Save' button
        And Verify the error message of Job Title is 'Required'

        Examples:
            | TC | addTitle      |
            | 03 | Add Job Title |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the duplicated Job Title
        When Add the new Job with Title '<jobName>'
        Then Verify alert message is 'Successfully Saved'
        And Add the new Job with Title '<jobName>'
        And Verify the error message of Job Title is 'Already exists'

        Examples:
            | TC | jobTitle   | jobName              | button | msg            | addTitle      |
            | 04 | Job Titles | Title${randomString} | Add    | Already exists | Add Job Title |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete an existing Job Title
        When Add the new Job with Title '<title>'
        Then Verify alert message is 'Successfully Saved'
        And Verify '<title>' is displayed in table after adding successfully
        And A user delete a record with key is '<title>'
        Then The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And The popup with the question 'Are you Sure?' is not displayed
        And A user delete a record with key is '<title>'
        Then The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify '<title>' is not displayed in table after removing successfully

        Examples:
            | TC | title                |
            | 05 | Title${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete the multiple existing Job Title
        When Add the new Job with Title '<title1>'
        Then Verify alert message is 'Successfully Saved'
        Then Verify '<title1>' is displayed in table after adding successfully
        And Add the new Job with Title '<title2>'
        Then Verify alert message is 'Successfully Saved'
        Then Verify '<title2>' is displayed in table after adding successfully
        And A user select checkbox with keys are '<title1>,<title2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        And User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify '<title1>' is not displayed in table after removing successfully
        Then Verify '<title2>' is not displayed in table after removing successfully

        Examples:
            | TC | jobOption  | dropdown | title      | title1                 | title2                 |
            | 06 | Job Titles | Job      | Job Titles | Title_1${randomString} | Title_2${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can edit the Job Title successfully
        When Add the new Job with Title '<title>'
        Then Verify '<title>' is displayed in table after adding successfully
        And A user click edit a record with key is '<title>'
        And Verify the Job title '<title>' is displayed correctly
        And Edit Job Title to '<updatedTitle>'
        And Enter Job Description '<updatedDescription>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify the Job Titles records with title '<updatedTitle>' and '<updatedDescription>' is added successfully
        And Delete the record '<updatedTitle>' to clean environment
        Then Verify '<updatedTitle>' is not displayed in table after removing successfully

        Examples:
            | TC | title                | editTitle      | updatedTitle                | updatedDescription                |
            | 07 | Title${randomString} | Edit Job Title | Title_Update${randomString} | Description_Update${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error massage when adding the new job title with <note>
        When User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Generating '101' characters and set to 'Job Title' text box
        Then Verify the error message of Job Title is 'Should not exceed 100 characters'
        And Generating '401' characters and set to 'Job Description' text box
        Then Verify the error message of Job Description is 'Should not exceed 400 characters'
        And Generating '401' characters and set to 'Note' text box
        Then Verify the error message of Job Note is 'Should not exceed 400 characters'

        Examples:
            | TC | addTitle      |
            | 08 | Add Job Title |
