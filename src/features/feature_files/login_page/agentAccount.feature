Feature: As an Agent, I need the ability to login with the account I signed up

    Background: Create the e new agent account
        Given A user visits 'https://phptravels.net'
        Then Page title is 'PHPTRAVELS | Travel Technology Partner - PHPTRAVELS'
        And set:
            | randomString                       |
            | ${moment().format("YYMMDDHHmmss")} |

    Scenario: User has need the ability to login with the Agent account
        When set:
            | firstName            | lastName            | phone   | email                      | password        |
            | First${randomString} | Last${randomString} | 1234567 | seleniumtraining@gmail.com | ${randomString} |
        And 'Agents Signup' with '${firstName}','${lastName}','${phone}','${email}','${password}'
        Then User select 'Agents Login' option on Account dropdown list
        And User Switch to the new tab for log in
        And Page title is 'Login - PHPTRAVELS'
        And User type '${email}' into email
        And User type '${password}' into password
        And User click Login button
        Then Page title is 'Dashboard - PHPTRAVELS'

    Scenario Outline: User can not login with the Agent account when <TC>
        When User select 'Agents Login' option on Account dropdown list
        And User Switch to the new tab for log in
        Then Page title is 'Login - PHPTRAVELS'
        And User type '<email>' into email
        And User type '<password>' into password
        When User click Login button
        Then The message '<message>' is present under '<fieldName>' field
        Examples:
            | TC                 | email            | password | fieldName | message                     |
            | Email is missed    |                  | 123456   | Email     | Please fill out this field. |
            | Password is missed | test02@gmail.com |          | Password  | Please fill out this field. |

    Scenario Outline: User can not login with the Agent account when <TC>
        When User select 'Agents Login' option on Account dropdown list
        And User Switch to the new tab for log in
        Then Page title is 'Login - PHPTRAVELS'
        And User type '<email>' into email
        And User type '<password>' into password
        When User click Login button
        Then The error 'Wrong credentials. try again!' is present
        Examples:
            | TC               | email                | password |
            | invalid Email    | automation@gmail.com | 123456   |
            | invalid Password | test02@gmail.com     | ttttt    |