@AP @AP09
Feature: As a Admin, I can update organization structure of organization in Organization session

    Background: Open browser and navigate to the specific page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Organization' dropdown and choose 'Structure' item in topbar menu
        Then Verify the main title 'Organization Structure' is displayed correctly
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario: <TC>. Verify the admin can add an Organization Unit successfully under KMS-SEL-WS organization with <name>
        When User click enable edit mode
        And User click the 'Add' button
        And User type '<unitID>' into 'Unit Id'
        And User type '<unitName>' into 'Name'
        And User type '<unitDescription>' into 'Description'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        When Verify the dialog does not display
        And User click disable edit mode
        Then Verify the unit '<unitName>' is added under 'KMS-SEL-WS'
        And User delete an unit '<unitName>' under 'KMS-SEL-WS' to clean environment

        Examples:
            | TC | name                        | unitID             | unitName                   | unitDescription             |
            | 01 | only organization unit name |                    | Unit_Name1_${randomString} |                             |
            | 02 | full information            | ID_${randomString} | Unit_Name2_${randomString} | Description_${randomString} |

    @HappyCases
    Scenario: 03. Verify the admin can edit an Organization Unit with new organization unit name
        When User add an unit with name is 'Unit_Name3_${randomString}' under 'KMS-SEL-WS'
        And User click enable edit mode
        And User click edit icon with unit name is 'Unit_Name3_${randomString}' under 'KMS-SEL-WS'
        And User type 'Unit_Name3_${randomString}_Updated' into 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        When Verify the dialog does not display
        And User click disable edit mode
        Then Verify the unit 'Unit_Name3_${randomString}_Updated' is added under 'KMS-SEL-WS'
        And User delete an unit 'Unit_Name3_${randomString}_Updated' under 'KMS-SEL-WS' to clean environment

    @HappyCases
    Scenario: 04. Verify the admin can delete an Organization Unit
        When User add an unit with name is 'Unit_Name4_${randomString}' under 'KMS-SEL-WS'
        And User click enable edit mode
        And User click delete an unit with unit name is 'Unit_Name4_${randomString}' under 'KMS-SEL-WS'
        Then Verify the unit 'Unit_Name4_${randomString}' is removed from 'KMS-SEL-WS'

    @HappyCases
    Scenario: 05. Verify the admin can add an Organization Unit under an other Organization Unit
        When User add an unit with name is 'Unit_Name5_${randomString}_Parent' under 'KMS-SEL-WS'
        And User add an unit with name is 'Unit_Name5_${randomString}_Child' under 'Unit_Name5_${randomString}_Parent'
        Then Verify the unit 'Unit_Name5_${randomString}_Child' is added under 'Unit_Name5_${randomString}_Parent'
        And User delete an unit 'Unit_Name5_${randomString}_Child' under 'Unit_Name5_${randomString}_Parent' to clean environment
        And User click enable edit mode
        And User delete an unit 'Unit_Name5_${randomString}_Parent' under 'KMS-SEL-WS' to clean environment

    @HappyCases
    Scenario: 06. Verify the admin can edit an Organization Unit under an other Organization Unit
        When User add an unit with name is 'Unit_Name6_${randomString}_Parent' under 'KMS-SEL-WS'
        And User add an unit with name is 'Unit_Name6_${randomString}_Child' under 'Unit_Name6_${randomString}_Parent'
        And User click enable edit mode
        And User click expand icon at 'Unit_Name6_${randomString}_Parent'
        And User click edit icon with unit name is 'Unit_Name6_${randomString}_Child' under 'Unit_Name6_${randomString}_Parent'
        And User type 'Unit_Name6_${randomString}_Child_Updated' into 'Name'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        When Verify the dialog does not display
        And User click disable edit mode
        And User click expand icon at 'Unit_Name6_${randomString}_Parent'
        Then Verify the unit 'Unit_Name6_${randomString}_Child_Updated' is added under 'Unit_Name6_${randomString}_Parent'
        And User delete an unit 'Unit_Name6_${randomString}_Child_Updated' under 'Unit_Name6_${randomString}_Parent' to clean environment
        And User click enable edit mode
        And User delete an unit 'Unit_Name6_${randomString}_Parent' under 'KMS-SEL-WS' to clean environment

    @HappyCases
    Scenario: 07. Verify the admin can delete an Organization Unit under an other Organization Unit
        When User add an unit with name is 'Unit_Name7_${randomString}_Parent' under 'KMS-SEL-WS'
        And User add an unit with name is 'Unit_Name7_${randomString}_Child' under 'Unit_Name7_${randomString}_Parent'
        And User click enable edit mode
        And User click expand icon at 'Unit_Name7_${randomString}_Parent'
        And User click delete an unit with unit name is 'Unit_Name7_${randomString}_Child' under 'Unit_Name7_${randomString}_Parent'
        Then Verify alert message is 'Successfully Deleted'
        When User click delete an unit with unit name is 'Unit_Name7_${randomString}_Parent' under 'KMS-SEL-WS'
        Then Verify alert message is 'Successfully Deleted'

    @HappyCases
    Scenario: 08. Verify the admin can delete an Organization Unit parent contains multiple Child Organization Units
        When User add an unit with name is 'Unit_Name_${randomString}_Parent' under 'KMS-SEL-WS'
        And User add an unit with name is 'Unit_Name_${randomString}_Child_1' under 'Unit_Name_${randomString}_Parent'
        And User add an unit with name is 'Unit_Name_${randomString}_Child_2' under 'Unit_Name_${randomString}_Parent'
        And User click enable edit mode
        And User click expand icon at 'Unit_Name_${randomString}_Parent'
        And User click delete an unit with unit name is 'Unit_Name_${randomString}_Parent' under 'KMS-SEL-WS'
        Then Verify alert message is 'Successfully Deleted'
        And Verify the unit 'Unit_Name_${randomString}_Parent' is removed from 'KMS-SEL-WS'
        And Verify the unit 'Unit_Name_${randomString}_Child_1' is removed from 'KMS-SEL-WS'
        And Verify the unit 'Unit_Name_${randomString}_Child_2' is removed from 'KMS-SEL-WS'

    @ErrorCases
    Scenario: <TC>. Verify Organization Unit is added unsuccessfully when <name>
        When User click enable edit mode
        And User click the 'Add' button
        And User type '<unitID>' into 'Unit Id'
        And User type '<unitName>' into 'Name'
        And User type '<unitDescription>' into 'Description'
        And User click the 'Save' button
        Then Verify a error message '<message>' is shown under '<fieldName>' field

        Examples:
            | TC | name                               | unitID             | unitName | unitDescription             | message  | fieldName |
            | 09 | leaving all fields are empty       |                    |          |                             | Required | Name      |
            | 10 | only input unit id and description | ID_${randomString} |          | Description_${randomString} | Required | Name      |

    @ErrorCases
    Scenario: 11. Verify the error messages are showing correctly when providing the values longer than the allowed values
        When User click enable edit mode
        And User click the 'Add' button
        And Generate '101' characters and set it for field 'Unit Id'
        Then Verify a error message 'Should not exceed 100 characters' is shown under 'Unit Id' field
        When Generate '101' characters and set it for field 'Name'
        Then Verify a error message 'Should not exceed 100 characters' is shown under 'Name' field
        When Generate '401' characters and set it for field 'Description'
        Then Verify a error message 'Should not exceed 400 characters' is shown under 'Description' field

    @ErrorCases
    Scenario: 12. Verify Organization Unit is added unsuccessfully when providing an existed unit name
        When User add an unit with name is 'Unit_Name_${randomString}' under 'KMS-SEL-WS'
        And User click enable edit mode
        And User click the 'Add' button
        And User type 'Unit_Name_${randomString}' into 'Name'
        Then Verify a error message 'Organization unit name should be unique' is shown under 'Name' field
        When User click the 'Cancel' button
        And User click enable edit mode
        And User delete an unit 'Unit_Name_${randomString}' under 'KMS-SEL-WS' to clean environment