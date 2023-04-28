@AP @AP13
Feature: As a Admin, I can manage languages information in Qualifications session

    Background: Open browser, login and navigate to languages page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Languages' item in topbar menu
        And Page title is 'OrangeHRM'
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can add new languages successfully
        Given Get number of records found in the language table
        When User click the 'Add' button
        Then Verify the form title 'Add Language' is displayed correctly
        When I type the text '<languageName>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And I verify the total number of records founded in the language table increased by '1' unit
        And I verify the language with '<languageName>' is shown in the table
        And Delete the record '<languageName>' to clean environment

        Examples:
            | TC | languageName              |
            | 01 | Vietnamese${randomString} |
            | 02 | English${randomString}    |
            | 03 | Chinese${randomString}    |

    @HappyCases
    Scenario Outline: <TC>. Verify user can edit languages successfully
        When I add the language '<languageName>'
        Then I verify the language with '<languageName>' is shown in the table
        When A user click edit a record with key is '<languageName>'
        Then Verify the form title 'Edit Language' is displayed correctly
        When I type the text '<languageNameEdited>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And I verify the language with '<languageNameEdited>' is shown in the table
        And Delete the record '<languageNameEdited>' to clean environment

        Examples:
            | TC | languageName           | languageNameEdited                       |
            | 04 | English${randomString} | English(Australia)${randomString}        |
            | 05 | Chinese${randomString} | Chinese (Mandarin-Taiwan)${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can choose muptiple languages to delete successfully
        When I add the language '<languageName1>'
        And I add the language '<languageName2>'
        Then I verify the language with '<languageName1>' is shown in the table
        And I verify the language with '<languageName2>' is shown in the table
        And Get number of records found in the language table
        When A user select checkbox with keys are '<languageName1>,<languageName2>'
        Then I verify button with name 'Delete Selected' is visible
        And User click the 'Delete Selected' button
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And A user delete selected records
        Then Verify alert message is 'Successfully Deleted'
        And I verify the total number of records founded in the language table decreased by '2' unit
        And Verify the record '<languageName1>,<languageName2>' from the table are deleted successfully

        Examples:
            | TC | languageName1         | languageName2         |
            | 06 | Arabic${randomString} | French${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete a language successfully
        When I add the language '<languageName>'
        Then I verify the language with '<languageName>' is shown in the table
        And Get number of records found in the language table
        When A user delete a record with key is '<languageName>'
        And The popup with the question 'Are you Sure?' is displayed
        And User click the 'No, Cancel' button on pop-up
        And A user delete a record with key is '<languageName>'
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And I verify the total number of records founded in the language table decreased by '1' unit
        And Verify the record '<languageName>' from the table are deleted successfully

        Examples:
            | TC | languageName           |
            | 07 | Russian${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add exist language
        When I add the language '<languageName1>'
        Then I verify the language with '<languageName1>' is shown in the table
        When User click the 'Add' button
        And I type the text '<languageName2>' for field 'Name'
        And User click the 'Save' button
        Then Verify a error message 'Already exists' is shown under 'Name' field
        And User click the 'Cancel' button
        And Delete the record '<languageName1>' to clean environment

        Examples:
            | TC | languageName1          | languageName2          |
            | 08 | Spanish${randomString} | Spanish${randomString} |

    @ErrorCases
    Scenario Outline: 09. Verify user cannot leave empty language name
        When User click the 'Add' button
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 10. Verify user cannot add language exceed 120 charaters
        When User click the 'Add' button
        Then Verify the form title 'Add Language' is displayed correctly
        When Generate '121' characters and set for field 'Name'
        Then Verify a error message 'Should not exceed 120 characters' is shown under 'Name' field
