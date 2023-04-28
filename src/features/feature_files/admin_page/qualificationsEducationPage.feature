@AP @AP11
Feature: As a Admin, I can manage educations information in Qualifications session

  Background: Open browser, login and navigate to education page
    Given A user visits OrangeHRM page
    And A user logged in by admin role
    Then Verify the module page header is 'Dashboard'
    And A user is on '/web/index.php/dashboard/index' page
    And Page title is 'OrangeHRM'
    When A user click 'Admin' item in main menu
    And A user click 'Qualifications' dropdown and choose 'Education' item in topbar menu
    Then Verify the main title 'Education' is displayed
    And set:
      | randomString                       |
      | ${moment().format('YYMMDDHHmmss')} |

  @HappyCases
  Scenario Outline: <TC>. Verify user can add new educations successfully
    When Get number of records found in the education table
    And User click the 'Add' button
    Then Verify the main title 'Add Education' is displayed
    And Type text '<levelName>' for 'Level' field
    And User click the 'Save' button
    And Verify alert message is 'Successfully Saved'
    And Verify the total number of records found in the education table increase by '1' unit
    And Verify '<levelName>' is displayed in table after adding successfully
    And Delete the record '<levelName>' to clean environment

    Examples:
      | TC | levelName                            |
      | 01 | Bachelor\'s Degree${randomString}    |
      | 02 | College Undergraduate${randomString} |
      | 03 | High School Diploma${randomString}   |
      | 04 | Master\'s Degree${randomString}      |

  @HappyCases
  Scenario Outline: <TC>. Verify user can edit education successfully
    When Add new education with '<levelName>' for 'Level' field
    And Verify '<levelName>' is displayed in table after adding successfully
    When Get number of records found in the education table
    And A user click edit a record with key is '<levelName>'
    Then Verify the main title 'Edit Education' is displayed
    And Type text '<levelName>' for 'Level' field
    And User click the 'Save' button
    And Verify alert message is 'Successfully Updated'
    And Verify '<levelName>' is displayed in table after adding successfully
    And Delete the record '<levelName>' to clean environment

    Examples:
      | TC | levelName                                |
      | 05 | Bachelor\'s Degree Pro${randomString}    |
      | 06 | College Undergraduate Pro${randomString} |
      | 07 | High School Diploma Pro${randomString}   |
      | 08 | Master\'s Degree Pro${randomString}      |

  @HappyCases
  Scenario Outline: <TC>. Verify user can choose muptiple educations to delete successfully
    When Add new education with '<levelName1>' for 'Level' field
    And Verify '<levelName1>' is displayed in table after adding successfully
    And Add new education with '<levelName2>' for 'Level' field
    And Verify '<levelName2>' is displayed in table after adding successfully
    When Get number of records found in the education table
    And A user select checkbox with keys are '<levelName1>,<levelName2>'
    And Verify button with name 'Delete Selected' is visible
    And User click the 'Delete Selected' button
    And The popup with the question 'Are you Sure?' is displayed
    And User click the 'No, Cancel' button on pop-up
    And Verify button with name 'Delete Selected' is visible
    And User click the 'Delete Selected' button
    And User click the 'Yes, Delete' button on pop-up
    And Verify alert message is 'Successfully Deleted'
    And Verify the total number of records found in the education table decrease by '2' unit
    And Verify '<levelName1>' is not displayed in table after removing successfully
    And Verify '<levelName2>' is not displayed in table after removing successfully

    Examples:
      | TC | levelName1                | levelName2                 |
      | 09 | English B1${randomString} | Japanese N2${randomString} |

  @HappyCases
  Scenario Outline: <TC>. Verify user can delete an education successfully
    When Add new education with '<levelName>' for 'Level' field
    And Verify '<levelName>' is displayed in table after adding successfully
    When Get number of records found in the education table
    And A user delete a record with key is '<levelName>'
    And The popup with the question 'Are you Sure?' is displayed
    And User click the 'No, Cancel' button on pop-up
    And A user delete a record with key is '<levelName>'
    And User click the 'Yes, Delete' button on pop-up
    And Verify alert message is 'Successfully Deleted'
    And Verify the total number of records found in the education table decrease by '1' unit
    And Verify '<levelName1>' is not displayed in table after removing successfully

    Examples:
      | TC | levelName                     |
      | 10 | English Degree${randomString} |

  @ErrorCases
  Scenario Outline: <TC>. Verify user cannot add the existing education
    When Add new education with '<levelName>' for 'Level' field
    And Verify '<levelName>' is displayed in table after adding successfully
    And User click the 'Add' button
    Then Verify the main title 'Add Education' is displayed
    And Type text '<levelName>' for 'Level' field
    And User click the 'Save' button
    Then Verify a error message 'Already exists' is shown under 'Level' field
    And User click the 'Cancel' button
    And Delete the record '<levelName>' to clean environment

    Examples:
      | TC | levelName                                 |
      | 11 | Bachelor\'s Degree Vip Pro${randomString} |

  @ErrorCases
  Scenario Outline: <TC>. Verify user cannot add a education longer than the specified character limit.
    When User click the 'Add' button
    Then Verify the main title 'Add Education' is displayed
    And Type text level name from 'src/features/data/qualifications/errorMessageEducations.csv'
    Then Verify a error message '<errorMessage>' is shown under 'Level' field

    Examples:
      | TC | errorMessage                     |
      | 12 | Should not exceed 100 characters |

  @ErrorCases
  Scenario: 13. Verify user cannot leave empty education name
    When User click the 'Add' button
    Then Verify the main title 'Add Education' is displayed
    And User click the 'Save' button
    Then Verify a error message 'Required' is shown under 'Level' field
