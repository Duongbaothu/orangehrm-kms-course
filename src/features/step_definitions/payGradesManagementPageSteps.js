const { Then, When } = require('@cucumber/cucumber');
const payGradesManagementPage = require('../page_objects/payGradesManagementPage');

When('Select the {string} button on section {string}', payGradesManagementPage.clickFunctionButtonOnSection);

When('Enter Name {string}', payGradesManagementPage.typePayGradeName);

When('Enter {string} into {string}', payGradesManagementPage.typeSalary);

Then('Verify the Currencies records with name {string}, minimum salary {string} and maximum {string} is added successfully', payGradesManagementPage.verifyRecordWithCurrencyAndSalaryDisplayed);

Then('Verify the Pay Grade records with name {string} and {string} is added successfully', payGradesManagementPage.verifyRecordWithNameAndCurrencyDisplayed);

Then('Add the new Pay Grade with {string}', payGradesManagementPage.addPayGradeRecord);

Then('Add the new Currency with {string}', payGradesManagementPage.addACurrency);

When('Select the trash icon of Pay Grade {string}', payGradesManagementPage.clickTrashIconOfName);

When('Select the trash icon of Currency {string}', payGradesManagementPage.clickTrashIconOfCurrency);

Then('Verify the Pay Grade records {string} is removed successfully', payGradesManagementPage.verifyPayGradeRecordWithNameNotDisplayed);

Then('Verify the Currency records {string} is removed successfully', payGradesManagementPage.verifyRecordWithCurrencyIsNotDisplay);

When('Generate and enter {string} characters to Pay Grade Name text box', payGradesManagementPage.generateCharAndTypeToPayGradeName);

