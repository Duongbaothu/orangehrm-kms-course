const { When, Then } = require('@cucumber/cucumber');
const jobCategoriesManagementPage = require('../page_objects/jobCategoriesManagementPage');

When('User enter a new job category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);

Then('Verify that new job category {string} is visible in the table', jobCategoriesManagementPage.verifyNameIsVisibale);

When('User enter the name of an existing job category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);

When('Get number of records found in job categories table', jobCategoriesManagementPage.getNumberOfRecords);

Then('Verify the total number of records found in the job categories table is increased by {string} unit', jobCategoriesManagementPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the job categories table is decreased by {string} unit', jobCategoriesManagementPage.verifyDecreasingNumberRecords);
