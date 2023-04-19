@AP @AP12
Feature: As a Admin, I can manage licenses information in Qualifications session

    Background: Open browser, login and navigate to licenses page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Licenses' item in topbar menu
        And Page title is 'OrangeHRM'
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can add new licenses successfully
        Given get number of records found
        When I click button with name 'Add' in page
        Then Main title is 'Add License'
        When I type text '<licenseName>' for field 'Name'
        And I click button with name 'Save' in page
        Then Verify alert message is 'Successfully Saved'
        And I verify the total number of records found in the table increased by '1' unit
        And I verify the license with '<licenseName>' is shown in the table
        And I delete the record '<licenseName>' to clean environment

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
        Then I verify the license with '<licenseName>' is shown in the table
        When A user click edit a record with key is '<licenseName>'
        Then Main title is 'Edit License'
        When I type text '<licenseNameEdited>' for field 'Name'
        And I click button with name 'Save' in page
        Then Verify alert message is 'Successfully Updated'
        And I verify the license with '<licenseNameEdited>' is shown in the table
        And I delete the record '<licenseNameEdited>' to clean environment

        Examples:
            | TC | licenseName                                             | licenseNameEdited                                              |
            | 06 | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional (CDMP)${randomString} |
            | 07 | Certified Information Security Manager${randomString}   | Certified Information Security Manager (CISM)${randomString}   |

    @HappyCases
    Scenario Outline: <TC>. Verify user can choose muptiple licenses to delete successfully
        When I add the license '<licenseName1>'
        And I add the license '<licenseName2>'
        Then I verify the license with '<licenseName1>' is shown in the table
        Then I verify the license with '<licenseName2>' is shown in the table
        And get number of records found
        When A user select checkbox with keys are '<licenseName1>, <licenseName2>'
        Then I verify button with value 'Delete Selected' is visible
        And I click button with name 'Delete Selected' in page
        And The popup with the question 'Are you Sure?' is presented
        And I click button with name 'No, Cancel' in page
        And A user delete selected records
        Then Verify alert message is 'Successfully Deleted'
        And I verify the number of records decrease by '2'
        And Verify the record '<licenseName1>, <licenseName2>' from the list are deleted successfully

        Examples:
            | TC | licenseName1                                                   | licenseName2                                                 |
            | 08 | Certified Digital Marketing Professional (CDMP)${randomString} | Certified Information Security Manager (CISM)${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete a license successfully
        When I add the license '<licenseName>'
        Then I verify the license with '<licenseName>' is shown in the table
        And get number of records found
        When A user delete a record by trash button with key is '<licenseName>'
        And The popup with the question 'Are you Sure?' is presented
        And I click button with name 'No, Cancel' in page
        And A user delete a record by trash button with key is '<licenseName>'
        And I click button with name 'Yes, Delete' in page
        Then Verify alert message is 'Successfully Deleted'
        And I verify the number of records decrease by '1'
        And Verify the record '<licenseName>' from the list are deleted successfully

        Examples:
            | TC | licenseName                                                    |
            | 09 | Certified Digital Marketing Professional (CDMP)${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add exist license
        When I add the license '<licenseName1>'
        Then I verify the license with '<licenseName1>' is shown in the table
        When I click button with name 'Add' in page
        And I type text '<licenseName2>' for field 'Name'
        And I click button with name 'Save' in page
        Then I verify the error message 'Already exists' is shown under 'Name' field
        And I click button with name 'Cancel' in page
        And I delete the record '<licenseName1>' to clean environment

        Examples:
            | TC | licenseName1                                            | licenseName2                                            |
            | 10 | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional${randomString} |

    @ErrorCases
    Scenario Outline: 11. Verify user cannot leave empty license name
        When I click button with name 'Add' in page
        And I click button with name 'Save' in page
        Then I verify the error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add licenses exceed 100 charaters
        When I click button with name 'Add' in page
        Then Main title is 'Add License'
        When I type text '<licenseName>' for field 'Name'
        Then I verify the error message 'Should not exceed 100 characters' is shown under 'Name' field

        Examples:
            | TC | licenseName                                                                                               |
            | 12 | Certified Digital Marketing Professional from Macquarie University valid from the date you have graduated |
