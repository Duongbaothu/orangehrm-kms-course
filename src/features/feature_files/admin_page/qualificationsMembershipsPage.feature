@AP @AP14
Feature: As a Admin, I can manage memberships information in Qualifications session

    Background:
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        When A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Memberships' item in topbar menu
        Then Verify the main title 'Memberships' of membership page is displayed
        And A user is on '/web/index.php/admin/membership' page
        And Verify the module page header is 'Admin'
        And Verify the level page header is 'Qualifications'
        And Page title is 'OrangeHRM'
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify memberships added successfully
        Given Get current total of membership records
        When User click the 'Add' button
        And Verify the main title 'Add Membership' of membership page is displayed
        And A user is on '/web/index.php/admin/saveMemberships' page
        And User click the 'Cancel' button
        Then Verify the form title 'Memberships' is displayed correctly
        And A user is on '/web/index.php/admin/membership' page
        And User click the 'Add' button
        And Verify the main title 'Add Membership' of membership page is displayed
        And A user type '<name>' membership into 'Name' field
        And User click the 'Save' button
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name>' membership is displayed in table
        And Verify the total of membership records increased by '1' unit
        And Delete the record '<name>' to clean environment

        Examples:
            | TC | name                | alertMessage       |
            | 01 | VIP-${randomString} | Successfully Saved |

    @ErrorCases
    Scenario Outline: <TC>. Verify the input field error message appears when adding the membership with empty name
        When User click the 'Add' button
        And Verify the main title 'Add Membership' of membership page is displayed
        And A user is on '/web/index.php/admin/saveMemberships' page
        And User click the 'Save' button
        Then Verify a error message '<errorMessage>' is shown under 'Name' field

        Examples:
            | TC | errorMessage |
            | 02 | Required     |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the duplicated name memberships
        And A user add new '<name>' membership successfully
        And User click the 'Add' button
        And Verify the main title 'Add Membership' of membership page is displayed
        And A user is on '/web/index.php/admin/saveMemberships' page
        And A user type '<name>' membership into 'Name' field
        Then Verify a error message '<errorMessage>' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '<name>' to clean environment

        Examples:
            | TC | name                | errorMessage   |
            | 03 | VIP-${randomString} | Already exists |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the invalid name memberships
        When User click the 'Add' button
        And Verify the main title 'Add Membership' of membership page is displayed
        And A user is on '/web/index.php/admin/saveMemberships' page
        And Generate '51' characters and set for field 'Name'
        Then Verify a error message '<errorMessage>' is shown under 'Name' field

        Examples:
            | TC | errorMessage                    |
            | 04 | Should not exceed 50 characters |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete a membership
        Given A user add new '<name>' membership successfully
        And Get current total of membership records
        When A user click delete action of '<name>' membership
        And Verify the delete memebership pop-up appears
        And User click the 'No, Cancel' button on pop-up
        When A user click delete action of '<name>' membership
        And  User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name>' membership is not displayed in table
        And Verify the total of membership records decreased by '1' unit

        Examples:
            | TC | name                  | alertMessage         |
            | 05 | VIP-D-${randomString} | Successfully Deleted |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete the multiple memberships
        Given A user add new '<name1>' membership successfully
        And A user add new '<name2>' membership successfully
        And Get current total of membership records
        And A user select checkbox with memberships '<name1>, <name2>'
        And A user click Delete Selected button and confirm to delete membership records
        Then Verify alert message is '<alertMessage>'
        And Verify the '<name1>' membership is not displayed in table
        And Verify the '<name2>' membership is not displayed in table
        And Verify the total of membership records decreased by '2' unit

        Examples:
            | TC | name1                  | name2                  | alertMessage         |
            | 06 | VIP-${randomString}-D1 | VIP-${randomString}-D2 | Successfully Deleted |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can edit the membership successfully
        When A user add new '<name>' membership successfully
        And A user click edit action of '<name>' membership
        Then Verify the main title 'Edit Membership' of membership page is displayed
        When User click the 'Cancel' button
        Then A user is on '/web/index.php/admin/membership' page
        When A user click edit action of '<name>' membership
        And Verify the '<name>' membership is displayed in 'Name' field
        And A user type '<updatedName>' membership into 'Name' field
        And User click the 'Save' button
        Then Verify alert message is '<alertMessage>'
        And Verify the '<updatedName>' membership is displayed in table
        And Delete the record '<updatedName>' to clean environment

        Examples:
            | TC | name                | updatedName           | alertMessage         |
            | 07 | VIP-${randomString} | VIP-U-${randomString} | Successfully Updated |