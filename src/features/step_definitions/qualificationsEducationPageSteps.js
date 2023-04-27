const { Given, Then, When } = require('@cucumber/cucumber');
const qualificationsEducationPage = require('../page_objects/qualificationsEducationPage');

When('Get number of records found in Education table', qualificationsEducationPage.getNumberOfRecordsFound);

Given('Verify the main title {string} is displayed', qualificationsEducationPage.verifyMainTitleIsDisplay);

Given('Click button with name {string} in page', qualificationsEducationPage.clickButtonWithName);

Given('Type text {string} for {string} field', qualificationsEducationPage.typeTextInField);

When('Add new education with {string} for {string} field', qualificationsEducationPage.addNewEducation);

Given('Check on the check box of the education title {string}', qualificationsEducationPage.selectCheckboxByKeys);

Given('Verify button with name {string} is visible', qualificationsEducationPage.verifyButtonDisplay);

Given('The popup with the question {string} is shown', qualificationsEducationPage.verifyPopupDisplay);

Given('Click icon edit in the row with value {string}', qualificationsEducationPage.clickEditEducationByKey);

Given('Click icon delete in the row with value {string}', qualificationsEducationPage.clickDeleteEducationByKey);

Then('Verify a error message {string} is shown under {string} field', qualificationsEducationPage.verifyErrorMessage);

Given('Type text level name from {string}', qualificationsEducationPage.readDataAndAddEducationFromCSV);

Given('Verify the total number of records found in the table increase by {string} unit', qualificationsEducationPage.verifyNumberRecordsIncreasing);

Given('Verify the total number of records found in the table decrease by {string} unit', qualificationsEducationPage.verifyNumberRecordsDecreasing);

Given('Verify {string} is displayed in table after adding successfully', qualificationsEducationPage.verifyRecordWithTitleDisplay);

Given('Verify {string} is not displayed in table after removing successfully', qualificationsEducationPage.verifyRecordWithTitleIsNotDisplay);

Given('Delete the record {string} to clean environment', qualificationsEducationPage.deleteRecordToCleanEnvironment);
