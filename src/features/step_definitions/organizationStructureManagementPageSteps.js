const { Then, When } = require('@cucumber/cucumber');
const organizationStructureManagementPage = require('../page_objects/organizationStructureManagementPage');

When('User click enable edit mode', organizationStructureManagementPage.clickEnableOrDisableEditMode);

When('User click disable edit mode', organizationStructureManagementPage.clickEnableOrDisableEditMode);

When('Verify the dialog does not display', organizationStructureManagementPage.verifyDialogNotDisplay);

When('User type {string} into {string}', organizationStructureManagementPage.typeTextForField);

Then('Verify the unit {string} is added under {string}', organizationStructureManagementPage.verifyUnitWithNameDisplayed);

Then('Verify the unit {string} is removed from {string}', organizationStructureManagementPage.verifyUnitWithNameNotDisplayed);

When('User click delete an unit with unit name is {string} under {string}', organizationStructureManagementPage.clickDeleteAnUnitByName);

When('User delete an unit {string} under {string} to clean environment', organizationStructureManagementPage.deleteUnitToCleanEnvironment);

When('User add an unit with name is {string} under {string}', organizationStructureManagementPage.addAnUnitByName);

When('User click edit icon with unit name is {string} under {string}', organizationStructureManagementPage.clickEditAnUnitByName);

When('User click expand icon at {string}', organizationStructureManagementPage.clickExpandButton);

When('Generate {string} characters and set it for field {string}', organizationStructureManagementPage.generateStringAndSetItToField);
