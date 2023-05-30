const { When, Given } = require('@cucumber/cucumber');
const organizationGeneralInformationPage = require('../page_objects/organizationGeneralInformationPage');

When('User click Edit button', organizationGeneralInformationPage.clickEditButton);

Given('User type {string} into {string} field', organizationGeneralInformationPage.typeTextInField);

When('User select {string} in Country', organizationGeneralInformationPage.selectCountryByName);

When('Verify the {string} is displayed correct as {string}', organizationGeneralInformationPage.verifyValueFieldIsDisplayCorrectly);

When('Verify the Country is displayed correct with {string}', organizationGeneralInformationPage.verifyCountryIsDisplayedCorrectly);

When('User type text into {string} field from {string}', organizationGeneralInformationPage.readDataAndtypeTextFromCSV);

When('Verify the {string} is displayed correctly in General Information page', organizationGeneralInformationPage.verifyNumberOfEmployeesIsDisplayedCorrectly);

