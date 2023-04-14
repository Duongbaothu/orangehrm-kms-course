const { When, Then } = require('@cucumber/cucumber');
const loginPage = require('../page_objects/loginPage');

When('A user login with username {string} and password {string}', loginPage.login);

Then('The message {string} is present under {string} field', loginPage.verifyMsgValidationMessage);

Then('The error message {string} is present', loginPage.verifyMsgCredentialError);

Then('Verify the item {string} in Main Menu is displayed', loginPage.verifyItemMainMenuIsDisplayed);
