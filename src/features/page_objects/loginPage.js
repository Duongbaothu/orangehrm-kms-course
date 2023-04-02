require('@ln-maf/validations');
require('@ln-maf/core/parameter_types');
const {filltemplate} = require('@ln-maf/core');
const chai = require('chai');
const keywords = require('./keywords');
const {assert} = chai;

const txtUsername = `//input[@name='username']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button[contains(@type,'submit')]`;
const msgValidationError = `//input[@name='$fieldName']/parent::*/following-sibling::span`;
const msgCredentialError = `//div[contains(@class,'oxd-alert-content--error')]`;
const itemMainMenu = `//ul[@class='oxd-main-menu']//li//span[text()='$itemName']`;

const self = module.exports = {
  /**
   * Returns the value of the variable if it exists in this.results
   * @param {string} variable the variable to check
   * @param {string} scenario the object to be used as the current object
   * @return {Object} the value of the variable if it exists in this.results. Returns the variable itself if variable does not contain "${}"
   */
  async getVariableValue(variable, scenario) {
    if (!scenario.results) {
      scenario.results = {};
    }
    return filltemplate(variable, scenario.results);
  },

  /**
   * Login to system using username and password
   * @param {string} username The username of an account
   * @param {string} password The password of an account
   */
  async login(username, password) {
    await keywords.setText.call(this, txtUsername, self.getVariableValue(username, this));
    await keywords.setText.call(this, txtPassword, self.getVariableValue(password, this));
    await keywords.waitClick.call(this, btnLogin);
  },

  /**
   * Verify the Credential error
   * @param {string} expectedMessage The expected credential error message
   */
  async verifyMsgCredentialError(expectedMessage) {
    await keywords.sleepFor(3000);
    const actualMsg = await keywords.waitAndGetText.call(this, msgCredentialError);
    this.attach(`Actual message: ${actualMsg}`);
    this.attach(`Expected message: ${expectedMessage}`);
    assert.equal(actualMsg, expectedMessage);
  },

  /**
   * Verify the validation message
   * @param {string} expectedMessage The expected validation message
   * @param {string} fieldName The field name has the error message below
   */
  async verifyMsgValidationMessage(expectedMessage, fieldName) {
    const actualMessage = await keywords.waitAndGetText.call(this, msgValidationError.replace(`$fieldName`, fieldName));
    this.attach(`Actual message: ${actualMessage}`);
    this.attach(`Expected message: ${expectedMessage}`);
    assert.equal(actualMessage, expectedMessage);
  },

  /**
   * Verify the item in main menu is displayed.
   * @param {string} itemName The item name in main menu. Ex: Admin, Dashboard,...
   */
  async verifyItemMainMenuIsDisplayed(itemName) {
    const item = itemMainMenu.replace('$itemName', itemName);
    await keywords.verifyElementIsDisplayed.call(this, item);
  },
};
