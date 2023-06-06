@PP @PP02 @Config
Feature: As a Admin, I can manage custom fields in Configuration session

    Background: Open browser, login and navigate to the Custom Fields page
        Given A user visits OrangeHRM page
        Then Page title is 'OrangeHRM'
        When set:
            | fileNameValue                        | optionValue                              |
            | Id${moment().format('YYMMDDHHmmss')} | ListId${moment().format('YYMMDDHHmmss')} |
        And A user logged in by admin role
        And A user click 'PIM' item in main menu
        And A user click 'Configuration' dropdown and choose 'Custom Fields' item in topbar menu
        Then Verify the main title 'Custom Fields' is displayed correctly
        When Delete all record in the Custom Field table

    @HappyCases
    Scenario Outline: <TC>. Verify that the administrator can add a new field in <location> with type is 'Text or Number' successfully in Custom Field Page
        When Get number of custom fields can be added in Custom Field table
        And User click the 'Add' button
        Then Verify the main title 'Add Custom Field' is displayed correctly
        When A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option '<location>' in dropdown 'Screen'
        And A user select option 'Text or Number' in dropdown 'Type'
        And User click the 'Save' button
        Then Verify '${fileNameValue}' is displayed in table after adding successfully
        And Verify number of custom fields can be added is decreased by '1' unit
        When A user click My Info item in main menu item and choose '<location>' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Text or Number' and value is ''

        Examples:
            | TC | location           |
            | 01 | Personal Details   |
            | 02 | Contact Details    |
            | 03 | Emergency Contacts |
            | 04 | Dependents         |
            | 05 | Immigration        |
            | 06 | Job                |
            | 07 | Salary             |
            | 08 | Report-to          |
            | 09 | Qualifications     |
            | 10 | Memberships        |

    @HappyCases
    Scenario: 11. Verify that the administrator can add a new field in 'Tax Exemptions' with type is 'Text or Number' successfully in Custom Field Page
        When Get number of custom fields can be added in Custom Field table
        And User click the 'Add' button
        Then Verify the main title 'Add Custom Field' is displayed correctly
        When A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option 'Tax Exemptions' in dropdown 'Screen'
        And A user select option 'Text or Number' in dropdown 'Type'
        And User click the 'Save' button
        Then Verify '${fileNameValue}' is displayed in table after adding successfully
        And Verify number of custom fields can be added is decreased by '1' unit
        When A user 'enable' the checkbox the option name is 'Show US Tax Exemptions menu' in Optional Fields Page
        And A user click My Info item in main menu item and choose 'Tax Exemptions' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Text or Number' and value is ''
        When A user 'disable' the checkbox the option name is 'Show US Tax Exemptions menu' in Optional Fields Page

    @HappyCases
    Scenario Outline: <TC>. Verify that the administrator can add a new field in <location> with type is 'Drop Down' successfully in Custom Field Page
        When Get number of custom fields can be added in Custom Field table
        And User click the 'Add' button
        Then Verify the main title 'Add Custom Field' is displayed correctly
        When A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option '<location>' in dropdown 'Screen'
        And A user select option 'Drop Down' in dropdown 'Type'
        And A user type a string '<dropDownValue>' in the 'Select Options' field
        And User click the 'Save' button
        Then Verify '${fileNameValue}' is displayed in table after adding successfully
        And Verify number of custom fields can be added is decreased by '1' unit
        When A user click My Info item in main menu item and choose '<location>' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Drop Down' and value is '<dropDownValue>'

        Examples:
            | TC | location           | dropDownValue                  |
            | 12 | Personal Details   | ${optionValue}                 |
            | 13 | Contact Details    | ${optionValue}, List02         |
            | 14 | Emergency Contacts | ${optionValue}                 |
            | 15 | Dependents         | ${optionValue}                 |
            | 16 | Immigration        | ${optionValue}, List02         |
            | 17 | Job                | ${optionValue}, List02, List03 |
            | 18 | Salary             | ${optionValue}                 |
            | 19 | Report-to          | ${optionValue}                 |
            | 20 | Qualifications     | ${optionValue}, List02         |
            | 21 | Memberships        | ${optionValue}, List02, List03 |

    @HappyCases
    Scenario: 22. Verify that the administrator can add a new field in 'Tax Exemptions' with type is 'Drop Down' successfully in Custom Field Page
        When Get number of custom fields can be added in Custom Field table
        And User click the 'Add' button
        Then Verify the main title 'Add Custom Field' is displayed correctly
        When A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option 'Tax Exemptions' in dropdown 'Screen'
        And A user select option 'Drop Down' in dropdown 'Type'
        And A user type a string '${optionValue}' in the 'Select Options' field
        And User click the 'Save' button
        Then Verify '${fileNameValue}' is displayed in table after adding successfully
        And Verify number of custom fields can be added is decreased by '1' unit
        When A user 'enable' the checkbox the option name is 'Show US Tax Exemptions menu' in Optional Fields Page
        And A user click My Info item in main menu item and choose 'Tax Exemptions' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Drop Down' and value is ''
        When A user 'disable' the checkbox the option name is 'Show US Tax Exemptions menu' in Optional Fields Page

    @HappyCases
    Scenario: 23. Verify that the admin can edit the name of field in 'Field Name' of the newly created field successfully in Custom Field Page
        When A user create new field 1 times with the field name start with '${fileNameValue}', 'Text or Number' type and '' as option value in 'Personal Details' Screen
        And A user click edit a record with key is '${fileNameValue}'
        And A user edit a record of the field name 'Field Name' with new value '${fileNameValue}001' and '' as option value
        And User click the 'Save' button
        And A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the field '${fileNameValue}' is not displayed with value is ''
        And Verify the field '${fileNameValue}001' is displayed with field type is 'Text or Number' and value is ''

    @HappyCases
    Scenario: 24. Verify that the admin can change the 'Screen' of the newly created field successfully in Custom Field Page
        When A user create new field 1 times with the field name start with '${fileNameValue}', 'Text or Number' type and '' as option value in 'Personal Details' Screen
        And A user click edit a record with key is '${fileNameValue}'
        And A user edit a record of the field name 'Screen' with new value 'Job' and '' as option value
        And User click the 'Save' button
        And A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the field '${fileNameValue}' is not displayed with value is ''
        When A user click My Info item in main menu item and choose 'Job' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Text or Number' and value is ''

    @HappyCases
    Scenario Outline: <TC>. Verify that the admin can change the 'Type' <testCases> of the newly created field successfully in Custom Field Page
        When A user create new field 1 times with the field name start with '${fileNameValue}', '<oldType>' type and '<oldOptionValue>' as option value in 'Personal Details' Screen
        And A user click edit a record with key is '${fileNameValue}'
        And A user edit a record of the field name 'Type' with new value '<newType>' and '<newOptionValue>' as option value
        And User click the 'Save' button
        And A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the field '${fileNameValue}' is displayed with field type is '<newType>' and value is '<newOptionValue>'

        Examples:
            | TC | testCases                            | oldType        | newType        | oldOptionValue | newOptionValue |
            | 25 | from 'Text or Number' to 'Drop Down' | Text or Number | Drop Down      |                | ${optionValue} |
            | 26 | from 'Drop Down' to 'Text or Number' | Drop Down      | Text or Number | ${optionValue} |                |

    @HappyCases
    Scenario: 27. Verify that the admin can edit the value of 'Select Options' field of the newly created field successfully in Custom Field Page
        When A user create new field 1 times with the field name start with '${fileNameValue}', 'Drop Down' type and '${optionValue}' as option value in 'Personal Details' Screen
        And A user click edit a record with key is '${fileNameValue}'
        And A user edit a record of the field name 'Select Options' with new value '${optionValue}001' and '' as option value
        And User click the 'Save' button
        And A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the field '${fileNameValue}' is not displayed with value is '${optionValue}'
        Then Verify the field '${fileNameValue}' is displayed with field type is 'Drop Down' and value is '${optionValue}001'

    @HappyCases
    Scenario: 28. Verify that the admin can not create new fields in Custom Field Page when already has 10 records before
        When A user create new field 5 times with the field name start with '${fileNameValue}01', 'Text or Number' type and '' as option value in 'Personal Details' Screen
        And A user create new field 5 times with the field name start with '${fileNameValue}02', 'Text or Number' type and '' as option value in 'Personal Details' Screen
        Then Verify the Add button is not displayed
        And Verify the number of field available message is 'All custom fields are in use'

    @ErrorCases
    Scenario Outline: <TC>. Verify that the admin can not create new fields in Custom Field Page when <testCases>
        When User click the 'Add' button
        And A user type a string '<fieldNameValue>' in the 'Field Name' field
        And A user select option '<screen>' in dropdown 'Screen'
        And A user select option '<type>' in dropdown 'Type'
        And User click the 'Save' button
        Then Verify a error message '<errorMessage>' is shown under '<fieldNameError>' field

        Examples:
            | TC | testCases                         | fieldNameValue   | screen           | type           | errorMessage | fieldNameError |
            | 29 | providing Field Name is empty     |                  | Personal Details | Text or Number | Required     | Field Name     |
            | 30 | does not select any Screen option | ${fileNameValue} | -- Select --     | Text or Number | Required     | Screen         |
            | 31 | does not select any Type option   | ${fileNameValue} | Personal Details | -- Select --   | Required     | Type           |

    @ErrorCases
    Scenario: 32. Verify that the admin can not create new fields in Custom Field Page when providing the 'Select Options' is empty
        When User click the 'Add' button
        And A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option 'Personal Details' in dropdown 'Screen'
        And A user select option 'Drop Down' in dropdown 'Type'
        And A user type a string '' in the 'Select Options' field
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Select Options' field

    @ErrorCases
    Scenario: 33. Verify that the admin can not create new fields in Custom Field Page when providing the field name already exists
        When A user create new field 1 times with the field name start with '${fileNameValue}', 'Text or Number' type and '' as option value in 'Personal Details' Screen
        And User click the 'Add' button
        And A user type a string '${fileNameValue}' in the 'Field Name' field
        And A user select option 'Personal Details' in dropdown 'Screen'
        And A user select option 'Text or Number' in dropdown 'Type'
        And User click the 'Save' button
        Then Verify a error message 'Already exists' is shown under 'Field Name' field
