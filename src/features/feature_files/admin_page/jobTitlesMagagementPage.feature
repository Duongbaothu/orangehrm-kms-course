@E01 @AP02
Feature: As a admin, We can add, edit and delete a Job Title on the Job page

    Background: Open browser, login and navigate to the Job Titles page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And Navigate to '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Titles' item in topbar menu
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: <TC>. Verify the job can be added to system successfully <note>
        When Get number of records found
        Then Select the 'Add' button
        And Verify the form title '<addTitle>' displayed correctly
        And Enter Job Title '<title>'
        And Enter Job Description '<description>'
        And A user upload file 'src/features/data/jobs/job01.pdf'
        And Add the Note '<note>'
        And Select the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify the Job Titles records with title '<title>' and '<description>' is added successfully
        And Verify the total number of records found in the table increased by '1' unit
        And Clean up Job Title '<title>' after running

        Examples:
            | TC | note                            | addTitle      | title                 | description                 |
            | 01 | with full data                  | Add Job Title | Title ${randomString} | Description ${randomString} |
            | 02 | with the option fields are null | Add Job Title | Title${randomString}  |                             |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error appears when adding the Job Title with null value for Job title
        When Select the 'Add' button
        Then Verify the form title '<addTitle>' displayed correctly
        And Select the 'Save' button
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
        And Verify the Job Titles records '<title>' is added successfully
        And Get number of records found
        And Select the trash icon of Job Title '<title>'
        Then Verify the delete pop-up appears
        And Click the 'No, Cancel' on delete pop-up
        And Verify the delete pop-up disappears
        And Select the trash icon of Job Title '<title>'
        Then Verify the delete pop-up appears
        And Click the 'Yes, Delete' on delete pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the Job Titles records '<title>' is removed successfully
        And Verify the total number of records found in the table decreased by '1' unit

        Examples:
            | TC | title                |
            | 05 | Title${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete the multiple existing Job Title
        When Add the new Job with Title '<title1>'
        Then Verify alert message is 'Successfully Saved'
        And Add the new Job with Title '<title2>'
        Then Verify alert message is 'Successfully Saved'
        And Get number of records found
        And A user select checkbox with keys are '<title1>'
        And A user select checkbox with keys are '<title2>'
        And Select the 'Delete Selected' button
        Then Verify the delete pop-up appears
        And Click the 'No, Cancel' on delete pop-up
        Then Verify the delete pop-up disappears
        And Select the 'Delete Selected' button
        Then Verify the delete pop-up appears
        And Click the 'Yes, Delete' on delete pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the Job Titles records '<title1>' is removed successfully
        And Verify the Job Titles records '<title2>' is removed successfully
        And Verify the total number of records found in the table decreased by '2' unit

        Examples:
            | TC | jobOption  | dropdown | title      | title1                 | title2                 |
            | 06 | Job Titles | Job      | Job Titles | Title_1${randomString} | Title_2${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can edit the Job Title successfully
        When Add the new Job with Title '<title>'
        And Verify the Job Titles records '<title>' is added successfully
        And Select the edit icon of Job Title '<title>'
        And Verify the Job title '<title>' displayed correctly
        And Edit Job Title to '<updatedTitle>'
        And Enter Job Description '<updatedDescription>'
        And Select the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify the Job Titles records with title '<updatedTitle>' and '<updatedDescription>' is added successfully
        And Clean up Job Title '<updatedTitle>' after running

        Examples:
            | TC | title                | editTitle      | updatedTitle                | updatedDescription                |
            | 07 | Title${randomString} | Edit Job Title | Title_Update${randomString} | Description_Update${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error massage when adding the new job title with <note>
        When Select the 'Add' button
        Then Verify the form title '<addTitle>' displayed correctly
        And Generating '101' characters and set to 'Job Title' text box
        Then Verify the error message of Job Title is 'Should not exceed 100 characters'
        And Generating '401' characters and set to 'Job Description' text box
        Then Verify the error message of Job Description is 'Should not exceed 400 characters'
        And Generating '401' characters and set to 'Note' text box
        Then Verify the error message of Job Note is 'Should not exceed 400 characters'

        Examples:
            | TC | addTitle      |
            | 08 | Add Job Title |
