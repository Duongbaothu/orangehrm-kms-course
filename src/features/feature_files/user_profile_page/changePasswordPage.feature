@LP @LP03
Feature: As a user, I am able to change my password

    Background: Open the browser
        Given A user visits OrangeHRM page
        Then Page title is 'OrangeHRM'
        When set:
          | randomString                       |
          | ${moment().format('YYMMDDHHmmss')} |
        And A user logged in by admin role
        And A user can create an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}' and password '${process.env.HRM_PASSWORD_ESS}'
        And A user logout their account
        And A user login with username '${process.env.HRM_USERNAME_ESS}${randomString}' and password '${process.env.HRM_PASSWORD_ESS}'
        And A user click on Change Password in User Profile
        Then Verify the main title 'Update Password' is displayed correctly

    @HappyCases
    Scenario Outline: <TC>. Verify that the user can change the password successfully when providing <testCases>
        When Generating a new password with the length of '<passwordLength>' characters
        And A user input a value '${process.env.HRM_PASSWORD_ESS}' in the 'Current Password' field
        And A user input a value '${newPassword}' in the 'Password' field
        And A user input a value '${newPassword}' in the 'Confirm Password' field
        And User click the 'Save' button
        Then Verify alert message 'Successfully Saved' is displayed
        When A user logout their account
        And A user can delete an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}'

        Examples:
          | TC | testCases                                                         | passwordLength |
          | 01 | a new valid password which has a length greater than 8 characters | 9              |
          | 02 | a new valid password which has a length of 8 characters           | 8              |
          | 03 | a new valid password which has a length of 63 characters          | 63             |
          | 04 | a new valid password which has a length of 64 characters          | 64             |

    @ErrorCases
    Scenario Outline: <TC>. Verify that the user can not change the password when providing <testCases>
        When Generating a new password with the length of '<passwordLength>' characters
        And A user input a value '${process.env.HRM_PASSWORD_ESS}' in the 'Current Password' field
        And A user input a value '${newPassword}' in the 'Password' field
        And A user input a value '${newPassword}' in the 'Confirm Password' field
        And User click the 'Save' button
        Then Verify a error message '<message>' is shown under '<fieldName>' field
        When A user logout their account
        And A user can delete an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}'

        Examples:
          | TC | testCases                                               | passwordLength | message                           | fieldName |
#          | 05 | a new password with a length less than 8 characters     | 7              | Should have at least 8 characters | Password  |
          | 06 | a new password with a length greater than 64 characters | 65             | Should not exceed 64 characters   | Password  |

    @ErrorCases
    Scenario Outline: <TC>. Verify that the user can not change the password when providing <testCases>
        When A user input a value '<currentPassword>' in the 'Current Password' field
        And A user input a value '<newPassword>' in the 'Password' field
        And A user input a value '<confirmPassword>' in the 'Confirm Password' field
        And User click the 'Save' button
        Then Verify a error message '<message>' is shown under '<fieldName>' field
        When A user logout their account
        And A user can delete an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}'

        Examples:
          | TC | testCases                                                | currentPassword                 | newPassword                                                  | confirmPassword                                                 | message                                                                                                                         | fieldName        |
          | 07 | a new password with no special character                 | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS.replace(/[^a-zA-Z]/g, \'w\')} | ${process.env.HRM_PASSWORD_ESS.replace(/[^a-zA-Z0-9]/g, \'w\')} | Your password must contain a lower-case letter, an upper-case letter, a digit and a special character. Try a different password | Password         |
          | 08 | a new password with no lower-case letter                 | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS.replace(/[a-z]/g, \'W\')}     | ${process.env.HRM_PASSWORD_ESS.replace(/[a-z]/g, \'W\')}        | Your password must contain a lower-case letter, an upper-case letter, a digit and a special character. Try a different password | Password         |
          | 09 | a new password with no upper-case letter                 | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS.replace(/[A-Z]/g, \'w\')}     | ${process.env.HRM_PASSWORD_ESS.replace(/[A-Z]/g, \'w\')}        | Your password must contain a lower-case letter, an upper-case letter, a digit and a special character. Try a different password | Password         |
          | 10 | a new password with no digit                             | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS.replace(/[0-9]/g, \'w\')}     | ${process.env.HRM_PASSWORD_ESS.replace(/[0-9]/g, \'w\')}        | Your password must contain a lower-case letter, an upper-case letter, a digit and a special character. Try a different password | Password         |
          | 11 | a new password with spaces                               | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS.concat(\' \')}                |                                                                 | Your password should not contain spaces.                                                                                        | Password         |
          | 12 | the current password is empty                            |                                 | ${process.env.HRM_PASSWORD_ESS}                              | ${process.env.HRM_PASSWORD_ESS}                                 | Required                                                                                                                        | Current Password |
          | 13 | the new password is empty                                | ${process.env.HRM_PASSWORD_ESS} |                                                              | ${process.env.HRM_PASSWORD_ESS}                                 | Required                                                                                                                        | Password         |
          | 14 | the confirm password is empty                            | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS}                              |                                                                 | Required                                                                                                                        | Confirm Password |
          | 15 | a mismatch between the new password and confirm password | ${process.env.HRM_PASSWORD_ESS} | ${process.env.HRM_PASSWORD_ESS}                              | ${randomString}                                                 | Passwords do not match                                                                                                          | Confirm Password |

  @ErrorCases
    Scenario: 16. Verify that the user can not change the password when providing wrong the current password
        When A user input a value '${randomString}' in the 'Current Password' field
        And A user input a value '${process.env.HRM_PASSWORD_ESS}' in the 'Password' field
        And A user input a value '${process.env.HRM_PASSWORD_ESS}' in the 'Confirm Password' field
        And User click the 'Save' button
        Then Verify the main title 'Update Password' is displayed correctly
        And Verify alert message 'Invalid Parameter' is displayed
        When A user logout their account
        And A user can delete an ESS account with Admin role with username '${process.env.HRM_USERNAME_ESS}${randomString}'
