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
        Given get number of records found in page
        When I click button with name is 'Add' in page
        Then The main title is 'Add Language'
        When I type the text '<languageName>' for field 'Name'
        And I click button with name is 'Save' in page
        Then Verify alert message is 'Successfully Saved'
        And I verify the total number of records founded in the table increased by '1' unit
        And I verify the language with '<languageName>' is shown in the table
        And I delete the record '<languageName>' added to clean environment

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
        Then The main title is 'Edit Language'
        When I type the text '<languageNameEdited>' for field 'Name'
        And I click button with name is 'Save' in page
        Then Verify alert message is 'Successfully Updated'
        And I verify the language with '<languageNameEdited>' is shown in the table
        And I delete the record '<languageNameEdited>' added to clean environment

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
        And get number of records found in page
        When A user select checkbox with keys are '<languageName1>,<languageName2>'
        Then I verify button with name 'Delete Selected' is visible
        And I click button with name is 'Delete Selected' in page
        And The popup with question 'Are you Sure?' is presented
        And I click button with name is 'No, Cancel' in page
        And A user delete selected records
        Then Verify alert message is 'Successfully Deleted'
        And I verify the number of records founded decrease by '2'
        And Verify the record '<languageName1>, <languageName2>' from the table are deleted successfully

        Examples:
            | TC | languageName1         | languageName2         |
            | 06 | Arabic${randomString} | French${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete a language successfully
        When I add the language '<languageName>'
        Then I verify the language with '<languageName>' is shown in the table
        And get number of records found in page
        When A user deletes a record by trash button with key is '<languageName>'
        And The popup with question 'Are you Sure?' is presented
        And I click button with name is 'No, Cancel' in page
        And A user deletes a record by trash button with key is '<languageName>'
        And I click button with name is 'Yes, Delete' in page
        Then Verify alert message is 'Successfully Deleted'
        And I verify the number of records founded decrease by '1'
        And Verify the record '<languageName>' from the table are deleted successfully

        Examples:
            | TC | languageName           |
            | 07 | Russian${randomString} |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add exist language
        When I add the language '<languageName1>'
        Then I verify the language with '<languageName1>' is shown in the table
        When I click button with name is 'Add' in page
        And I type the text '<languageName2>' for field 'Name'
        And I click button with name is 'Save' in page
        Then I verify the error message 'Already exists' is shown under the 'Name' field
        And I click button with name is 'Cancel' in page
        And I delete the record '<languageName1>' added to clean environment

        Examples:
            | TC | languageName1          | languageName2          |
            | 08 | Spanish${randomString} | Spanish${randomString} |

    @ErrorCases
    Scenario Outline: 09. Verify user cannot leave empty language name
        When I click button with name is 'Add' in page
        And I click button with name is 'Save' in page
        Then I verify the error message 'Required' is shown under the 'Name' field

    @ErrorCases
    Scenario Outline: 10. Verify user cannot add language exceed 120 charaters
        When I click button with name is 'Add' in page
        Then The main title is 'Add Language'
        When Generate '121' characters and set for field 'Name'
        Then I verify the error message 'Should not exceed 120 characters' is shown under the 'Name' field
