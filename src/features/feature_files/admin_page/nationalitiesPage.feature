@AP @AP15
Feature: As a Admin, I can manage nationalities information in Nationalities session

    Background:
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        When A user click 'Admin' item in main menu
        And A user click 'Nationalities' item in topbar menu
        Then Verify the main title 'Nationalities' is displayed correctly
        And A user is on '/web/index.php/admin/nationality' page
        And Verify the module page header is 'Admin'
        And Page title is 'OrangeHRM'
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify nationality added successfully
        When User click the 'Add' button
        Then Verify the main title 'Add Nationality' is displayed correctly
        And A user is on '/web/index.php/admin/saveNationality' page
        When User click the 'Cancel' button
        Then A user is on '/web/index.php/admin/nationality' page
        When User click the 'Add' button
        Then Verify the main title 'Add Nationality' is displayed correctly
        When A user type '<name>' nationality into 'Name' field
        And User click the 'Save' button
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name>' nationality is displayed in table
        And A user delete '<name>' nationality to clean environment

        Examples:
            | TC | name               | alertMessage       |
            | 01 | VN-${randomString} | Successfully Saved |

    @ErrorCases
    Scenario Outline: <TC>. Verify the input field error message appears when adding the nationality with empty name
        When User click the 'Add' button
        Then Verify the main title 'Add Nationality' is displayed correctly
        And A user is on '/web/index.php/admin/saveNationality' page
        And User click the 'Save' button
        Then Verify a error message '<errorMessage>' is shown under 'Name' field

        Examples:
            | TC | errorMessage |
            | 02 | Required     |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the duplicated name nationality
        When A user add new '<name>' nationality successfully
        When User click the 'Add' button
        Then Verify the main title 'Add Nationality' is displayed correctly
        And A user is on '/web/index.php/admin/saveNationality' page
        When A user type '<name>' nationality into 'Name' field
        Then Verify a error message '<errorMessage>' is shown under 'Name' field
        When User click the 'Cancel' button
        And A user delete '<name>' nationality to clean environment

        Examples:
            | TC | name               | errorMessage   |
            | 03 | VN-${randomString} | Already exists |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the invalid name nationality
        When User click the 'Add' button
        Then Verify the main title 'Add Nationality' is displayed correctly
        And A user is on '/web/index.php/admin/saveNationality' page
        And Generate '101' characters and set nationality for field 'Name'
        Then Verify a error message '<errorMessage>' is shown under 'Name' field

        Examples:
            | TC | errorMessage                     |
            | 04 | Should not exceed 100 characters |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete a nationality
        Given A user add new '<name>' nationality successfully
        When A user click delete action of '<name>' nationality
        And Verify the delete nationality pop-up appears
        And User click the 'No, Cancel' button on pop-up
        When A user click delete action of '<name>' nationality
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name>' nationality is not displayed in table

        Examples:
            | TC | name               | alertMessage         |
            | 05 | VN-${randomString} | Successfully Deleted |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete the multiple nationalitess
        Given A user add new '<name1>' nationality successfully
        And A user add new '<name2>' nationality successfully
        And A user select checkbox with nationalities '<name1>, <name2>'
        And A user click Delete Selected button and confirm to delete nationality records
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name1>' nationality is not displayed in table
        And Verify the '<name2>' nationality is not displayed in table

        Examples:
            | TC | name1               | name2               | alertMessage         |
            | 06 | VN1-${randomString} | VN2-${randomString} | Successfully Deleted |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can edit the nationality successfully
        When A user add new '<name>' nationality successfully
        And A user click edit action of '<name>' nationality
        Then Verify the main title 'Edit Nationality' is displayed correctly
        When User click the 'Cancel' button
        Then A user is on '/web/index.php/admin/nationality' page
        When A user click edit action of '<name>' nationality
        Then Verify the main title 'Edit Nationality' is displayed correctly
        And Verify the '<name>' nationality is displayed in 'Name' field
        And A user type '<updatedName>' nationality into 'Name' field
        And User click the 'Save' button
        Then Verify alert message is '<alertMessage>'
        And Verify the '<updatedName>' nationality is displayed in table
        And A user delete '<updatedName>' nationality to clean environment 

        Examples:
            | TC | name                | updatedName                 | alertMessage         |
            | 07 | VIP-${randomString} | VIP-UPDATED-${randomString} | Successfully Updated |