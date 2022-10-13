const {When} = require('@cucumber/cucumber');
const {filltemplate} = require('@ln-maf/core');
const loginPage = require('../page-objects/loginPage');
require('@ln-maf/core/parameter_types');
require('@ln-maf/validations');

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
}

When('User type {string} into email', async function(email) {
  email = getVal(email, this);
  await loginPage.typeEmail.call(this, email);
});

When('User type {string} into password', async function(password) {
  password = getVal(password, this);
  await loginPage.typePassword.call(this, password);
});

When('User click Login button', loginPage.clickBtnLogin);
