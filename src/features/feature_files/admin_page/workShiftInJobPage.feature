@E01 @AP06
Feature: As a admin, We can add, edit and delete a Work Shifts on the Job page

    Background: Open browser, login and navigate to the Work Shift page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And Page title is 'OrangeHRM'
        Then A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Work Shifts' item in topbar menu
        Then Verify the main title 'Work Shifts' is displayed correctly
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify the Work Shifts can be added to system successfully when providing info with <testCase>
        When User click the 'Add' button
        Then Verify the main title 'Add Work Shift' is displayed correctly
        And Enter value '<shiftName>' for 'Shift Name'
        And Enter value '<fromTime>' for 'From'
        And Enter value '<toTime>' for 'To'
        And A user type a hint '<hintAssignedEmployees>' in field 'Assigned Employees' to search and then select option 'Boss a' in the dropdown list
        And Verify Duration Per Day '<durationPerDay>' displayed correctly
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<shiftName>' is displayed in table after adding successfully
        Then Delete the record '<shiftName>' to clean environment
        And Verify '<shiftName>' is not displayed in table after removing successfully

        Examples:
            | TC | testCase                          | shiftName                  | fromTime | toTime  | durationPerDay | hintAssignedEmployees |
            | 01 | Shift Name is string              | TestOrange ${randomString} | 9:00 AM  | 6:00 PM | 9.00           | Boss                  |
            | 02 | Shift Name is only number         | 123                        | 9:00 AM  | 6:00 PM | 9.00           | Boss                  |
            | 03 | Shift Name is special characters  | @#^&!$#                    | 9:00 AM  | 6:00 PM | 9.00           | Boss                  |
            | 04 | To time should be after from time | TestTime                   | 8:00 AM  | 4:00 PM | 8.00           | Boss                  |
    
    @HappyCases
    Scenario Outline: 05. Verify the Work Shifts can be added to system successfully without select Assigned Employees
        When User click the 'Add' button
        And Verify the main title 'Add Work Shift' is displayed correctly
        And Enter value 'Name ${randomString}' for 'Shift Name'
        And Enter value '8:00 AM' for 'From'
        And Enter value '5:00 PM' for 'To'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify 'Name ${randomString}' is displayed in table after adding successfully
        Then Delete the record 'Name ${randomString}' to clean environment
        And Verify 'Name ${randomString}' is not displayed in table after removing successfully

    @Errorcases
    Scenario Outline: 06. Verify the error appears when adding the Work Shifts with name more than 50 characters
        When User click the 'Add' button
        And Verify the main title 'Add Work Shift' is displayed correctly
        And Enter value 'Verification Shift Name should not exceed 50 characters ${randomString}' for 'Shift Name'
        Then Verify a error message 'Should not exceed 50 characters' is shown under 'Shift Name' field

    @Errorcases
    Scenario Outline: <TC>. Verify the error appears when adding the Work Shifts with <testCase>
        When User click the 'Add' button
        And Verify the main title 'Add Work Shift' is displayed correctly
        And Enter value '<shiftName>' for 'Shift Name'
        And Enter value '<fromTime>' for 'From'
        And Enter value '<toTime>' for 'To'
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under '<field>' field

        Examples:
            | TC | testCase              | shiftName | fromTime | toTime  | field      |
            | 07 | Shift Name is missing |           | 9:00 AM  | 6:00 PM | Shift Name |
            | 08 | From time is missing  | TestTime  |          | 4:00 AM | From       |
            | 09 | To time is missing    | TestTime  | 8:00 PM  |         | To         |

    @Errorcases
    Scenario Outline: 10. Verify the error appears when adding the Work Shifts with From time after To time
        When User click the 'Add' button
        And Verify the main title 'Add Work Shift' is displayed correctly
        And Enter value 'Name ${randomString}' for 'Shift Name'
        And Enter value '8:00 PM' for 'From'
        And Enter value '5:00 AM' for 'To'
        And User click the 'Save' button
        Then Verify a error message 'To time should be after from time' is shown under 'To' field

    @Errorcases
    Scenario Outline: <TC>. Verify the error appears when adding the Work Shifts with a duplicate name
        Given User add a Work Shift with shift name as '<shiftName>'
        When User click the 'Add' button
        Then Verify the main title 'Add Work Shift' is displayed correctly
        And User enter the name '<shiftName>' of an existing 'Shift Name'
        And User click the 'Save' button
        Then Verify a error message '<msg>' is shown under '<field>' field
        When User click the 'Cancel' button
        And Delete the record '<shiftName>' to clean environment
        Then Verify '<shiftName>' is not displayed in table after removing successfully

        Examples:
            | TC | shiftName            | msg            | field      |
            | 11 | Test ${randomString} | Already exists | Shift Name |

    @HappyCases
    Scenario Outline: <TC>. Verify the Work Shifts can be eddited to system successfully
        Given User add a Work Shift with shift name as '<shiftName>'
        When A user click edit a record with key is '<shiftName>'
        And Verify the main title 'Edit Work Shift' is displayed correctly
        And Enter value '<shiftNameUpdate>' for 'Shift Name'
        And Enter value '<fromTime>' for 'From'
        And Enter value '<toTime>' for 'To'
        And A user type a hint '<hintAssignedEmployees>' in field 'Assigned Employees' to search and then select option 'Boss a' in the dropdown list
        And Verify Duration Per Day '<durationPerDay>' displayed correctly
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '<shiftNameUpdate>' is displayed in table after adding successfully
        When Delete the record '<shiftNameUpdate>' to clean environment
        Then Verify '<shiftNameUpdate>' is not displayed in table after removing successfully

        Examples:
            | TC | shiftName            | shiftNameUpdate             | fromTime | toTime  | durationPerDay | hintAssignedEmployees |
            | 12 | Name ${randomString} | Name_update ${randomString} | 10:00 AM | 6:00 PM | 8.00           | Boss                  |

    @HappyCases
    Scenario: 13. Verify that it is possible to DELETE an existing Work Shifts Name
        Given User add a Work Shift with shift name as 'Shift Name ${randomString}'
        When A user delete a record with key is 'Shift Name ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When A user delete a record with key is 'Shift Name ${randomString}'
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify 'Shift Name ${randomString}' is not displayed in table after removing successfully

    @HappyCases
    Scenario Outline: 14. Verify that it is possible to DELETE multiple existing Work Shifts Name
        Given User add a Work Shift with shift name as '<shiftName1>'
        And User add a Work Shift with shift name as '<shiftName2>'
        When A user select checkbox with keys are '<shiftName1>,<shiftName2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'Are you Sure?' is not displayed
        When User click the 'Delete Selected' button
        Then The popup with the question 'Are you Sure?' is displayed
        When User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        And Verify '<shiftName1>' is not displayed in table after removing successfully
        And Verify '<shiftName2>' is not displayed in table after removing successfully

        Examples:
            | shiftName1             | shiftName2             |
            | Test_1 ${randomString} | Test_2 ${randomString} |
