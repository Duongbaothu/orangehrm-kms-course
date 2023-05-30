@E01 @AP08
Feature: As an Admin, I can manage Locations in Organization session

    Background: Open browser and navigate to the specific page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Organization' dropdown and choose 'Locations' item in topbar menu
        Then Verify the module page header is 'Admin'
        And Verify the level page header is 'Organization'
        And set:
            | randomNumber                          | randomStr                               |
            | ${Math.floor(Math.random() * 999999)} | ${Math.random().toString(36).slice(-8)} |
        And set:
            | locationName     | city             | state             | zipCode               | country  | phone                | fax                  | address                             | note             |
            | Name${randomStr} | City${randomStr} | State${randomStr} | zip - ${randomNumber} | Viet Nam | +-() ${randomNumber} | +-() ${randomNumber} | ${randomNumber} address${randomStr} | note${randomStr} |

    @HappyCases
    Scenario: <No>. Verify that it is possible to ADD location then search that location with <case> info
        When User click the 'Add' button
        Then Verify the main title 'Add Location' is displayed correctly
        When A user type '<name>' into 'Name'
        And A user type '<city>' into 'City'
        And A user type '<state>' into 'State/Province'
        And A user type '<zipCode>' into 'Zip/Postal Code'
        And A user select option '<country>' in dropdown 'Country'
        And A user type '<phone>' into 'Phone'
        And A user type '<fax>' into 'Fax'
        And A user type '<address>' into textarea 'Address'
        And A user type '<note>' into textarea 'Notes'
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        And Verify '<name>' is displayed in table after adding successfully 
        When A user type '<name>' into 'Name'
        And A user type '<city>' into 'City'
        And A user select option '<country>' in dropdown 'Country'
        When User click the 'Search' button
        Then Verify '<name>' is displayed in table after adding successfully 
        And <actionWithValueOfCity>
        And Verify country of location '<name>' is '<country>' showing correctly in table
        And <actionWithValueOfPhone>
        And Verify number of employees of location '<name>' is '0' showing correctly in table
        When User click the 'Reset' button
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | No | case         | name             | city             | state             | zipCode               | country   | phone                | fax                  | address                             | note             | actionWithValueOfCity                                                                       | actionWithValueOfPhone                                                                           |
            | 01 | full         | Name${randomStr} | City${randomStr} | State${randomStr} | zip - ${randomNumber} | Viet Nam  | +-() ${randomNumber} | +-() ${randomNumber} | ${randomNumber} address${randomStr} | note${randomStr} | Verify city of location 'Name${randomStr}' is 'City${randomStr}' showing correctly in table | Verify phone of location 'Name${randomStr}' is '+-() ${randomNumber}' showing correctly in table |
            | 02 | full require | Name${randomStr} |                  |                   |                       | Australia |                      |                      |                                     |                  | Verify city of location 'Name${randomStr}' is empty in table                                | Verify phone of location 'Name${randomStr}' is empty in table                                    |

    @HappyCases
    Scenario: 03. Verify 2 locations are added succesfully with .csv file
        When Add multiple locations with .csv file in 'src/features/data/organization/locations.csv'
        Given set 'location1' to '${lastRun[0]}'
        Given set 'location2' to '${lastRun[1]}'
        Then Verify '${location1}' is displayed in table after adding successfully
        And Verify '${location1}' is displayed in table after adding successfully
        When Delete the record '${location1}' to clean environment
        And Delete the record '${location2}' to clean environment
        Then Verify '${location1}' is not displayed in table after removing successfully
        And Verify '${location2}' is not displayed in table after removing successfully

    @ErrorCases
    Scenario: 04. Verify error message 'Required' is shown under Name and Country when missing all field in Add form
        When User click the 'Add' button
        Then Verify the main title 'Add Location' is displayed correctly
        And User click the 'Save' button
        Then Verify a error message 'Required' is shown under 'Name' field
        And Verify a error message 'Required' is shown under 'Country' field

    @ErrorCases
    Scenario: <No>. Verify error message '<errorMsg>' is shown under <field> when <case> in Add form
        When User click the 'Add' button
        And Verify the main title 'Add Location' is displayed correctly
        When <action>
        Then Verify a error message '<errorMsg>' is shown under '<field>' field
        
        Examples:
            | No | field           | case                                              | action                                                                  | errorMsg                          |
            | 05 | City            | type 51 characters                                | A user type random string with length '51' into field 'City'            | Should not exceed 50 characters   |
            | 06 | State/Province  | type 51 characters                                | A user type random string with length '51' into field 'State/Province'  | Should not exceed 50 characters   |
            | 07 | Zip/Postal Code | type 31 characters                                | A user type random string with length '31' into field 'Zip/Postal Code' | Should not exceed 30 characters   |
            | 08 | Phone           | type 31 characters                                | A user type random string with length '31' into field 'Phone'           | Should not exceed 30 characters   |
            | 09 | Phone           | type letter                                       | A user type '${randomStr}' into 'Phone'                                 | Allows numbers and only + - / ( ) |
            | 10 | Phone           | type contains special characters other than +-/() | A user type '!' into 'Phone'                                            | Allows numbers and only + - / ( ) |
            | 11 | Fax             | type 31 characters                                | A user type random string with length '31' into field 'Fax'             | Should not exceed 30 characters   |
            | 12 | Fax             | type letter                                       | A user type '${randomStr}' into 'Fax'                                   | Allows numbers and only + - / ( ) |
            | 13 | Fax             | type contains special characters other than +-/() | A user type '%' into 'Fax'                                              | Allows numbers and only + - / ( ) |
            | 14 | Address         | type 251 characters                               | A user type random string with length '251' into textarea 'Address'     | Should not exceed 250 characters  |
            | 15 | Notes           | type 251 characters                               | A user type random string with length '251' into textarea 'Notes'       | Should not exceed 250 characters  |

    @ErrorCases
    Scenario: 16. Verify error message "Already exists" when type already exist location in Add form
        When Add a locations with '${locationName},,,,${country},,,,'
        And Verify '${locationName}' is displayed in table after adding successfully 
        When User click the 'Add' button
        And A user type '${locationName}' into 'Name'
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And A user delete a record with key is '${locationName}'
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '${locationName}' is not displayed in table after removing successfully

    @HappyCases
    Scenario: <No>. Verify location is searched successfully with <field> field
        When Add a locations with '${locationName},${city},,,${country},${phone},,,'
        And Verify '${locationName}' is displayed in table after adding successfully 
        When A user type '<name>' into 'Name'
        And A user type '<city>' into 'City'
        And A user select option '<country>' in dropdown 'Country'
        And User click the 'Search' button
        Then Verify '${locationName}' is displayed in table after adding successfully
        And Verify city of location '${locationName}' is 'City${randomStr}' showing correctly in table
        And Verify country of location '${locationName}' is 'Viet Nam' showing correctly in table
        And Verify phone of location '${locationName}' is '+-() ${randomNumber}' showing correctly in table
        And Verify number of employees of location '${locationName}' is '0' showing correctly in table
        When User click the 'Reset' button
        And Delete the record '${locationName}' to clean environment
        And Verify '${locationName}' is not displayed in table after removing successfully

        Examples:
            | No | field         | name            | city    | country      |
            | 17 | Name          | ${locationName} |         | -- Select -- |
            | 18 | City          |                 | ${city} | -- Select -- |
            | 19 | Country       |                 |         | Viet Nam     |
            | 20 | Name, City    | ${locationName} | ${city} | -- Select -- |
            | 21 | Name, Country | ${locationName} |         | Viet Nam     |
            | 22 | City, Country |                 | ${city} | Viet Nam     |

    @ErrorCases
    Scenario: <No>. Verify message 'No Records Found' is shown successfully when type nonexisting <field>
        When <action>
        And User click the 'Search' button
        And Verify alert message is 'No Records Found'

        Examples:
            | No | field   | action                                                   |
            | 23 | Name    | A user type 'Name${randomStr}' into 'Name'               |
            | 24 | City    | A user type 'City${randomStr}' into 'City'               |
            | 25 | Country | A user select option 'Afghanistan' in dropdown 'Country' |

    @HappyCases
    Scenario: <No>. Verify <field> is edited successfully in Edit form
        When Add a locations with '${locationName},${city},,,${country},${phone},,,'
        And A user click edit a record with key is '${locationName}'
        And Verify the main title 'Edit Location' is displayed correctly
        And <action>
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        Then Verify '<name>' is displayed in table after adding successfully
        And Verify city of location '<name>' is '<expectedCity>' showing correctly in table
        And Verify country of location '<name>' is '<expectedCountry>' showing correctly in table
        And Verify phone of location '<name>' is '<expectedPhone>' showing correctly in table
        And Verify number of employees of location '<name>' is '0' showing correctly in table
        And Delete the record '<name>' to clean environment
        And Verify '<name>' is not displayed in table after removing successfully

        Examples:
            | No | field   | name             | action                                              | expectedCity | expectedCountry | expectedPhone |
            | 26 | Name    | ${locationName}E | A user type '${locationName}E' into 'Name'          | ${city}      | Viet Nam        | ${phone}      |
            | 27 | City    | ${locationName}  | A user type '${city}E' into 'City'                  | ${city}E     | Viet Nam        | ${phone}      |
            | 28 | Country | ${locationName}  | A user select option 'Canada' in dropdown 'Country' | ${city}      | Canada          | ${phone}      |
            | 29 | Phone   | ${locationName}  | A user type '${phone}1' into 'Phone'                | ${city}      | Viet Nam        | ${phone}1     |
        
    @HappyCases
    Scenario: <No>. Verify <field> is edited successfully in Edit form
        When Add a locations with '${locationName},,${state},${zipCode},${country},,${fax},${address},${note}'
        And A user click edit a record with key is '${locationName}'
        And Verify the main title 'Edit Location' is displayed correctly
        And <action>
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Updated'
        And Verify '${locationName}' is displayed in table after adding successfully
        When A user click edit a record with key is '${locationName}'
        Then Verify value of '<field>' <type> in form equal to '<expectedValue>'
        When User click the 'Cancel' button
        And Delete the record '${locationName}' to clean environment
        And Verify '${locationName}' is not displayed in table after removing successfully

        Examples:
            | No | field           | action                                                      | expectedValue          | type     |
            | 30 | State/Province  | A user type 'State${randomStr}E' into 'State/Province'      | State${randomStr}E     | textbox  |
            | 31 | Zip/Postal Code | A user type 'zip - ${randomNumber}E' into 'Zip/Postal Code' | zip - ${randomNumber}E | textbox  |
            | 32 | Fax             | A user type '+-() ${randomNumber}1' into 'Fax'              | +-() ${randomNumber}1  | textbox  |
            | 33 | Address         | A user type 'address${randomStr}E' into textarea 'Address'  | address${randomStr}E   | textarea |
            | 34 | Note            | A user type 'note${randomStr}E' into textarea 'Note'        | note${randomStr}E      | textarea |

    @ErrorCases
    Scenario: <No>. Verify error message 'Allows numbers and only + - / ( )' is shown under <field> when <case> in Edit form
        When Add a locations with '${locationName},,,,${country},,,,'
        And A user click edit a record with key is 'Name${randomStr}'
        And Verify the main title 'Edit Location' is displayed correctly
        When <action>
        Then Verify a error message '<errorMsg>' is shown under '<field>' field
        When User click the 'Cancel' button
        And Delete the record '${locationName}' to clean environment
        And Verify '${locationName}' is not displayed in table after removing successfully

        Examples:
            | No | field           | case                                              | action                                                                  | errorMsg                          |
            | 35 | City            | type 51 characters                                | A user type random string with length '51' into field 'City'            | Should not exceed 50 characters   |
            | 36 | State/Province  | type 51 characters                                | A user type random string with length '51' into field 'State/Province'  | Should not exceed 50 characters   |
            | 37 | Zip/Postal Code | type 31 characters                                | A user type random string with length '31' into field 'Zip/Postal Code' | Should not exceed 30 characters   |
            | 38 | Phone           | type 31 characters                                | A user type random string with length '31' into field 'Phone'           | Should not exceed 30 characters   |
            | 39 | Phone           | type letter                                       | A user type '${randomStr}' into 'Phone'                                 | Allows numbers and only + - / ( ) |
            | 40 | Phone           | type contains special characters other than +-/() | A user type '!' into 'Phone'                                            | Allows numbers and only + - / ( ) |
            | 41 | Fax             | type 31 characters                                | A user type random string with length '31' into field 'Fax'             | Should not exceed 30 characters   |
            | 42 | Fax             | type letter                                       | A user type '${randomStr}' into 'Fax'                                   | Allows numbers and only + - / ( ) |
            | 43 | Fax             | type contains special characters other than +-/() | A user type '%' into 'Fax'                                              | Allows numbers and only + - / ( ) |
            | 44 | Address         | type 251 characters                               | A user type random string with length '251' into textarea 'Address'     | Should not exceed 250 characters  |
            | 45 | Note            | type 251 characters                               | A user type random string with length '251' into textarea 'Note'        | Should not exceed 250 characters  |

    @ErrorCases
    Scenario: 46. Verify error message "Already exists" is displayed successfully when type already exist location in Edit form
        When Add multiple locations with .csv file in 'src/features/data/organization/locations.csv'
        Given set 'location1' to '${lastRun[0]}'
        Given set 'location2' to '${lastRun[1]}'
        Then Verify '${location1}' is displayed in table after adding successfully
        And Verify '${location1}' is displayed in table after adding successfully
        And A user click edit a record with key is '${location1}'
        And Verify the main title 'Edit Location' is displayed correctly
        And A user type '${location2}' into 'Name'
        Then Verify a error message 'Already exists' is shown under 'Name' field
        When User click the 'Cancel' button
        And Delete the record '${location1}' to clean environment
        And Delete the record '${location2}' to clean environment
        And Verify '${location1}' is not displayed in table after removing successfully
        And Verify '${location2}' is not displayed in table after removing successfully

    @HappyCases
    Scenario: 47. Verify location is deleted successfully
        When Add a locations with '${locationName},,,,${country},,,,'
        And Verify '${locationName}' is displayed in table after adding successfully 
        And A user delete a record with key is '${locationName}'
        And User click the 'Yes, Delete' button
        Then Verify alert message is 'Successfully Deleted'
        And Verify '${locationName}' is not displayed in table after removing successfully
