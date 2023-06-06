@DP @DP07
Feature: As a Admin, I can track exactly employee distribution by Location

    Background: Open browser, login and navigate to the Dashboard page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        And set:
            | randomString  |
            | ${Date.now()} |

    @HappyCases
    Scenario Outline: <TC>. Verify the chart displays a new record with correct percentage
        When A user add new location '<location>' in country '<country>'
        Then Verify '<location>' is displayed in table after adding successfully
        And A user add new employee with '<id>', '<firstName>' and '<lastName>' with '<location>'
        And A user click 'Dashboard' item in main menu
        Then I verify the '<location>' is displayed on chart
        And I verify the percentage of in the chart is correct
        When I delete the location '<location>' to clean environment
        When I delete the employee by '<id>' to clean environment

        Examples:
            | TC | location                 | country  | id       | firstName | lastName |
            | 01 | Tan Vien ${randomString} | Viet Nam | 21120001 | Lan       | Tran     |

    @HappyCases
    Scenario Outline: <TC>. Verify the chart displays some new records with correct percentage
        When A user add new location '<location>' in country '<country>'
        Then Verify '<location>' is displayed in table after adding successfully
        And A user add new employee with '<id1>', '<firstName1>' and '<lastName1>' with '<location>'
        And A user add new employee with '<id2>', '<firstName2>' and '<lastName2>' with '<location>'
        And A user click 'Dashboard' item in main menu
        Then I verify the '<location>' is displayed on chart
        And I verify the percentage of in the chart is correct
        When I delete the location '<location>' to clean environment
        When I delete the employee by '<id1>' to clean environment
        When I delete the employee by '<id2>' to clean environment

        Examples:
            | TC | location                 | country  | id1      | firstName1 | lastName1 | id2        | firstName2 | lastName2 |
            | 02 | Tan Vien ${randomString} | Viet Nam | 21120006 | Lan        | Tran      | 21120003_1 | Leo        | Nguyen    |

    @HappyCases
    Scenario Outline: <TC>. Verify the chart displays a new employee record without location
        When A user add new employee with '<id>', '<firstName>' and '<lastName>' with '<location>'
        And A user click 'Dashboard' item in main menu
        And I verify the percentage of in the chart is correct
        When I delete the employee by '<id>' to clean environment

        Examples:
            | TC | id       | firstName | lastName | location |
            | 03 | 21120004 | Lan       | Tran     |          |

    @HappyCases
    Scenario Outline: <TC>. Verify the chart displays a new record with correct percentage and disappear after choose the title
        When A user add new location '<location>' in country '<country>'
        Then Verify '<location>' is displayed in table after adding successfully
        And A user add new employee with '<id>', '<firstName>' and '<lastName>' with '<location>'
        And A user click 'Dashboard' item in main menu
        Then I verify the '<location>' is displayed on chart
        And I verify the percentage of in the chart is correct
        When I click on title '<location>' on the chart
        Then I verify the '<location>' is disappeared on the chart
        When I delete the location '<location>' to clean environment
        When I delete the employee by '<id>' to clean environment

        Examples:
            | TC | location                | country       | id       | firstName | lastName |
            | 04 | Atlanta ${randomString} | United States | 21120005 | Lan       | Tran     |