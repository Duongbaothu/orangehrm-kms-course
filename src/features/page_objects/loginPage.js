const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const {assert} = chai;

const txtEmail = `//span[contains(@class,'user')]/../input[@name='email']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button/span[.='Login']`;
const btnAccount = `//button[@id='ACCOUNT']`;
const ddlAccountOption = `//div[contains(@class,'dropdown')]//a[normalize-space(text())='optionValue']`;
const txtAccountInf = `//input[@placeholder='fieldName']`;
const btnSignUp = `//button[@id='button']`;
const msgCredentialError = `//div[contains(@class,'alert alert-danger failed')]`;

const self = module.exports = {
  /**
  * Type user email into the email text box.
  * @param {string} email The user email.
  */
  async typeEmail(email) {
    await keywords.setText.call(this, txtEmail, email);
    this.attach(`User enter email: ${email}`);
  },

  /**
  * Type user password into the password text box.
  * @param {string} password The user password.
  */
  async typePassword(password) {
    await keywords.setText.call(this, txtPassword, password);
    this.attach(`User enter password: ${password}`);
  },

  /**
  * Click the Login button.
  */
  async clickBtnLogin() {
    await common.waitLoading.call(this);
    await keywords.waitClick.call(this, btnLogin);
  },
  /**
  * Select the account option for login or sign up.
  * @param {string} accountOption The account option.
  */
  async selectDdlAccountOption(accountOption) {
    await keywords.waitClick.call(this, btnAccount);
    const ddlOption = ddlAccountOption.replace('optionValue', accountOption);
    await keywords.waitClick.call(this, ddlOption);
    await keywords.sleepFor(5000);
  },
  /**
  * Fill all information and sign up.
  * @param {string} first The first name.
  * @param {string} last The last name.
  * @param {string} phone The phone number.
  * @param {string} email The user email.
  * @param {string} pass The user pasword.
  */
  async fillTxtAndSignUpAccount(first, last, phone, email, pass) {
    await self.typeTxtFirstName.call(this, first);
    await keywords.sleepFor(1000);
    await self.typeTxtLastName.call(this, last);
    await keywords.sleepFor(1000);
    await self.typeTxtPhone.call(this, phone);
    await keywords.sleepFor(1000);
    await self.typeTxtEmailSignUp.call(this, email);
    await keywords.sleepFor(1000);
    await self.typeTxtPasswordSignUp.call(this, pass);
    await self.clickBtnSignUp.call(this);
  },
  /**
  * Type first name into the first name text box for sign up
  * @param {string} first The user first name.
  */
  async typeTxtFirstName(first) {
    const field = txtAccountInf.replace('fieldName', 'First Name');
    await keywords.setText.call(this, field, first);
    this.attach(`User enter first name: ${first}`);
  },
  /**
  * Type last name into the last name text box for sign up
  * @param {string} last The user last name.
  */
  async typeTxtLastName(last) {
    const field = txtAccountInf.replace('fieldName', 'Last Name');
    await keywords.setText.call(this, field, last);
    this.attach(`User enter last name: ${last}`);
  },
  /**
  * Type phone into the phone text box for sign up
  * @param {string} phone The user phone number.
  */
  async typeTxtPhone(phone) {
    const field = txtAccountInf.replace('fieldName', 'Phone');
    await keywords.setText.call(this, field, phone);
    this.attach(`User enter phone: ${phone}`);
  },
  /**
  * Type user email into the email text box for sign up
  * @param {string} email The user email.
  */
  async typeTxtEmailSignUp(email) {
    const field = txtAccountInf.replace('fieldName', 'Email');
    await keywords.setText.call(this, field, email);
    this.attach(`User enter email: ${email}`);
  },
  /**
  * Type user password into the password text box for sign up
  * @param {string} pass The user password.
  */
  async typeTxtPasswordSignUp(pass) {
    const field = txtAccountInf.replace('fieldName', 'Password');
    await keywords.setText.call(this, field, pass);
    this.attach(`User enter password: ${pass}`);
  },

  /**
  * Select sign up button
  */
  async clickBtnSignUp() {
    await keywords.removeAttribute.call(this, btnSignUp, 'disabled');
    await keywords.scrollIntoView.call(this, btnSignUp, 1000);
    await keywords.waitClick.call(this, btnSignUp);
    await keywords.sleepFor(1000);
  },

  /**
  * User switch to the net tab to log in
  */
  async switchToLogIn() {
    await keywords.switchNextWindown.call(this);
  },

  /**
  * Verify the Credential error
  * @param {string} expectedMessage The expected credential error
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
  * @param {string} expectedMessage The expected credential error
  * @param {string} field The expected credential error
  */
  async verifyMsgValidationMessage(expectedMessage, field) {
    let element = await keywords.waitUntilElementLocated.call(this, txtPassword);
    if (field !== 'Password') {
      element = await keywords.waitUntilElementLocated.call(this, txtEmail);
    }
    const actualMessage = await element.getAttribute('validationMessage');
    this.attach(`Actual message: ${actualMessage}`);
    this.attach(`Expected message: ${expectedMessage}`);
    assert.equal(actualMessage, expectedMessage);
  },
};
