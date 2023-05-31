@E02 @PP03
Feature: As a admin, We can import list employees from csv in Configuration session

  Background: Open browser, login and navigate to the Data Import page
    Given A user visits OrangeHRM page
    And A user logged in by admin role
    Then Verify the module page header is 'Dashboard'
    And A user is on '/web/index.php/dashboard/index' page
    And Page title is 'OrangeHRM'
    When A user click 'PIM' item in main menu
    And Verify the main title 'Employee Information' is displayed correctly
    And A user click 'Configuration' dropdown and choose 'Data Import' item in topbar menu
    And set:
      | randomString                       |
      | ${moment().format('YYMMDDHHmmss')} |

  @HappyCases
  Scenario Outline: <TC>. Verify list employees can import successfully with <note>
    Then Verify the main title 'Data Import' is displayed correctly
    And Add employee list from csv file '<modifiedPathFile>' by '<initialPathFile>' path file
    And User click the 'Upload' button
    Then Verify the popup with message '1 Record Successfully Imported' show
    And User click the 'Ok' button
    And A user click 'Employee List' item in topbar menu
    And Verify record with Id key is added from path file '<modifiedPathFile>' successfully
    And Delete the record with Id key and delete '<modifiedPathFile>' modified path file to clean environment

    Examples:
      | TC | note                       | initialPathFile                                  | modifiedPathFile                                       |
      | 01 | all valid fields           | src/features/data/dataImport/fullValidField.csv  | src/features/data/dataImport/fullValidFieldRandom.csv  |
      | 02 | the option fields are null | src/features/data/dataImport/optionFieldNull.csv | src/features/data/dataImport/optionFieldNullRandom.csv |

  @HappyCases
  Scenario Outline: <TC>. Verify list employees with multiple records can import successfully
    Given Verify the main title 'Data Import' is displayed correctly
    And Add employee list from csv file '<modifiedPathFile>' by '<initialPathFile>' path file
    And User click the 'Upload' button
    Then Verify the popup with message '2 Records Successfully Imported' show
    And User click the 'Ok' button
    And A user click 'Employee List' item in topbar menu
    And Verify record with Id key is added from path file '<modifiedPathFile>' successfully
    And Delete the record with Id key and delete '<modifiedPathFile>' modified path file to clean environment

    Examples:
      | TC | initialPathFile                                  | modifiedPathFile                                       |
      | 03 | src/features/data/dataImport/multipleRecords.csv | src/features/data/dataImport/multipleRecordsRandom.csv |

  @HappyCases
  Scenario: 04. Verify the importData file is downloaded successfully to local when clicking to Download
    Given Verify the main title 'Data Import' is displayed correctly
    And Click to Download to get sample CSV file
    Then Verify the importData file is downloaded successfully to local

  @HappyCases @DeleteAll
  Scenario Outline: <TC>. Verify the page is paginated successfully when user adds more than 50 employees
    Given Verify the main title 'Data Import' is displayed correctly
    And Add employee list from csv file '<modifiedPathFile>' by '<initialPathFile>' path file
    And User click the 'Upload' button
    Then Verify the popup with message '51 Records Successfully Imported' show
    And User click the 'Ok' button
    And A user click 'Employee List' item in topbar menu
    Then Verify this page has pagination
    And Verify record with Id key is added from path file '<modifiedPathFile>' successfully
    And Delete all record from csv file and delete '<modifiedPathFile>' modified path file to clean environment

    Examples:
      | TC | initialPathFile                                | modifiedPathFile                                     |
      | 05 | src/features/data/dataImport/50ValidRecord.csv | src/features/data/dataImport/50ValidRecordRandom.csv |

  @ErrorCases
  Scenario Outline: <TC>. Verify the error appears when import list employees with <note>
    Given Verify the main title 'Data Import' is displayed correctly
    And A user upload file '<pathFile>'
    And User click the 'Upload' button
    Then Verify the popup with message '<errorMessage>' show
    And User click the 'Ok' button

    Examples:
      | TC | note                          | pathFile                                               | errorMessage                                                   |
      | 06 | changing the position columns | src/features/data/dataImport/changePositionColumns.csv | No Records Imported                                            |
      | 07 | First Name is empty           | src/features/data/dataImport/firstNameEmpty.csv        | No Records Imported\n1 Record Failed to Import\nFailed Rows\n2 |
      | 08 | Last Name is empty            | src/features/data/dataImport/lastNameEmpty.csv         | No Records Imported\n1 Record Failed to Import\nFailed Rows\n2 |

  @ErrorCases
  Scenario Outline: <TC>. Verify the admin can NOT add the duplicated employee list
    Given Add employee list from csv file '<modifiedPathFile>' by '<initialPathFile>' path file
    And User click the 'Upload' button
    Then Verify the popup with message '1 Record Successfully Imported' show
    And User click the 'Ok' button
    And A user click 'Employee List' item in topbar menu
    And Verify record with Id key is added from path file '<modifiedPathFile>' successfully
    And A user click 'Configuration' dropdown and choose 'Data Import' item in topbar menu
    When A user upload file '<modifiedPathFile>'
    And User click the 'Upload' button
    Then Verify the popup with message '<errorMessage>' show
    And User click the 'Ok' button
    And A user click 'Employee List' item in topbar menu
    And Delete the record with Id key and delete '<modifiedPathFile>' modified path file to clean environment

    Examples:
      | TC | initialPathFile                                  | modifiedPathFile                                       | errorMessage                                                   |
      | 09 | src/features/data/dataImport/optionFieldNull.csv | src/features/data/dataImport/optionFieldNullRandom.csv | No Records Imported\n1 Record Failed to Import\nFailed Rows\n2 |

  @ErrorCases
  Scenario Outline: <TC>. Verify the admin can NOT import when <action>
    Then Verify the main title 'Data Import' is displayed correctly
    And A user upload file '<pathFile>'
    And User click the 'Upload' button
    And Verify a error message '<errorMessage>' is shown under 'Select File' field

    Examples:
      | TC | action                                        | pathFile                                        | errorMessage             |
      | 10 | The file size attached is over the limitation | src/features/data/dataImport/fileOverLimitation | Attachment Size Exceeded |
      | 11 | The file type is not allowed                  | src/features/data/dataImport/test.xmind         | File type not allowed    |

  @ErrorCases
  Scenario: 12. Verify the admin can NOT import when No file selected
    Then Verify the main title 'Data Import' is displayed correctly
    And User click the 'Upload' button
    And Verify a error message 'Required' is shown under 'Select File' field
