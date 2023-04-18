const { Given, Then, When } = require('@cucumber/cucumber');
const licensesPage = require('../page_objects/licensesQualificationsPage');
const common = require('../page_objects/common');

Given('get number of records found', licensesPage.getNumberOfRecords);

When('I click button with name {string} in page', licensesPage.clickButtonByName);

Then('Main title is {string}', licensesPage.verifyMainTitle);

When('I type text {string} for field {string}', licensesPage.typeTextForField);

Then('I verify the total number of records found in the table increased by {string} unit', licensesPage.verifyIncreasingNumberRecords);

Then('I verify the license with {string} is shown in the table', licensesPage.verifyIsRecordInTable);

Then('I delete the record {string} to clean environment', common.deleteRecordByKey);

When('I add the license {string}', licensesPage.addRecord);

Then('I verify button with value {string} is visible', licensesPage.verifyNewButtonVisible);

Then('The popup with the question {string} is presented', licensesPage.verifyPopupQuestionPresented);

Then('I verify the number of records decrease by {string}', licensesPage.verifyDecreasingNumberRecords);

Then('Verify the record {string} from the list are deleted successfully', licensesPage.verifyIsRecordDeleted);

When('A user delete a record by trash button with key is {string}', licensesPage.clickTrashButton);

Then('I verify the error message {string} is shown under {string} field', licensesPage.verifyErrorMessage);
