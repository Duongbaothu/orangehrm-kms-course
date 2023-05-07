const { Then, When } = require('@cucumber/cucumber');
const languagesPage = require('../page_objects/languagesQualificationsPage');

When('I type the text {string} for field {string}', languagesPage.typeTextForField);

When('I add the language {string}', languagesPage.addRecord);

Then('I verify button with name {string} is visible', languagesPage.verifyNewButtonVisible);

Then('Verify the record {string} from the table are deleted successfully', languagesPage.verifyRecordDeleted);

When('Generate {string} characters and set for field {string}', languagesPage.generateStringAndSetToField);
