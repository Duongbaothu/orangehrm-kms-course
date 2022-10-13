const keywords = require('./keywords');
const common = require('./common');

const txtEmail = `//span[contains(@class,'user')]/../input[@name='email']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button/span[.='Login']`;

module.exports = {
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
};
