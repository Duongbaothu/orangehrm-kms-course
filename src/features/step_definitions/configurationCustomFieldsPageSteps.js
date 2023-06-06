const { When, Then } = require('@cucumber/cucumber');
const configurationCustomFieldPage = require('../page_objects/configurationCustomFieldsPage');

When('A user type a string {string} in the {string} field', configurationCustomFieldPage.typeTextForField);

When('A user create new field {int} times with the field name start with {string}, {string} type and {string} as option value in {string} Screen', configurationCustomFieldPage.createNewFieldInCustomFieldTable);

When('A user edit a record of the field name {string} with new value {string} and {string} as option value', configurationCustomFieldPage.editRecordInTable);

When('Get number of custom fields can be added in Custom Field table', configurationCustomFieldPage.getNumberOfCustomFieldsAvailable);

When('Delete a record in the Custom Field table with field name is {string}', configurationCustomFieldPage.deleteRecordInCustomFieldTableByFieldName);

When('Delete all record in the Custom Field table', configurationCustomFieldPage.deleteAllRecordInCustomFieldTable);

Then('Verify number of custom fields can be added is decreased by {string} unit', configurationCustomFieldPage.verifyDecreasingNumberRecords);

Then('Verify the field {string} is not displayed with value is {string}', configurationCustomFieldPage.verifyFieldIsNotDisplayedWithValue);

Then('Verify the field {string} is displayed with field type is {string} and value is {string}', configurationCustomFieldPage.verifyFieldIsDisplayedWithValue);

Then('Verify the Add button is not displayed', configurationCustomFieldPage.verifyAddButtonIsNotDisplayed);

Then('Verify the number of field available message is {string}', configurationCustomFieldPage.verifyTheFieldNumberMessage);
