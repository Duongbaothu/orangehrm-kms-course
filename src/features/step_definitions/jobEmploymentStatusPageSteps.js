const { When, Then } = require('@cucumber/cucumber');
const jobEmploymentStatusPage = require('../page_objects/jobEmploymentStatusPage');

Then('Verify that the header title is {string}', jobEmploymentStatusPage.verifyTheFormTitle);

When('User click the {string} button', jobEmploymentStatusPage.clickBtnAction);

When('User enter a new employment status name as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);

Then('Verify that new employment status {string} is visible in the table', jobEmploymentStatusPage.verifyNameIsVisibale);

Then('Verify that the label should be displayed as {string}', jobEmploymentStatusPage.verifyValidationErrorMessage);

When('User enter the name of an existing employment status as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);

When('User click the delete icon of employement status {string}', jobEmploymentStatusPage.clickDeleteIconOfEmpName);

Then('Verify the confirm pop-up appears', jobEmploymentStatusPage.verifyConfirmPopupDislayed);

Then('Verify the confirm pop-up disappears', jobEmploymentStatusPage.verifyConfirmPopupNotDislayed);

When('User click the {string} button on pop-up', jobEmploymentStatusPage.clickBtnInPopup);

When('Get number of records found in table', jobEmploymentStatusPage.getNumberOfRecords);

Then('Verify the total number of records found in the table is increased by {string} unit', jobEmploymentStatusPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the table is decreased by {string} unit', jobEmploymentStatusPage.verifyDecreasingNumberRecords);

When('Clean up employment status name {string} after running', jobEmploymentStatusPage.removeEmpStatusName);
