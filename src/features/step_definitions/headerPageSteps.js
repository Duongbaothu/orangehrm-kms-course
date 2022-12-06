const {When, Then} = require('@cucumber/cucumber');
const {filltemplate} = require('@ln-maf/core');
const headerPage = require('../page_objects/headerPage');
const fillTemplate = filltemplate;

/**
 * Returns the value of the variable if it exists in this.results.
 * @param {string} variable the variable to check
 * @param {Object} scenario the scenario to check
 * @return {Object} the value of the variable if it exists in this.results.
 * Returns the variable itself if variable does not contain "${}"
 */
function getVal(variable, scenario) {
  if (!scenario.results) {
    scenario.results = {};
  }
  return fillTemplate(variable, scenario.results);
};

require('@ln-maf/core/parameter_types');
require('@ln-maf/validations');

When('User click Account button', headerPage.clickBtnAccount);

When('User click Customer Login button', headerPage.clickBtnCustomerLogin);

When('User select the new language as {string}', headerPage.selectDdlLanguageByValue);

When('Verify the copyright is translated correct as {string}', headerPage.verifyLblCopyRightByValue);

When('Verify the language as {string} displays on Home Page', headerPage.verifyLblSelectedLanguageByValue);

When('Verify language selected sequential {string} and display correctly on HomePage', headerPage.verifyLstLanguages);

Then('Currency button show {string}', headerPage.checkCurrencyText);

When('User select a {string} in Currency dropdown box', headerPage.selectCurrency);

When('User click Logo image', headerPage.clickLogoImage);

When('User hover Company button', headerPage.hoverDDLCompany);

When('User click {string} option on Company dropdown list', async function(option) {
  optionName = getVal(option, this);
  await headerPage.clickCompanyOptions.call(this, optionName);
});

When('User click {string} page with href is {string}', async function(title, href) {
  link = getVal(href, this);
  await headerPage.clickPageLink.call(this, link);
});
