const {When} = require('@cucumber/cucumber');
const {filltemplate} = require('@ln-maf/core');
const loginPage = require('../page_objects/loginPage');
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

When('User select {string} option on Account dropdown list', loginPage.selectDdlAccountOption);

When('{string} with {string},{string},{string},{string},{string}', async function(Type, first, last, phone, mail, pas) {
  await loginPage.selectDdlAccountOption.call(this, Type);
  first = getVal(first, this);
  last = getVal(last, this);
  phone = getVal(phone, this);
  mail = getVal(mail, this);
  pas = getVal(pas, this);
  await loginPage.fillTxtAndSignUpAccount.call(this, first, last, phone, mail, pas);
});

When('User Switch to the new tab for log in', loginPage.switchToLogIn);

When('The error {string} is present', loginPage.verifyMsgCredentialError);

When('The message {string} is present under {string} field', loginPage.verifyMsgValidationMessage);
