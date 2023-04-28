const { Then, When } = require('@cucumber/cucumber');
const jobTitlesManagementPage = require('../page_objects/jobTitlesManagementPage');

When('Enter Job Title {string}', jobTitlesManagementPage.typeJobTitle);

When('Edit Job Title to {string}', jobTitlesManagementPage.typeJobTitle);

Then('Verify the Job title {string} is displayed correctly', jobTitlesManagementPage.verifyJobTitle);

When('Enter Job Description {string}', jobTitlesManagementPage.typeJobDescription);

When('Add the Note {string}', jobTitlesManagementPage.typeNote);

When('Verify the error message of Job Title is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobTitle);

When('Verify the error message of Job Description is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobDescription);

When('Verify the error message of Job Note is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobNote);

When('Add the new Job with Title {string}', jobTitlesManagementPage.addNewJobTitle);

Then('Verify the Job Titles records with title {string} and {string} is added successfully', jobTitlesManagementPage.verifyRecordWithTitleAndDescription);

Then('Verify the Job Titles records {string} is added successfully', jobTitlesManagementPage.verifyRecordWithTitle);

Then('Verify the Job Titles records {string} is removed successfully', jobTitlesManagementPage.verifyRecordWithTitleNotDisplayed);

When('Generating {string} characters and set to {string} text box', jobTitlesManagementPage.generateCharAndSetToAddJobFields);

When('Get number of records found in job title table', jobTitlesManagementPage.getNumberOfRecords);

Then('Verify the total number of records found in the job title table increased by {string} unit', jobTitlesManagementPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the job title table decreased by {string} unit', jobTitlesManagementPage.verifyDecreasingNumberRecords);
