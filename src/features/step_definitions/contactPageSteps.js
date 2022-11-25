const {When, Then} = require('@cucumber/cucumber');
const contactPage = require('../page_objects/contactPage');

When('User types {string} into email textbox', contactPage.typeEmail);

When('User types {string} into message textbox', contactPage.typeMessage);

When('User types {string} into Name textbox', contactPage.typeName);

When('User clicks on Send button', contactPage.clickBtnSend);

Then('The error message incorrect email format {string} is displayed', contactPage.isIncorrectEmailMessageDisplayed);

Then('The error message {string} is displayed', contactPage.isInvalidEmailMessageDisplayed);

Then('The success message is displayed', contactPage.isSuccessMessageDisplayed);
