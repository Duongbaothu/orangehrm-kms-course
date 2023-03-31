require('@ln-maf/validations');
require('@ln-maf/core');
const chai = require('chai');
const keywords = require('./keywords');
const {assert} = chai;

const txtUsername = `//input[@name='username']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button[contains(@type,'submit')]`;
const msgValidationError = `//input[@name='$fieldName']/parent::*/following-sibling::span`;
const msgCredentialError = `//div[contains(@class,'oxd-alert-content--error')]`;

const self = module.exports = {
  /**
   * Login to system using username and password
   * @param {string} username The username of an account
   * @param {string} password The password of an account
   */
  async login(username, password) {
    await keywords.setText.call(this, txtUsername, username);
    await keywords.setText.call(this, txtPassword, password);
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
};
