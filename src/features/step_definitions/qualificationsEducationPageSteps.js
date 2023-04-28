const { Given, When } = require('@cucumber/cucumber');
const qualificationsEducationPage = require('../page_objects/qualificationsEducationPage');

When('Get number of records found in the education table', qualificationsEducationPage.getNumberOfRecordsFound);

Given('Verify the main title {string} is displayed', qualificationsEducationPage.verifyMainTitleIsDisplay);

Given('Type text {string} for {string} field', qualificationsEducationPage.typeTextInField);

When('Add new education with {string} for {string} field', qualificationsEducationPage.addNewEducation);

Given('Verify button with name {string} is visible', qualificationsEducationPage.verifyButtonDisplay);

Given('Type text level name from {string}', qualificationsEducationPage.readDataAndAddEducationFromCSV);

Given('Verify the total number of records found in the education table increase by {string} unit', qualificationsEducationPage.verifyNumberRecordsIncreasing);

Given('Verify the total number of records found in the education table decrease by {string} unit', qualificationsEducationPage.verifyNumberRecordsDecreasing);

Given('Verify {string} is displayed in table after adding successfully', qualificationsEducationPage.verifyRecordWithTitleDisplay);

Given('Verify {string} is not displayed in table after removing successfully', qualificationsEducationPage.verifyRecordWithTitleIsNotDisplay);
