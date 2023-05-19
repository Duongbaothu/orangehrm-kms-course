@AP @AP10
Feature: As a Admin, I can manage skills information in Qualifications session

    Background: Open browser, login and navigate to skills page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Qualifications' dropdown and choose 'Skills' item in topbar menu
        Then Verify the main title 'Skills' is displayed correctly
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify user can add new skills successfully
        And User click the 'Add' button
        Then Verify the main title 'Add Skill' is displayed correctly
        And Type text '<skillName>' for Name field
        And Type text '<description>' for Description field
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify the skill with title '<skillName>' and '<description>' are shown in the table
        And Delete the record '<skillName>' to clean environment

        Examples:
            | TC | skillName                       | description          |
            | 01 | Content Creation${randomString} | Marketing Skill      |
            | 02 | Google Analytics${randomString} | Marketing Skill      |
            | 03 | Java${randomString}             | Programming Language |
            | 04 | JavaScript${randomString}       |                      |

    @HappyCases
    Scenario Outline: <TC>. Verify user can edit a skill successfully
        When Add new skill with '<skillName>' and '<description>'
        Then Verify the skill with title '<skillName>' and '<description>' are shown in the table
        When A user click edit a record with key is '<skillName>'
        Then Verify the main title 'Edit Skill' is displayed correctly
        And Type text '<skillName>' for Name field
        And Type text '<description>' for Description field
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify the skill with title '<skillName>' and '<description>' are shown in the table
        And Delete the record '<skillName>' to clean environment

        Examples:
            | TC | skillName                        | description              |
            | 05 | Content Creation ${randomString} | Marketing Skill Pro      |
            | 06 | Google Analytics ${randomString} | Marketing Skill Pro      |
            | 07 | Java ${randomString}             | Programming Language Pro |
            | 08 | JavaScript ${randomString}       | Programming Language Pro |

    @HappyCases
    Scenario Outline: <TC>. Verify user can choose muptiple skills to delete successfully
        When Add new skill with '<skillName1>' and '<description1>'
        Then Verify the skill with title '<skillName1>' and '<description1>' are shown in the table
        When Add new skill with '<skillName2>' and '<description2>'
        Then Verify the skill with title '<skillName2>' and '<description2>' are shown in the table
        And A user select checkbox with keys are '<skillName1>,<skillName2>'
        Then Verify button with name 'Delete Selected' is present
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then Verify button with name 'Delete Selected' is present
        And User click the 'Delete Selected' button
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record with title '<skillName1>' and '<description1>' is deleted successfully
        And Verify the record with title '<skillName2>' and '<description2>' is deleted successfully

        Examples:
            | TC | skillName1          | description1         | skillName2         | description2         |
            | 09 | SQL ${randomString} | Programming Language | C# ${randomString} | Programming Language |

    @HappyCases
    Scenario Outline: <TC>. Verify user can delete an skill successfully
        When Add new skill with '<skillName>' and '<description>'
        Then Verify the skill with title '<skillName>' and '<description>' are shown in the table
        When A user delete a record with key is '<skillName>'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        And A user delete a record with key is '<skillName>'
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify the record with title '<skillName>' and '<description>' is deleted successfully

        Examples:
            | TC | skillName                   | description    |
            | 10 | English Pro ${randomString} | Language Skill |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add the existing skill
        When Add new skill with '<skillName>' and '<description>'
        Then Verify the skill with title '<skillName>' and '<description>' are shown in the table
        When User click the 'Add' button
        And Type text '<skillName>' for Name field
        And Type text '<description>' for Description field
        And User click the 'Save' button
        Then Verify a error message 'Already exists' is shown under 'Name' field
        And User click the 'Save' button
        And User click the 'Cancel' button
        And Delete the record '<skillName>' to clean environment

        Examples:
            | TC | skillName             | description          |
            | 11 | Python${randomString} | Programming Language |

    @ErrorCases
    Scenario Outline: <TC>. Verify user cannot add a skill name or description longer than the specified character limit
        When User click the 'Add' button
        Then Verify the main title 'Add Skill' is displayed correctly
        And Type text skill name and description from 'src/features/data/qualifications/errorMessageSkills.csv'
        Then Verify a error message '<errorMessageForNameField>' is shown under 'Name' field
        Then Verify a error message '<errorMessageForDescriptionField>' is shown under 'Description' field

        Examples:
            | TC | errorMessageForNameField         | errorMessageForDescriptionField  |
            | 12 | Should not exceed 120 characters | Should not exceed 400 characters |

    @ErrorCases
    Scenario: 14. Verify user cannot leave empty skill name
        When User click the 'Add' button
        Then Verify the main title 'Add Skill' is displayed correctly
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field
