const { When, Then } = require('@cucumber/cucumber');
const changePasswordPage = require('../page_objects/changePasswordPage');

When('A user click on Change Password in User Profile', changePasswordPage.clickOnchangePasswordInUserProfile);

When('A user input a value {string} in the {string} field', changePasswordPage.typeUserInformation);

When('Generating a new password with the length of {string} characters', changePasswordPage.generatePasswordWithLength);

When('A user can create an ESS account with Admin role with username {string} and password {string}', changePasswordPage.createESSAccountByAdminRole);

When('A user can delete an ESS account with Admin role with username {string}', changePasswordPage.deleteESSAccountByAdminRole);

Then('Verify alert message {string} is displayed', changePasswordPage.verifyAlert);
