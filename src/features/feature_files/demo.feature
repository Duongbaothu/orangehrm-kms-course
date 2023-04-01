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
        And A user click 'Nationalities' item in topbar menu
        And A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        Then Verify the module page header is 'Admin'
        Then Verify the level page header is 'User Management'
        When A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        When A user select option 'Enabled' in dropdown 'Status'
        # Then Verify number of records found
        # When A user delete a record with key is 'ess_user2'
        # Then Verify alert message is 'Successfully Deleted'
        # When A user click edit a record with key is 'ess_user1'
        # Then A user is on '/web/index.php/admin/saveSystemUser/13' page
        # When A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        # And A user select checkbox with keys are 'ess_user1'
        # And A user select checkbox with keys are 'all'
        # And A user select checkbox with keys are 'ess_user1, ess_user3, ess_user2'
        # And A user delete selected records
        # Then Verify alert message is 'Successfully Deleted'
        # Then read csv data file from 'src/features/data/users.csv'
        # Then Get all texts in record with keys are 'ess_user2'
