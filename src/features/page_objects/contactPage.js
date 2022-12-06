const {expect} = require('chai');
const chai = require('chai');
const common = require('./common');
const keywords = require('./keywords');
const {assert} = chai;

const txtName = `//input[@name='name']`;
const txtEmail = `//input[@name='email']`;
const txtMessage = `//textarea[@name='message']`;
const btnSend = `//*[@id='button']`;
const txtInvalidEmail = `//*[contains(@class,'email')]`;
const txtSuccessMessage = `//div[@class='alert alert-success']`;

module.exports = {
  /**
  * Type user email into the email text box.
  * @param {string} email The user email.
  */
  async typeEmail(email) {
    await common.waitLoading.call(this);
    await keywords.setText.call(this, txtEmail, email);
  },

  /**
  * Type user name into the name text box.
  * @param {string} name The user name.
  */
  async typeName(name) {
    await common.waitLoading.call(this);
    await keywords.setText.call(this, txtName, name);
  },

  /**
  * Type message into the message text box.
  * @param {string} message The message.
  */
  async typeMessage(message) {
    await common.waitLoading.call(this);
    await keywords.setText.call(this, txtMessage, message);
  },

  /**
  * Click the Send button.
  */
  async clickBtnSend() {
    await keywords.removeAttribute.call(this, btnSend, 'disabled');
    await keywords.scrollIntoView.call(this, btnSend, 500);
    await keywords.waitClick.call(this, btnSend);
  },

  /**
  * Verify the error message is displayed when user enters the invalid format email.
  * @param {string} email The page email.
  */
  async isIncorrectEmailMessageDisplayed(email) {
    const element = await keywords.waitUntilElementLocated.call(this, txtEmail);
    const message = await element.getAttribute('validationMessage');
    const expectedMessage = 'Please include an \'@\' in the email address. \'' + email + '\' is missing an \'@\'.';
    const expectedMessageFirefox = 'Please enter an email address.';
    this.attach(`Actual message: ${message}`);
    this.attach(`Expected message: ${expectedMessage}`);
    expect(message).to.be.oneOf([expectedMessage, expectedMessageFirefox]);
  },

  /**
  * Verify the error message is displayed when user enters the invalid email.
  * @param {string} email The page email.
  */
  async isInvalidEmailMessageDisplayed(email) {
    const message = await keywords.waitAndGetText.call(this, txtInvalidEmail);
    const expectedMessage = 'Message could not be sent. Mailer Error: Invalid address: (to): ' + email;
    this.attach(`Actual message: ${message}`);
    this.attach(`Expected message: ${expectedMessage}`);
    assert.equal(message, expectedMessage.trim());
  },

  /**
  * Verify the success message is displayed when user click on Send button with valid data.
  */
  async isSuccessMessageDisplayed() {
    const message = await keywords.waitAndGetText.call(this, txtSuccessMessage);
    const expectedMessage = 'Message sent successfully.';
    this.attach(`Actual message: ${message}`);
    this.attach(`Expected message: ${expectedMessage}`);
    assert.equal(message, expectedMessage);
  },
};
