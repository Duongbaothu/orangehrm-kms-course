const { Then, When } = require('@cucumber/cucumber');
const locationsManagement = require('../page_objects/organizationLocationsPage');

When('A user type {string} into textarea {string}', locationsManagement.typeTextForTextarea);

When('A user type random string with length {string} into field {string}', locationsManagement.typeRandomTextForField);

When('A user type random string with length {string} into textarea {string}', locationsManagement.typeRandomTextForTextarea);

Then('Verify city of location {string} is {string} showing correctly in table', locationsManagement.verifyCityOfLocationIsShowingCorrectlyInTable);

Then('Verify city of location {string} is empty in table', locationsManagement.verifyCityOfLocationIsEmptyInTable);

Then('Verify country of location {string} is {string} showing correctly in table', locationsManagement.verifyCountryOfLocationIsShowingCorrectlyInTable);

Then('Verify phone of location {string} is {string} showing correctly in table', locationsManagement.verifyPhoneOfLocationIsShowingCorrectlyInTable);

Then('Verify phone of location {string} is empty in table', locationsManagement.verifyPhoneOfLocationIsEmptyInTable);

Then('Verify number of employees of location {string} is {string} showing correctly in table', locationsManagement.verifyNumberEmployeesOfLocationIsShowingCorrectlyInTable);

Then('Verify value of {string} textbox in form equal to {string}', locationsManagement.verifyValueOfInputInForm);

Then('Verify value of {string} textarea in form equal to {string}', locationsManagement.verifyValueOfTextareaInForm);

When('Add a locations with {string}', locationsManagement.addALocation);

When('Add multiple locations with .csv file in {string}', { timeout: 60*2*1000 }, locationsManagement.addMultiLocationsWithCsv);
