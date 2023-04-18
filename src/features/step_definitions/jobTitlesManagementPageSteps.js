const { Then, When } = require('@cucumber/cucumber');
const jobTitlesManagementPage = require('../page_objects/jobTitlesManagementPage');
const common = require('../page_objects/common');

When('Select the {string} button', jobTitlesManagementPage.clickFunctionButton);

Then('Verify the form title {string} displayed correctly', jobTitlesManagementPage.verifyTheFormTitle);

When('Enter Job Title {string}', jobTitlesManagementPage.typeJobTitle);

When('Edit Job Title to {string}', jobTitlesManagementPage.typeJobTitle);

Then('Verify the Job title {string} displayed correctly', jobTitlesManagementPage.verifyJobTitle);

When('Enter Job Description {string}', jobTitlesManagementPage.typeJobDescription);

When('Add the Note {string}', jobTitlesManagementPage.typeNote);

When('Verify the error message of Job Title is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobTitle);

When('Verify the error message of Job Description is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobDescription);

When('Verify the error message of Job Note is {string}', jobTitlesManagementPage.verifyValidationMessageOfJobNote);

When('Add the new Job with Title {string}', jobTitlesManagementPage.addNewJobTitle);

Then('Verify the Job Titles records with title {string} and {string} is added successfully', jobTitlesManagementPage.verifyRecordWithTitleAndDescription);

Then('Verify the Job Titles records {string} is added successfully', jobTitlesManagementPage.verifyRecordWithTitle);

When('Select the trash icon of Job Title {string}', jobTitlesManagementPage.clickTrashIconOfJob);

When('Select the edit icon of Job Title {string}', common.clickEditActionByKey);

Then('Verify the delete pop-up appears', jobTitlesManagementPage.verifyDeleteDialogDislayed);

When('Click the {string} on delete pop-up', jobTitlesManagementPage.clickDeleteModalButton);

Then('Verify the delete pop-up disappears', jobTitlesManagementPage.verifyDeleteDialogNotDislayed);

Then('Verify the Job Titles records {string} is removed successfully', jobTitlesManagementPage.verifyRecordWithTitleNotDisplayed);

When('Generating {string} characters and set to {string} text box', jobTitlesManagementPage.generateCharAndSetToAddJobFields);

When('Get number of records found', jobTitlesManagementPage.getNumberOfRecords);

Then('Verify the total number of records found in the table increased by {string} unit', jobTitlesManagementPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the table decreased by {string} unit', jobTitlesManagementPage.verifyDecreasingNumberRecords);

Then('Clean up Job Title {string} after running', jobTitlesManagementPage.removeTheJob);

Then('Navigate to {string} page', jobTitlesManagementPage.verifyThePageURL);
