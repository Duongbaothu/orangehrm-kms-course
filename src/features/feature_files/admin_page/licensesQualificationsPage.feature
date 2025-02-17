@AP @AP12
Feature: As a Admin, I can manage licenses information in Qualifications session

    Background: Open browser, login and navigate to licenses page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Licenses' item in topbar menu
        Then Verify the main title 'Licenses' is displayed correctly
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can add new licenses successfully
        When User click the 'Add' button
        Then Verify the main title 'Add License' is displayed correctly
        When I type text '<licenseName>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<licenseName>' is displayed in table after adding successfully
        When Delete the record '<licenseName>' to clean environment
        And Verify '<licenseName>' is not displayed in table after removing successfully

        Examples:
            | TC | licenseName                                             |
            | 01 | Certified Digital Marketing Professional${randomString} |
            | 02 | Certified Information Security Manager${randomString}   |
            | 03 | Cisco Certified Network Associate${randomString}        |
            | 04 | Cisco Certified Network Professional${randomString}     |
            | 05 | Microsoft Certified Systems Engineer${randomString}     |

    @HappyCases
    Scenario Outline: <TC>. Verify user can edit licenses successfully
        When I add the license '<licenseName>'
        And Verify '<licenseName>' is displayed in table after adding successfully
        When A user click edit a record with key is '<licenseName>'
        Then Verify the main title 'Edit License' is displayed correctly
        When I type text '<licenseNameEdited>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '<licenseNameEdited>' is displayed in table after adding successfully
        When Delete the record '<licenseNameEdited>' to clean environment
        Then Verify '<licenseNameEdited>' is not displayed in table after removing successfully

        Examples:
            | TC | licenseName                                             | licenseNameEdited                                              |
            | 06 | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional (CDMP)${randomString} |
            | 07 | Certified Information Security Manager${randomString}   | Certified Information Security Manager (CISM)${randomString}   |

    @HappyCases
    Scenario Outline: <TC>. Verify user can choose muptiple licenses to delete successfully
        When I add the license '<licenseName1>'
        Then Verify '<licenseName1>' is displayed in table after adding successfully
        When I add the license '<licenseName2>'
        Then Verify '<licenseName2>' is displayed in table after adding successfully
        When A user select checkbox with keys are '<licenseName1>,<licenseName2>'
        Then I verify button with value 'Delete Selected' is visible
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        And A user delete selected records
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record '<licenseName1>,<licenseName2>' from the list are deleted successfully

        Examples:
            | TC | licenseName1                                                   | licenseName2                                                 |
            | 08 | Certified Digital Marketing Professional (CDMP)${randomString} | Certified Information Security Manager (CISM)${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete a license successfully
        When I add the license '<licenseName>'
        And Verify '<licenseName>' is displayed in table after adding successfully
        When A user delete a record with key is '<licenseName>'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        And A user delete a record with key is '<licenseName>'
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record '<licenseName>' from the list are deleted successfully

        Examples:
            | TC | licenseName                                                    |
            | 09 | Certified Digital Marketing Professional (CDMP)${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add exist license
        When I add the license '<licenseName1>'
        Then Verify '<licenseName1>' is displayed in table after adding successfully
        When User click the 'Add' button
        Then Verify the main title 'Add License' is displayed correctly
        When I type text '<licenseName2>' for field 'Name'
        And User click the 'Save' button
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '<licenseName1>' to clean environment
        Then Verify the record '<licenseName>' from the list are deleted successfully

        Examples:
            | TC | licenseName1                                            | licenseName2                                            |
            | 10 | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional${randomString} |

    @ErrorCases
    Scenario Outline: 11. Verify user cannot leave empty license name
        When User click the 'Add' button
        Then Verify the main title 'Add License' is displayed correctly
        When User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add licenses exceed 100 charaters
        When User click the 'Add' button
        Then Verify the main title 'Add License' is displayed correctly
        When I type text '<licenseName>' for field 'Name'
        Then Verify a error message 'Should not exceed 100 characters' is shown under 'Name' field

        Examples:
            | TC | licenseName                                                                                               |
            | 12 | Certified Digital Marketing Professional from Macquarie University valid from the date you have graduated |
