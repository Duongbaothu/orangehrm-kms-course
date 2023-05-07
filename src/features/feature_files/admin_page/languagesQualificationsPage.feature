@AP @AP13
Feature: As a Admin, I can manage languages information in Qualifications session

    Background: Open browser, login and navigate to languages page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Languages' item in topbar menu
        Then Verify the main title 'Languages' is displayed correctly
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can add new languages successfully
        When User click the 'Add' button
        Then Verify the main title 'Add Language' is displayed correctly
        When I type the text '<languageName>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<languageName>' is displayed in table after adding successfully
        When Delete the record '<languageName>' to clean environment
        And Verify '<languageName>' is not displayed in table after removing successfully

        Examples:
            | TC | languageName              |
            | 01 | Vietnamese${randomString} |
            | 02 | English${randomString}    |
            | 03 | Chinese${randomString}    |

    @HappyCases
    Scenario Outline: <TC>. Verify user can edit languages successfully
        When I add the language '<languageName>'
        Then Verify '<languageName>' is displayed in table after adding successfully
        When A user click edit a record with key is '<languageName>'
        Then Verify the main title 'Edit Language' is displayed correctly
        When I type the text '<languageNameEdited>' for field 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '<languageNameEdited>' is displayed in table after adding successfully
        When Delete the record '<languageNameEdited>' to clean environment
        Then Verify '<languageNameEdited>' is not displayed in table after removing successfully

        Examples:
            | TC | languageName           | languageNameEdited                       |
            | 04 | English${randomString} | English(Australia)${randomString}        |
            | 05 | Chinese${randomString} | Chinese (Mandarin-Taiwan)${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can choose muptiple languages to delete successfully
        When I add the language '<languageName1>'
        Then Verify '<languageName1>' is displayed in table after adding successfully
        When I add the language '<languageName2>'
        Then Verify '<languageName2>' is displayed in table after adding successfully
        When A user select checkbox with keys are '<languageName1>,<languageName2>'
        Then I verify button with name 'Delete Selected' is visible
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        And A user delete selected records
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record '<languageName1>,<languageName2>' from the table are deleted successfully

        Examples:
            | TC | languageName1         | languageName2         |
            | 06 | Arabic${randomString} | French${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete a language successfully
        When I add the language '<languageName>'
        Then Verify '<languageName>' is displayed in table after adding successfully
        When A user delete a record with key is '<languageName>'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        And A user delete a record with key is '<languageName>'
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record '<languageName>' from the table are deleted successfully

        Examples:
            | TC | languageName           |
            | 07 | Russian${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add exist language
        When I add the language '<languageName1>'
        Then Verify '<languageName1>' is displayed in table after adding successfully
        When User click the 'Add' button
        And I type the text '<languageName2>' for field 'Name'
        And User click the 'Save' button
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '<languageName1>' to clean environment
        Then Verify '<languageName1>' is not displayed in table after removing successfully

        Examples:
            | TC | languageName1          | languageName2          |
            | 08 | Spanish${randomString} | Spanish${randomString} |

    @ErrorCases
    Scenario Outline: 09. Verify user cannot leave empty language name
        When User click the 'Add' button
        Then Verify the main title 'Add Language' is displayed correctly
        When User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

    @ErrorCases
    Scenario Outline: 10. Verify user cannot add language exceed 120 charaters
        When User click the 'Add' button
        Then Verify the main title 'Add Language' is displayed correctly
        When Generate '121' characters and set for field 'Name'
        Then Verify a error message 'Should not exceed 120 characters' is shown under 'Name' field
