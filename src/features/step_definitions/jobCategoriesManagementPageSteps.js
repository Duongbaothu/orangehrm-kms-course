const { When, Then } = require('@cucumber/cucumber');
const jobCategoriesManagementPage = require('../page_objects/jobCategoriesManagementPage');

Then('Verify that the header title is {string}', jobCategoriesManagementPage.verifyTheFormTitle);

When('User click the {string} button', jobCategoriesManagementPage.clickBtnAction);

When('User enter a new Job Category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);

Then('Verify that new Job Category {string} is visible in the table', jobCategoriesManagementPage.verifyNameIsVisibale);

Then('Verify that the label should be displayed as {string}', jobCategoriesManagementPage.verifyValidationErrorMessage);

When('User enter the name of an existing Job Category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);

When('User click the delete icon of job category {string}', jobCategoriesManagementPage.clickDeleteIconOfJobName);

Then('Verify the confirm pop-up appears', jobCategoriesManagementPage.verifyConfirmPopupDislayed);

Then('Verify the confirm pop-up disappears', jobCategoriesManagementPage.verifyConfirmPopupNotDislayed);

When('User click the {string} button on pop-up', jobCategoriesManagementPage.clickBtnInPopup);

When('Get number of records found in table', jobCategoriesManagementPage.getNumberOfRecords);

Then('Verify the total number of records found in the table is increased by {string} unit', jobCategoriesManagementPage.verifyIncreasingNumberRecords);

Then('Verify the total number of records found in the table is decreased by {string} unit', jobCategoriesManagementPage.verifyDecreasingNumberRecords);

When('Clean up job category {string} after adding', jobCategoriesManagementPage.removeJobCategories);
