@E2E @E2E-01
Feature: As a user, we can do the end to end flow to change password and update My Info of ESS account according to the record which submitted by admin account
    Background: Open browser
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And A user is on '/web/index.php/dashboard/index' page
        And Page title is 'OrangeHRM'
        And set:
            | randomString                       |
            | ${moment().format('YYMMDDHHmmss')} |

    @HappyCases
    Scenario: <TC>. Verify the ESS can change password and update "My Info" according the submitted data from Admin
        #Admin create the ESS account
        When A user can create an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}' and password '${process.env.HRM_PASSWORD_ESS}'
        And A user logout their account
        #ESS login the account and change password
        And A user login with username '${process.env.HRM_USERNAME_ESS}${randomString}' and password '${process.env.HRM_PASSWORD_ESS}'
        And A user click on Change Password in User Profile
        Then Verify the main title 'Update Password' is displayed correctly
        When Generating a new password with the length of '<passwordLength>' characters
        And A user input a value '${process.env.HRM_PASSWORD_ESS}' in the 'Current Password' field
        And A user input a value '${newPassword}' in the 'Password' field
        And A user input a value '${newPassword}' in the 'Confirm Password' field
        And User click the 'Save' button
        Then Verify alert message is 'Successfully Saved'
        When A user logout their account
        #ESS login the account with the new password successfully
        And A user login with username '${process.env.HRM_USERNAME_ESS}${randomString}' and decode password '${newPassword}'
        And A user logout their account
        #Admin add the new Nationality
        And A user logged in by admin role
        When A user click 'Admin' item in main menu
        And A user click 'Nationalities' item in topbar menu
        Then A user add new '<nationalityName>' nationality successfully
        Then Verify the '<nationalityName>' nationality is displayed in table
        # Admin Add the new Education
        And A user click 'Qualifications' dropdown and choose 'Education' item in topbar menu
        Then Add new education with '<educationname>' for 'Level' field
        Then Verify '<educationname>' is displayed in table after adding successfully
        # Admin Add the new skill
        And A user click 'Qualifications' dropdown and choose 'Skills' item in topbar menu
        Then Add new skill with '<skillName>' and '<skillDescription>'
        Then Verify the skill with title '<skillName>' and '<skillDescription>' are shown in the table
        # Admin Add the new languages
        And A user click 'Qualifications' dropdown and choose 'Languages' item in topbar menu
        Then I add the language '<language>'
        Then Verify '<language>' is displayed in table after adding successfully
        # Admin Add the new Licenses
        And A user click 'Qualifications' dropdown and choose 'Licenses' item in topbar menu
        Then I add the license '<license>'
        Then Verify '<license>' is displayed in table after adding successfully
        # ESS update the Nationality on the Personal Detail
        When A user logout their account
        And A user login with username '${process.env.HRM_USERNAME_ESS}${randomString}' and decode password '${newPassword}'
        And A user click 'My Info' item in main menu
        And A user update the Nationality '<nationalityName>' on personal detail
        And User click the 'Save' button
        # ESS update the Education, Skill, Languages, Licenses on the Qualifications
        When A user click on tab 'Qualifications'
        And A user update the Education '<educationname>' on qualifications
        And User click the 'Save' button
        Then Verify '<educationname>' is displayed in table after adding successfully
        And A user update the Skill with name '<skillName>' on qualifications
        And User click the 'Save' button
        Then Verify '<skillName>' is displayed in table after adding successfully
        And A user update the Languages '<language>' with Fluency 'Speaking' and Competency 'Good' on qualifications
        And User click the 'Save' button
        Then Verify '<language>' is displayed in table after adding successfully
        And A user update the Licenses '<license>' on qualifications
        And User click the 'Save' button
        Then Verify '<license>' is displayed in table after adding successfully
        # Clean the test data: ESS account
        And A user logout their account
        And A user logged in by admin role
        When A user click 'Admin' item in main menu
        And A user delete a record with key is '${process.env.HRM_USERNAME_ESS}${randomString}'
        And User click the 'Yes, Delete' button
        # Clean the test data: Nationality
        And A user click 'Nationalities' item in topbar menu
        # And Delete the record '<nationalityName>' to clean environment
        And A user delete '<nationalityName>' nationality to clean environment
        # Clean the test data: Education
        And A user click 'Qualifications' dropdown and choose 'Education' item in topbar menu
        And Delete the record '<educationname>' to clean environment
        # Clean the test data: Skill
        And A user click 'Qualifications' dropdown and choose 'Skills' item in topbar menu
        And Delete the record '<skillName>' to clean environment
        # Clean the test data: Language
        And A user click 'Qualifications' dropdown and choose 'Languages' item in topbar menu
        And Delete the record '<language>' to clean environment
        # Clean the test data: License
        And A user click 'Qualifications' dropdown and choose 'Licenses' item in topbar menu
        And Delete the record '<license>' to clean environment

        Examples:
            | TC       | passwordLength | nationalityName            | educationname            | skillName            | skillDescription                  | language                | license                | membership                |
            | E2E01-01 | 8              | Nationality${randomString} | Education${randomString} | Skill${randomString} | Skill Description ${randomString} | Language${randomString} | License${randomString} | Membership${randomString} |
