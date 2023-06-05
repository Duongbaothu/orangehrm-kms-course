const { When, Then } = require('@cucumber/cucumber');
const loginPage = require('../page_objects/loginPage');

When('A user login with username {string} and password {string}', loginPage.login);

Then('The message {string} is present under {string} field', loginPage.verifyValidationErrorMessage);

Then('The error message {string} is present', loginPage.verifyCredentialErrorMessage);

Then('Verify the item {string} in Main Menu is displayed', loginPage.verifyItemMainMenuIsDisplayed);

Then('Verify the item {string} in Main Menu is not displayed', loginPage.verifyItemMainMenuIsNotDisplayed);

When('A user click on the {string} button', loginPage.clickOnButtonByName);

When('A user input a string {string} in the {string} field', loginPage.inputUserInformation);

When('A user logout their account', loginPage.logout);

When('A user login with username {string} and decode password {string}', loginPage.loginWithDecodePassword);
