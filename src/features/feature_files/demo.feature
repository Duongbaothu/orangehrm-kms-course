@CM @CM01
Feature: Demo for common functions

    Background: Open browser and navigate to the OrangeHRM page
        Given A user visits OrangeHRM page

    Scenario: Example for common function
        And A user logged in by admin role
        Then A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Job Titles' item in topbar menu
        And An user click button 'Add'
        And A user click 'User Management' dropdown and choose 'Users' item in topbar menu
        Then Verify the module page header is 'Admin'
        Then Verify the level page header is 'User Management'
        When A user select option 'Admin' in dropdown 'User Role'
        And A user type a hint 'Boss' in field 'Employee Name' to search and then select option 'Boss A' in the dropdown list
        When A user select option 'Enabled' in dropdown 'Status'
        And A user click 'Nationalities' item in topbar menu
