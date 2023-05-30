@PP @PP01 @Config
Feature: As a Admin, I can update optional fields in Configuration session

    Background: Open browser, login and navigate to the Optional Fields page
        Given A user visits OrangeHRM page
        Then Page title is 'OrangeHRM'
        When A user logged in by admin role
        And A user click 'PIM' item in main menu
        And A user click 'Configuration' dropdown and choose 'Optional Fields' item in topbar menu
        Then Verify the form title 'Optional Fields' is displayed

    @HappyCases
    Scenario Outline: <TC>. Verify that optional fields are visible and editable data in the Personal Details page when the '<testCases>' option is enabled
        When A user enable the checkbox with the option name is '<testCases>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        When A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the '<type>' - '<fieldName>' is displayed
        When A user update value of the field '<fieldName>' to value '<fieldValue>'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        When Reset the '<fieldName>' field values to default
        And A user 'disable' the checkbox the option name is '<testCases>' in Optional Fields Page
        Then Verify alert message is 'Successfully Saved'

        Examples:
            | TC | testCases                                                       | type  | fieldName                          | fieldValue       |
            | 01 | Show Nick Name, Smoker and Military Service in Personal Details | field | Nickname, Smoker, Military Service | Boss, True, 2012 |
            | 02 | Show SSN field in Personal Details                              | field | SSN Number                         | 506964981        |
            | 03 | Show SIN field in Personal Details                              | field | SIN Number                         | 708824263        |

    @HappyCases
    Scenario: 04. Verify that Tax Exemptions tab are visible in My Info page when the 'Show US Tax Exemptions menu' option is enabled
        When A user enable the checkbox with the option name is 'Show US Tax Exemptions menu'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        When A user click 'My Info' item in main menu
        Then Verify the 'tab' - 'Tax Exemptions' is displayed
        When A user 'disable' the checkbox the option name is 'Show US Tax Exemptions menu' in Optional Fields Page
        Then Verify alert message is 'Successfully Saved'

    @ErrorCases
    Scenario Outline: <TC>. Verify that <testCases> are not visible in the Personal Details page when the '<optionalName>' option is disabled
        When A user click My Info item in main menu item and choose 'Personal Details' in tab items
        Then Verify the '<type>' - '<fieldName>' is not displayed

        Examples:
            | TC | testCases          | optionalName                                                    | type  | fieldName                          |
            | 05 | optional fields    | Show Nick Name, Smoker and Military Service in Personal Details | field | Nickname, Smoker, Military Service |
            | 06 | optional fields    | Show SSN field in Personal Details                              | field | SSN Number                         |
            | 07 | optional fields    | Show SIN field in Personal Details                              | field | SIN Number                         |
            | 08 | Tax Exemptions tab | Show US Tax Exemptions menu                                     | tab   | Tax Exemptions                     |
