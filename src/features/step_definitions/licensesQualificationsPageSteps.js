const { Then, When } = require('@cucumber/cucumber');
const licensesPage = require('../page_objects/licensesQualificationsPage');

When('I type text {string} for field {string}', licensesPage.typeTextForField);

When('I add the license {string}', licensesPage.addRecord);

Then('I verify button with value {string} is visible', licensesPage.verifyNewButtonVisible);

Then('Verify the record {string} from the list are deleted successfully', licensesPage.verifyRecordDeleted);
