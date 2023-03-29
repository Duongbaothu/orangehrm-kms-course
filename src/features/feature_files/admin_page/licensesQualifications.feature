@AP @AP12
Feature: As a Admin, I can manage licenses information in Qualifications session

    Background: Open browser, login and navigate to licenses page
        Given a user visits 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewLicenses'
        Then page title is 'OrangeHRM'
        And verify the header title is 'Licenses'
        And get number of records found
        And set:
            | randomString                       |
            | ${moment().format("YYMMDDHHmmss")} |

    Scenario Outline: HappyCase - <TC>: Verify user can add new licenses successfully
        When I click button with name 'Add' in page
        Then I verify the header title is 'Add License'
        When I type text '<licenseName>' for field 'Name'
        And I click button with name 'Save' in page
        Then I verify the message with 'Successfully Saved' is presented
        And I verify the total number of records found in the table increased by 1 unit
        And I verify the license with '<licenseName>' is shown in the table
        And I delete the record to clean environment

        Examples:
            | TC | licenseName                                             |
            | 01 | Certified Digital Marketing Professional${randomString} |
            | 02 | Certified Information Security Manager${randomString}   |
            | 03 | Cisco Certified Network Associate${randomString}        |
            | 04 | Cisco Certified Network Professional${randomString}     |
            | 05 | Microsoft Certified Systems Engineer${randomString}     |

    Scenario Outline: HappyCase - <TC>: Verify user can edit licenses successfully
        When I add the license '<licenseName>'
        Then I verify the license with '<licenseName>' is shown in the table
        When I click button 'edit' in the row equal to the '<number>'
        Then I verify the header title is 'Edit License'
        When I type text '<licenseNameEdited>'  for field 'Name'
        And I click button with name 'Save' in page
        Then I verify the message with 'Successfully Updated' is presented
        And I verify the education with '<licenseNameEdited>' is shown in the table
        And I delete the record to clean environment

        Examples:
            | TC | number | licenseName                                             | licenseNameEdited                                              |
            | 06 | 2      | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional (CDMP)${randomString} |
            | 07 | 3      | Certified Information Security Manager${randomString}   | Certified Information Security Manager (CISM)${randomString}   |

    Scenario Outline: HappyCase - <TC>: Verify user can choose muptiple licenses to delete successfully
        When I add the license '<licenseName1>'
        And I add the license '<licenseName2>'
        Then I verify the license with '<licenseName1>' is shown in the table
        Then I verify the license with '<licenseName2>' is shown in the table
        And I click on the checkbox in the row equal to the '<number1>'
        And I click on the checkbox in the row equal to the '<number2>'
        Then I verify button with value 'Delete Selected' is visible
        And I click button with name 'Delete Selected' in page
        And The popup with the question 'Are you Sure?' is presented
        And I click button with name 'Yes, Delete' in page
        And I verify the message with 'Successfully Deleted' is presented
        And Verify the record 'licenseName1' and 'licenseName2' from the list are deleted successfully

        Examples:
            | TC | licenseName1                                                   | licenseName2                                                 | number1 | number2 |
            | 08 | Certified Digital Marketing Professional (CDMP)${randomString} | Certified Information Security Manager (CISM)${randomString} | 2       | 4       |

    Scenario Outline: HappyCase - <TC>: Verify user can delete a license successfully
        When I add the license '<licenseName>'
        Then I verify the license with '<licenseName>' is shown in the table
        When I click button 'delete' in the row equal to the '<Number>'
        And The popup with the question 'Are you Sure?' is presented
        Then I click button with name 'Yes, Delete' in page
        And I verify the message with 'Successfully Deleted' is presented
        And I verify the record with title '<licenseName>' is deleted successfully

        Examples:
            | TC | licenseName                                                    | Number |
            | 09 | Certified Digital Marketing Professional (CDMP)${randomString} | 2      |

    Scenario Outline: UnHappyCase - <TC>: Verify user cannot add exist license
        When I add the license '<licenseName1>'
        Then I verify the license with '<licenseName1>' is shown in the table
        When I click button with name 'Add' in page
        And I type text '<licenseName2>' for field 'Name'
        And I click button with name 'Save' in page
        Then I verify the error message 'Already exists' is shown under 'Name' field

        Examples:
            | TC | licenseName1                                            | licenseName2                                            |
            | 01 | Certified Digital Marketing Professional${randomString} | Certified Digital Marketing Professional${randomString} |

    Scenario: UnHappyCase - 02: Verify user cannot leave empty education name
        When I click button with name 'Add' in page
        And Click button with name 'Save' in page
        Then Verify the error message 'Required' is shown under 'Name' field