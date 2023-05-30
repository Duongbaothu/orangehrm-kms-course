const { When, Then } = require('@cucumber/cucumber');
const configurationOptionalFieldsPage = require('../page_objects/configurationOptionalFieldsPage');

When('A user enable the checkbox with the option name is {string}', configurationOptionalFieldsPage.enableCheckboxByOptionName);

When('A user {string} the checkbox the option name is {string} in Optional Fields Page', configurationOptionalFieldsPage.clickOnCheckboxByOptionNameInOptionalFieldsPage);

When('A user click My Info item in main menu item and choose {string} in tab items', configurationOptionalFieldsPage.clickOnItemInEmployeeInformationMenu);

When('A user update value of the field {string} to value {string}', configurationOptionalFieldsPage.inputEmployeeInformation);

When('Reset the {string} field values to default', configurationOptionalFieldsPage.resetFieldValueToDefault);

Then('Verify the {string} - {string} is displayed', configurationOptionalFieldsPage.verifyTheFieldIsDisplayed);

Then('Verify the {string} - {string} is not displayed', configurationOptionalFieldsPage.verifyTheFieldIsNotDisplayed);

Then('Verify the form title {string} is displayed', configurationOptionalFieldsPage.verifyTheFormTitleInOptionFieldPage);
