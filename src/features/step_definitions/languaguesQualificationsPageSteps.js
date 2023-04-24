const { Given, Then, When } = require('@cucumber/cucumber');
const languagesPage = require('../page_objects/languagesQualificationsPage');

Given('get number of records found in page', languagesPage.getNumberOfRecords);

When('I click button with name is {string} in page', languagesPage.clickButtonByName);

Then('The main title is {string}', languagesPage.verifyMainTitle);

When('I type the text {string} for field {string}', languagesPage.typeTextForField);

Then('I verify the total number of records founded in the table increased by {string} unit', languagesPage.verifyIncreasingNumberRecords);

Then('I verify the language with {string} is shown in the table', languagesPage.verifyRecordInTable);

Then('I delete the record {string} added to clean environment', languagesPage.cleanEnvironment);

When('I add the language {string}', languagesPage.addRecord);

Then('I verify button with name {string} is visible', languagesPage.verifyNewButtonVisible);

Then('The popup with question {string} is presented', languagesPage.verifyPopupQuestionPresented);

Then('I verify the number of records founded decrease by {string}', languagesPage.verifyDecreasingNumberRecords);

Then('Verify the record {string} from the table are deleted successfully', languagesPage.verifyRecordDeleted);

When('A user deletes a record by trash button with key is {string}', languagesPage.clickTrashButton);

Then('I verify the error message {string} is shown under the {string} field', languagesPage.verifyErrorMessageDisplayed);

When('Generate {string} characters and set for field {string}', languagesPage.generateStringAndSetToField);
