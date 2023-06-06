@E2E @E2E-02
Feature: E2E As a user, we can submit the leave record

    Background: Open browser
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        Then Verify the module page header is 'Dashboard'
        Then A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        And set:
            | randomString  |
            | ${Date.now()} |

    Scenario Outline: E2E02-01. Verify Admin can approve/rejeject the ESS's leave record which submited by ESS
        #  Admin add employee
        When A user go to Add Employee page
        And A user create new employee with information 'empID', 'empName' and account 'empAcc' from json file successfully
        # Admin configure/Leave Types on Leave page
        When A user go to Leave Types page
        When A user create leaves type with name '<leaveType1>' successfully
        And A user create leaves type with name '<leaveType2>' successfully
        Then Verify '<leaveType1>' is displayed in table after adding successfully
        Then Verify '<leaveType2>' is displayed in table after adding successfully
        # Admin add Entitlement
        When A user go to Add Entitlements page
        And A user create new Entitlement with '<employeeName>', '<leaveType1>' and entitle value '10.00' successfully
        And Verify '<leaveType1>' is displayed in table after adding successfully
        When A user go to Add Entitlements page
        And A user create new Entitlement with '<employeeName>', '<leaveType2>' and entitle value '14.00' successfully
        And Verify '<leaveType2>' is displayed in table after adding successfully
        And A user logout their account
        And A user login with username '<employeeUsername>' and password '<employeePassword>'
        And A user go to My Entitlements page
        And Verify '<leaveType1>' is displayed in table after adding successfully
        And Verify '<leaveType2>' is displayed in table after adding successfully
        # ESS submit a leave (Leave -> Apply)
        When A user go to Apply Leave page
        When A user submit a leave with infor leave type '<leaveType1>' balance '10.00 Day(s)', duration 'Full Day' from '2023-05-29' to '2023-05-29'
        When A user go to Apply Leave page
        When A user submit a leave with infor leave type '<leaveType2>' balance '14.00 Day(s)', duration 'Full Day' from '2023-05-31' to '2023-05-31'
        # ESS review leave record on My leave page
        When A user go to My Leave page
        Then Verify status leave type '<leaveType1>' in date '2023-05-29' of user '<employeeName>' display in table is 'Pending Approval (1.00)'
        And Verify status leave type '<leaveType2>' in date '2023-05-31' of user '<employeeName>' display in table is 'Pending Approval (1.00)'
        # Admin search and view the leave record of ESS account
        And A user logout their account
        And A user logged in by admin role
        When A user go to Leave List page
        When A user filter leave by employee name '<employeeName>'
        Then Verify '<leaveType1>' is displayed in table after adding successfully
        Then Verify '<leaveType2>' is displayed in table after adding successfully
        # Admin approve the ESS leave request
        When A user approve '<leaveType1>' leave
        Then Verify alert message is 'Successfully Updated'
        And Verify '<leaveType1>' is not displayed in table leaves after approving successfully
        # Admin approve the ESS leave request
        When A user reject '<leaveType2>' leave
        Then Verify alert message is 'Successfully Updated'
        And Verify '<leaveType2>' is not displayed in table leaves after approving successfully
        # ESS view the leave type after Admin approve/reject
        When A user logout their account
        And A user login with username '<employeeUsername>' and password '<employeePassword>'
        And A user go to My Leave page
        Then Verify status leave type '<leaveType1>' in date '2023-05-29' of user '<employeeName>' display in table is 'Taken (1.00)'
        And Verify status leave type '<leaveType2>' in date '2023-05-31' of user '<employeeName>' display in table is 'Rejected (1.00'
        # Admin Clean up the data test
        And A user logout their account
        And A user logged in by admin role
        When A user go to Employee List page
        When Delete the record '<employeeID>' to clean environment
        When A user go to Leave Types page
        And Delete the record '<leaveType1>' to clean environment
        And Delete the record '<leaveType2>' to clean environment

        Examples:
            | employeeName | employeeID | employeeUsername   | employeePassword   | leaveType1               | leaveType2            |
            | ${empName}   | ${empID}   | ${empAcc.username} | ${empAcc.password} | personal-${randomString} | anual-${randomString} |