const { When, Then } = require('@cucumber/cucumber');
const nationalitiesPage = require('../page_objects/nationalitiesPage');

When('Verify the delete nationality pop-up appears', nationalitiesPage.verifyDialogDisplay);

When('A user click Delete Selected button and confirm to delete nationality records', nationalitiesPage.deleteSeletedRecords);

When('A user type {string} nationality into {string} field', nationalitiesPage.typeValueToField);

When('A user add new {string} nationality successfully', nationalitiesPage.addNewNationality);

When('A user click edit action of {string} nationality', nationalitiesPage.clickUpdateActionByKey);

When('A user click delete action of {string} nationality', nationalitiesPage.clickDeleteActionByKey);

When('A user select checkbox with nationalities {string}', nationalitiesPage.selectCheckboxByKeys);

Then('Verify the {string} nationality is displayed in table', async function(value) {
    await nationalitiesPage.verifyNameExistsOrNotInTable.call(this, value, true);
});

Then('Verify the {string} nationality is not displayed in table', async function(value) {
    await nationalitiesPage.verifyNameExistsOrNotInTable.call(this, value, false);
});

Then('Verify the {string} nationality is displayed in {string} field', nationalitiesPage.verifyValueInField);

Then('Verify the main title {string} of nationality page is displayed', nationalitiesPage.verifyMainTitleIsDisplayed);

When('A user delete {string} nationality to clean environment', nationalitiesPage.deleteRecordToCleanEnv);

When('Generate {string} characters and set nationality for field {string}', nationalitiesPage.generateStringAndTypeToField);
