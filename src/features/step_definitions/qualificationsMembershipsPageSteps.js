const { When, Then } = require('@cucumber/cucumber');
const qualificationsMembershipsPage = require('../page_objects/qualificationsMembershipsPage');

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
