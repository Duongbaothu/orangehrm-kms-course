@E01 @AP07
Feature: As an Admin, I can manage general information of organization in Organization session

  Background: Open browser and navigate to General Information page
    Given A user visits OrangeHRM page
    And A user logged in by admin role
    Then Verify the module page header is 'Dashboard'
    And A user is on '/web/index.php/dashboard/index' page
    And Page title is 'OrangeHRM'
    When A user click 'Admin' item in main menu
    And A user click 'Organization' dropdown and choose 'General Information' item in topbar menu
    Then Verify the main title 'General Information' is displayed correctly

  @HappyCases
  Scenario Outline: <TC>. Verify general information saved successfully when <testcase>
    Given User click Edit button
    When User type '<organizationName>' into 'Organization Name' field
    And User type '<registrationNumber>' into 'Registration Number' field
    And User type '<taxID>' into 'Tax ID' field
    And User type '<phone>' into 'Phone' field
    And User type '<fax>' into 'Fax' field
    And User type '<email>' into 'Email' field
    And User type '<addressStreet1>' into 'Address Street 1' field
    And User type '<addressStreet2>' into 'Address Street 2' field
    And User type '<city>' into 'City' field
    And User type '<stateProvince>' into 'State/Province' field
    And User type '<zipPostalCode>' into 'Zip/Postal Code' field
    And User select '<country>' in Country
    And User type '<notes>' into 'Notes' field
    When User click the 'Save' button
    Then Verify alert message is 'Successfully Updated'
    Then Verify the 'Organization Name' is displayed correct as '<organizationName>'
    Then Verify the 'Registration Number' is displayed correct as '<registrationNumber>'
    Then Verify the 'Tax ID' is displayed correct as '<taxID>'
    Then Verify the 'Phone' is displayed correct as '<phone>'
    Then Verify the 'Fax' is displayed correct as '<fax>'
    Then Verify the 'Email' is displayed correct as '<email>'
    And Verify the 'Address Street 1' is displayed correct as '<addressStreet1>'
    And Verify the 'Address Street 2' is displayed correct as '<addressStreet2>'
    And Verify the 'City' is displayed correct as '<city>'
    And Verify the 'State/Province' is displayed correct as '<stateProvince>'
    And Verify the 'Zip/Postal Code' is displayed correct as '<zipPostalCode>'
    And Verify the 'Notes' is displayed correct as '<notes>'
    And Verify the Country is displayed correct with '<country>'
    Then Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                        | organizationName | registrationNumber | taxID     | phone           | fax             | email          | addressStreet1 | addressStreet2 | city | stateProvince | zipPostalCode | country  | notes    |
      | 01 | updating only Organization Name | KMS-SEL-WS       |                    |           |                 |                 |                |                |                |      |               |               |          |          |
      | 02 | providing all fields are valid  | KMS-SEL-WS       | 123                | 123456789 | (+84)-123456789 | (+84)-123456789 | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note |

  @ErrorCases
  Scenario Outline: <TC>. Verify general information saved unsuccessfully when <testcase>
    Given User click Edit button
    When User type '<organizationName>' into 'Organization Name' field
    And User type '<registrationNumber>' into 'Registration Number' field
    And User type '<taxID>' into 'Tax ID' field
    And User type '<phone>' into 'Phone' field
    And User type '<fax>' into 'Fax' field
    And User type '<email>' into 'Email' field
    And User type '<addressStreet1>' into 'Address Street 1' field
    And User type '<addressStreet2>' into 'Address Street 2' field
    And User type '<city>' into 'City' field
    And User type '<stateProvince>' into 'State/Province' field
    And User type '<zipPostalCode>' into 'Zip/Postal Code' field
    And User select '<country>' in Country
    And User type '<notes>' into 'Notes' field
    When User click the 'Save' button
    Then Verify a error message '<errorMessage>' is shown under 'Organization Name' field
    And Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                               | organizationName | registrationNumber | taxID     | phone           | fax             | email          | addressStreet1 | addressStreet2 | city | stateProvince | zipPostalCode | country  | notes    | errorMessage |
      | 03 | leaving all fields empty               |                  |                    |           |                 |                 |                |                |                |      |               |               |          |          | Required     |
      | 04 | providing only Organization Name empty |                  | 123                | 123456789 | (+84)-123456789 | (+84)-123456789 | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Required     |

  @ErrorCases
  Scenario Outline: <TC>. Verify general information saved unsuccessfully when <testcase>
    Given User click Edit button
    When User type '<organizationName>' into 'Organization Name' field
    And User type '<registrationNumber>' into 'Registration Number' field
    And User type '<taxID>' into 'Tax ID' field
    And User type '<phone>' into 'Phone' field
    And User type '<fax>' into 'Fax' field
    And User type '<email>' into 'Email' field
    And User type '<addressStreet1>' into 'Address Street 1' field
    And User type '<addressStreet2>' into 'Address Street 2' field
    And User type '<city>' into 'City' field
    And User type '<stateProvince>' into 'State/Province' field
    And User type '<zipPostalCode>' into 'Zip/Postal Code' field
    And User select '<country>' in Country
    And User type '<notes>' into 'Notes' field
    When User click the 'Save' button
    Then Verify a error message '<errorMessage>' is shown under 'Phone' field
    And Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                                        | organizationName | registrationNumber | taxID     | phone   | fax             | email          | addressStreet1 | addressStreet2 | city | stateProvince | zipPostalCode | country  | notes    | errorMessage                      |
      | 05 | providing Phone is invalid (letters)            | KMS-SEL-WS       | 123                | 123456789 | abcd    | (+84)-123456789 | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Allows numbers and only + - / ( ) |
      | 06 | providing Phone is invalid (special characters) | KMS-SEL-WS       | 123                | 123456789 | !@@#$%% | (+84)-123456789 | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Allows numbers and only + - / ( ) |

  @ErrorCases
  Scenario Outline: <TC>. Verify general information saved unsuccessfully when <testcase>
    Given User click Edit button
    When User type '<organizationName>' into 'Organization Name' field
    And User type '<registrationNumber>' into 'Registration Number' field
    And User type '<taxID>' into 'Tax ID' field
    And User type '<phone>' into 'Phone' field
    And User type '<fax>' into 'Fax' field
    And User type '<email>' into 'Email' field
    And User type '<addressStreet1>' into 'Address Street 1' field
    And User type '<addressStreet2>' into 'Address Street 2' field
    And User type '<city>' into 'City' field
    And User type '<stateProvince>' into 'State/Province' field
    And User type '<zipPostalCode>' into 'Zip/Postal Code' field
    And User select '<country>' in Country
    And User type '<notes>' into 'Notes' field
    When User click the 'Save' button
    Then Verify a error message '<errorMessage>' is shown under 'Fax' field
    And Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                                      | organizationName | registrationNumber | taxID     | phone   | fax     | email          | addressStreet1 | addressStreet2 | city | stateProvince | zipPostalCode | country  | notes    | errorMessage                      |
      | 07 | providing Fax is invalid (letters)            | KMS-SEL-WS       | 123                | 123456789 | abcd    | abcd    | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Allows numbers and only + - / ( ) |
      | 08 | providing Fax is invalid (special characters) | KMS-SEL-WS       | 123                | 123456789 | !@@#$%% | !@@#$%% | boss@gmail.com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Allows numbers and only + - / ( ) |

  @ErrorCases
  Scenario Outline: <TC>. Verify general information saved unsuccessfully when <testcase>
    Given User click Edit button
    When User type '<organizationName>' into 'Organization Name' field
    And User type '<registrationNumber>' into 'Registration Number' field
    And User type '<taxID>' into 'Tax ID' field
    And User type '<phone>' into 'Phone' field
    And User type '<fax>' into 'Fax' field
    And User type '<email>' into 'Email' field
    And User type '<addressStreet1>' into 'Address Street 1' field
    And User type '<addressStreet2>' into 'Address Street 2' field
    And User type '<city>' into 'City' field
    And User type '<stateProvince>' into 'State/Province' field
    And User type '<zipPostalCode>' into 'Zip/Postal Code' field
    And User select '<country>' in Country
    And User type '<notes>' into 'Notes' field
    When User click the 'Save' button
    Then Verify a error message '<errorMessage>' is shown under 'Email' field
    And Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                   | organizationName | registrationNumber | taxID     | phone           | fax             | email            | addressStreet1 | addressStreet2 | city | stateProvince | zipPostalCode | country  | notes    | errorMessage                       |
      | 09 | providing Email is invalid | KMS-SEL-WS       | 123                | 123456789 | (+84)-123456789 | (+84)-123456789 | boss@@gmail..com | 123 Tan Vien   | 123 Tan Vien   | HCM  | Tan Binh      | 123456        | Viet Nam | KMS-note | Expected format: admin@example.com |

  @ErrorCases
  Scenario Outline: <TC>. Verify general information saved unsuccessfully when <testcase>
    Given User click Edit button
    When User type text into 'Organization Name' field from '<pathFile>'
    And User type text into 'Registration Number' field from '<pathFile>'
    And User type text into 'Tax ID' field from '<pathFile>'
    And User type text into 'Phone' field from '<pathFile>'
    And User type text into 'Fax' field from '<pathFile>'
    And User type text into 'Email' field from '<pathFile>'
    And User type text into 'Address Street 1' field from '<pathFile>'
    And User type text into 'Address Street 2' field from '<pathFile>'
    And User type text into 'City' field from '<pathFile>'
    And User type text into 'State/Province' field from '<pathFile>'
    And User type text into 'Zip/Postal Code' field from '<pathFile>'
    And User type text into 'Notes' field from '<pathFile>'
    Then Verify a error message '<errorMessageExceed100>' is shown under 'Organization Name' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Registration Number' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Tax ID' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Phone' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Fax' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Email' field
    Then Verify a error message '<errorMessageExceed100>' is shown under 'Address Street 1' field
    Then Verify a error message '<errorMessageExceed100>' is shown under 'Address Street 2' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'City' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'State/Province' field
    Then Verify a error message '<errorMessageExceed30>' is shown under 'Zip/Postal Code' field
    And Verify a error message '<errorMessageExceed255>' is shown under 'Notes' field
    And Verify the 'Number of Employees' is displayed correctly in General Information page

    Examples:
      | TC | testcase                                                               | pathFile                                              | errorMessageExceed30            | errorMessageExceed100            | errorMessageExceed255            |
      | 10 | inputting fields have value longer than the specified character limit. | src/features/data/organization/generalInformation.csv | Should not exceed 30 characters | Should not exceed 100 characters | Should not exceed 255 characters |