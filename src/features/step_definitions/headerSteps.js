const {When, Then} = require('@cucumber/cucumber');
const header = require('../page_objects/header');
const {filltemplate} = require('@ln-maf/core');
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

When('User click Account button', header.clickBtnAccount);

When('User click Customer Login button', header.clickBtnCustomerLogin);

Then('Currency button show {string}', header.checkCurrencyText);

When('User select a {string} in Currency dropdown box', header.selectCurrency);

When('User click Logo image', header.clickLogoImage);

When('User hover Company button', header.hoverDDLCompany);

When('User click {string} option on Company dropdown list', async function(option) {
  optionName = getVal(option, this);
  await header.clickCompanyOptions.call(this, optionName);
});

When('User click {string} page with href is {string}', async function(title, href) {
  link = getVal(href, this);
  await header.clickPageLink.call(this, link);
});
