const { When, Then } = require('@cucumber/cucumber');
const jobEmploymentStatusPage = require('../page_objects/jobEmploymentStatusPage');

When('User enter a new employment status name as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);

Then('Verify that new employment status {string} is visible in the table', jobEmploymentStatusPage.verifyNameIsVisibale);

When('User enter the name of an existing employment status as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);

When('Get number of records found in employment status table', jobEmploymentStatusPage.getNumberOfRecords);

Then('Verify the total number of records found in the employment status table is increased by {string} unit', jobEmploymentStatusPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the employment status table is decreased by {string} unit', jobEmploymentStatusPage.verifyDecreasingNumberRecords);
