@E01 @AP03
Feature: As a admin, we can add, edit and delete a Pay Grades, then add, edit, delete the Currency inside on the Job page

    Background: Open browser, login and navigate to the Job Titles page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Job' dropdown and choose 'Pay Grades' item in topbar menu
        Then Verify the main title 'Pay Grades' is displayed correctly
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario Outline: <TC>. Verify the pay grades be added to system successfully with currency is blank
        And User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Enter Name '<name>'
        And User click the 'Save' button
        Then Verify the main title '<editTitle>' is displayed correctly
        And User click the 'Cancel' button
        Then Verify the Pay Grade records with name '<name>' and '<currency>' is added successfully
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | addTitle      | name                   | editTitle      | currency |
            | 01 | Add Pay Grade | Grade01${randomString} | Edit Pay Grade |          |

    @HappyCases
    Scenario Outline: <TC>. Verify the pay grades be added to system successfully with a single currency <note>
        And User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Enter Name '<name>'
        And User click the 'Save' button
        Then Verify the main title '<editTitle>' is displayed correctly
        And User click the 'Add' button
        And A user select option '<currency>' in dropdown 'Currency'
        And Enter '<minimumSalary>' into 'Minimum Salary'
        And Enter '<maximumSalary>' into 'Maximum Salary'
        And Select the 'Save' button on section 'Add Currency'
        Then Verify the Currencies records with name '<expectedCurrency>', minimum salary '<expectedMinimumSalary>' and maximum '<expectedMaximumSalary>' is added successfully
        And User click the 'Cancel' button
        Then Verify the Pay Grade records with name '<name>' and '<expectedCurrency>' is added successfully
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | note                                    | addTitle      | name                   | editTitle      | currency                 | expectedCurrency   | minimumSalary | maximumSalary | expectedMinimumSalary | expectedMaximumSalary |
            | 02 | in case full value                      | Add Pay Grade | Grade02${randomString} | Edit Pay Grade | ALL - Albanian Lek       | Albanian Lek       | 1             | 5             | 1.00                  | 5.00                  |
            | 03 | in case null maximum salary             | Add Pay Grade | Grade03${randomString} | Edit Pay Grade | NZD - New Zealand Dollar | New Zealand Dollar | 3             |               | 3.00                  | 0.00                  |
            | 04 | in case null minimum salary             | Add Pay Grade | Grade04${randomString} | Edit Pay Grade | VND - Vietnamese Dong    | Vietnamese Dong    |               | 100           | 0.00                  | 100.00                |
            | 05 | in case null minimum and maximum salary | Add Pay Grade | Grade05${randomString} | Edit Pay Grade | VND - Vietnamese Dong    | Vietnamese Dong    |               |               |                       |                       |

    @HappyCases
    Scenario Outline: <TC>. Verify the pay grades be added to system successfully with multiple currencies
        When User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Enter Name '<name>'
        And User click the 'Save' button
        Then Verify the main title '<editTitle>' is displayed correctly
        And Add the new Currency with '<currency1>'
        And Add the new Currency with '<currency2>'
        And User click the 'Cancel' button
        Then Verify the Pay Grade records with name '<name>' and '<expectedCurrency>' is added successfully
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | addTitle      | name                   | editTitle      | currency1                | currency2          | expectedCurrency                |
            | 06 | Add Pay Grade | Grade06${randomString} | Edit Pay Grade | AOR - Angolan New Kwanza | TRL - Turkish Lira | Angolan New Kwanza,Turkish Lira |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error appears when adding the Pay Grade with null value for Name
        When User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field

        Examples:
            | TC | addTitle      |
            | 07 | Add Pay Grade |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error appears when adding the currence with <note>
        When Add the new Pay Grade with '<name>'
        Then Verify the main title '<editTitle>' is displayed correctly
        And User click the 'Add' button
        And Select the 'Save' button on section 'Add Currency'
        Then Verify a error message 'Required' is shown under 'Currency' field
        And A user select option '<currency>' in dropdown 'Currency'
        And Enter '<minimumSalary>' into 'Minimum Salary'
        And Enter '<maximumSalary>' into 'Maximum Salary'
        Then Verify a error message 'Should be higher than Minimum Salary' is shown under 'Maximum Salary' field
        And User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | addTitle      | note                           | name                   | editTitle      | currency             | minimumSalary | maximumSalary |
            | 08 | Add Pay Grade | minimum is higher than maximum | Grade08${randomString} | Edit Pay Grade | GMD - Gambian Dalasi | 5             | 4             |
            | 09 | Add Pay Grade | minimum is equal than maximum  | Grade09${randomString} | Edit Pay Grade | GMD - Gambian Dalasi | 4             | 4             |

    @ErrorCases
    Scenario Outline: <TC>. Verify the admin can NOT add the duplicated Pay Grade
        When Add the new Pay Grade with '<name>'
        Then Verify the main title '<editTitle>' is displayed correctly
        And User click the 'Cancel' button
        And User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Enter Name '<name>'
        Then Verify a error message 'Already exists' is shown under 'Name' field
        And User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | name                   | addTitle      | editTitle      |
            | 10 | Grade10${randomString} | Add Pay Grade | Edit Pay Grade |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete an existing Pay Grade
        When Add the new Pay Grade with '<name>'
        And User click the 'Cancel' button
        And Select the trash icon of Pay Grade '<name>'
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is not displayed
        And Select the trash icon of Pay Grade '<name>'
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify the Pay Grade records '<name>' is removed successfully

        Examples:
            | TC | name                   |
            | 11 | Grade11${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete the multiple existing Pay Grade
        When Add the new Pay Grade with '<name1>'
        And User click the 'Cancel' button
        And Add the new Pay Grade with '<name2>'
        And User click the 'Cancel' button
        And A user select checkbox with keys are '<name1>,<name2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is not displayed
        And User click the 'Delete Selected' button
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify the Pay Grade records '<name1>' is removed successfully
        Then Verify the Pay Grade records '<name2>' is removed successfully

        Examples:
            | TC | name1                    | name2                    |
            | 12 | Grade12_1${randomString} | Grade12_2${randomString} |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can delete an existing Currency
        When Add the new Pay Grade with '<name>'
        Then Verify the main title '<editTitle>' is displayed correctly
        And Add the new Currency with '<currency>'
        And Select the trash icon of Currency '<expectedCurrency>'
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is not displayed
        And Select the trash icon of Currency '<expectedCurrency>'
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify the Currency records '<expectedCurrency>' is removed successfully
        And User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | name                   | editTitle      | currency                 | expectedCurrency   |
            | 13 | Grade13${randomString} | Edit Pay Grade | AOR - Angolan New Kwanza | Angolan New Kwanza |

    @Happycases
    Scenario Outline: <TC>. Verify the admin can delete an existing Currency
        When Add the new Pay Grade with '<name>'
        Then Verify the main title '<editTitle>' is displayed correctly
        And Add the new Currency with '<currency1>'
        And Add the new Currency with '<currency2>'
        And A user select checkbox with keys are '<expectedCurrency1>,<expectedCurrency2>'
        And User click the 'Delete Selected' button
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'No, Cancel' button on pop-up
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is not displayed
        And User click the 'Delete Selected' button
        Then The popup with the question 'The selected record will be permanently deleted. Are you sure you want to continue?' is displayed
        And User click the 'Yes, Delete' button on pop-up
        Then Verify alert message is 'Successfully Deleted'
        Then Verify the Currency records '<expectedCurrency1>' is removed successfully
        Then Verify the Currency records '<expectedCurrency2>' is removed successfully
        And User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | name                   | editTitle      | currency1                | currency2          | expectedCurrency1  | expectedCurrency2 |
            | 14 | Grade14${randomString} | Edit Pay Grade | AOR - Angolan New Kwanza | TRL - Turkish Lira | Angolan New Kwanza | Turkish Lira      |

    @HappyCases
    Scenario Outline: <TC>. Verify the admin can edit the Pay Grade and Curency
        When Add the new Pay Grade with '<name>'
        And Add the new Currency with '<currency>'
        Then Verify the Currencies records with name '<expectedCurrency>', minimum salary '0.00' and maximum '0.00' is added successfully
        And User click the 'Cancel' button
        And A user click edit a record with key is '<name>'
        And Enter Name '<nameEdited>'
        And User click the 'Save' button
        And User click the 'Cancel' button
        Then Verify the Pay Grade records with name '<nameEdited>' and '<expectedCurrency>' is added successfully
        And A user click edit a record with key is '<nameEdited>'
        Then Verify the main title 'Edit Pay Grade' is displayed correctly
        And A user click edit a record with key is '<expectedCurrency>'
        And Enter '<minimumSalary>' into 'Minimum Salary'
        And Enter '<maximumSalary>' into 'Maximum Salary'
        And Select the 'Save' button on section 'Edit Currency'
        Then Verify the Currencies records with name '<expectedCurrency>', minimum salary '<expectedMinimumSalary>' and maximum '<expectedMaximumSalary>' is added successfully
        And User click the 'Cancel' button
        And Delete the record '<nameEdited>' to clean environment
        And Verify '<nameEdited>' is not displayed in table after removing successfully

        Examples:
            | TC | name                   | nameEdited                    | currency                 | expectedCurrency   | minimumSalary | maximumSalary | expectedMinimumSalary | expectedMaximumSalary |
            | 15 | Grade15${randomString} | Grade15_Edited${randomString} | AOR - Angolan New Kwanza | Angolan New Kwanza | 450           | 5000          | 450.00                | 5000.00               |

    @ErrorCases
    Scenario Outline: <TC>. Verify the error massage when entering the invalid value for Pay Grade and Currency
        When User click the 'Add' button
        Then Verify the main title '<addTitle>' is displayed correctly
        And Generate and enter '51' characters to Pay Grade Name text box
        Then Verify a error message 'Should not exceed 50 characters' is shown under 'Name' field
        And Enter Name '<name>'
        And User click the 'Save' button
        Then Verify the main title '<editTitle>' is displayed correctly
        And User click the 'Add' button
        And Enter '<numberOutRange>' into 'Minimum Salary'
        Then Verify a error message 'Should be less than 1,000,000,000' is shown under 'Minimum Salary' field
        And Enter '<string>' into 'Minimum Salary'
        Then Verify a error message 'Should be a number' is shown under 'Minimum Salary' field
        And Enter '4' into 'Minimum Salary'
        And Enter '<numberOutRange>' into 'Maximum Salary'
        Then Verify a error message 'Should be less than 1,000,000,000' is shown under 'Maximum Salary' field
        And Enter '<string>' into 'Maximum Salary'
        Then Verify a error message 'Should be a number' is shown under 'Maximum Salary' field
        And User click the 'Cancel' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | TC | addTitle      | name                   | editTitle      | numberOutRange | string |
            | 16 | Add Pay Grade | Grade16${randomString} | Edit Pay Grade | 1000000000     | 1,00   |