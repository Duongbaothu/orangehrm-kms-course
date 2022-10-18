const keywords = require('./keywords');
const common = require('./common');

const btnAccount = `//button[@id='ACCOUNT']`;
const btnCustomerLogin = `//button[@id='ACCOUNT']/..//a[contains(.,'Customer Login')]`;

module.exports = {
  /**
  * Click the Account button.
  */
  async clickBtnAccount() {
    await common.waitLoading.call(this);
    await keywords.waitClick.call(this, btnAccount);
  },

  /**
  * Click the Customer Login button.
  */
  async clickBtnCustomerLogin() {
    await keywords.waitClick.call(this, btnCustomerLogin);
  },
};
