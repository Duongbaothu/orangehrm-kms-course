const { When, Then, Given } = require('@cucumber/cucumber');
const qualificationsMembershipsPage = require('../page_objects/qualificationsMembershipsPage');

Given('Get current total of membership records', qualificationsMembershipsPage.getTotalOfRecords);

When('Verify the delete memebership pop-up appears', qualificationsMembershipsPage.verifyDialogDisplay);

When('A user click Delete Selected button and confirm to delete membership records', qualificationsMembershipsPage.deleteSeletedRecords);

When('A user type {string} membership into {string} field', qualificationsMembershipsPage.typeValueToField);

When('A user add new {string} membership successfully', qualificationsMembershipsPage.addNewMembership);

When('A user click edit action of {string} membership', qualificationsMembershipsPage.clickUpdateActionByKey);

When('A user click delete action of {string} membership', qualificationsMembershipsPage.clickDeleteActionByKey);

When('A user select checkbox with memberships {string}', qualificationsMembershipsPage.selectCheckboxByKeys);

Then('Verify the {string} membership is displayed in table', async function(value) {
    await qualificationsMembershipsPage.verifyNameExistsOrNotInTable.call(this, value, true);
});

Then('Verify the {string} membership is not displayed in table', async function(value) {
    await qualificationsMembershipsPage.verifyNameExistsOrNotInTable.call(this, value, false);
});

Then('Verify the {string} membership is displayed in {string} field', qualificationsMembershipsPage.verifyValueInField);

Then('Verify the total of membership records increased by {string} unit', qualificationsMembershipsPage.verifyNumberOfRecordsIncrease);

Then('Verify the total of membership records decreased by {string} unit', qualificationsMembershipsPage.verifyNumberOfRecordsDecrease);

Then('Verify the main title {string} of membership page is displayed', qualificationsMembershipsPage.verifyMainTitleIsDisplayed);
