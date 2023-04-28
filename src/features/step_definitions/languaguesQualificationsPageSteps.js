const { Given, Then, When } = require('@cucumber/cucumber');
const languagesPage = require('../page_objects/languagesQualificationsPage');

Given('Get number of records found in the language table', languagesPage.getNumberOfRecords);

When('I type the text {string} for field {string}', languagesPage.typeTextForField);

Then('I verify the total number of records founded in the language table increased by {string} unit', languagesPage.verifyIncreasingNumberRecords);

Then('I verify the language with {string} is shown in the table', languagesPage.verifyRecordInTable);

When('I add the language {string}', languagesPage.addRecord);

Then('I verify button with name {string} is visible', languagesPage.verifyNewButtonVisible);

Then('I verify the total number of records founded in the language table decreased by {string} unit', languagesPage.verifyDecreasingNumberRecords);

Then('Verify the record {string} from the table are deleted successfully', languagesPage.verifyRecordDeleted);

When('Generate {string} characters and set for field {string}', languagesPage.generateStringAndSetToField);
