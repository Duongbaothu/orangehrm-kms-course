const { Given, Then, When } = require('@cucumber/cucumber');
const licensesPage = require('../page_objects/licensesQualificationsPage');

Given('Get number of records found in the licenses table', licensesPage.getNumberOfRecords);

When('I type text {string} for field {string}', licensesPage.typeTextForField);

Then('I verify the total number of records found in the licenses table increased by {string} unit', licensesPage.verifyIncreasingNumberRecords);

Then('I verify the license with {string} is shown in the table', licensesPage.verifyRecordInTable);

When('I add the license {string}', licensesPage.addRecord);

Then('I verify button with value {string} is visible', licensesPage.verifyNewButtonVisible);

Then('I verify the total number of records found in the licenses table decreased by {string} unit', licensesPage.verifyDecreasingNumberRecords);

Then('Verify the record {string} from the list are deleted successfully', licensesPage.verifyRecordDeleted);
