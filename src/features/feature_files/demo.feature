@commons
Feature: Demo for common functions

    Background: Open browser and navigate to the specific page
        Given A user visits '' page

    @common_01
    Scenario: Example for common function
        And A user logged in by admin role
        Then A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Titles' item in topbar menu
        And A user upload file 'src/features/data/jobs/job01.pdf'
        And A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        Then Verify the module page header is 'Admin'
        Then Verify the level page header is 'User Management'
        When A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        When A user select option 'Enabled' in dropdown 'Status'
        Then Verify number of records found        
        And A user click 'Nationalities' item in topbar menu
        Then Verify this page has pagination
        Then Verify the paginated page number is '4'
        When A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        Then read csv data file from 'src/features/data/users/users.csv'
        # Then Add an user with 'Admin' 'Boss' 'Enabled' 'user123' 'QWRtaW4xMjM0IQ=='
        # Then Add multiple users from CSV file 'src/features/data/users/users.csv'
        # When A user delete a record with key is 'user001'
        # Then Verify alert message is 'Successfully Deleted'
        # When A user click edit a record with key is 'user123'
        # Then A user is on '/web/index.php/admin/saveSystemUser/13' page        
        # And A user select checkbox with keys are 'user123'
        # And A user select checkbox with keys are 'all'
        # And A user select checkbox with keys are 'user456, user789, user012'
        # And A user delete selected records
        # Then Verify alert message is 'Successfully Deleted'        
        # Then Get all texts in record with keys are 'admin'
