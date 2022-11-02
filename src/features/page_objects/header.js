const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const {assert} = chai;

const btnAccount = `//button[@id='ACCOUNT']`;
const btnCustomerLogin = `//button[@id='ACCOUNT']/..//a[contains(.,'Customer Login')]`;
const logoImage = `//div[@class="logo"]//img[@alt="logo"]`;
const ddlCompany = `//div[@class='main-menu-content w-100']//li[@class='footm']/a[@href='company']`;
const ddoCompany = `//div[@class='main-menu-content w-100']//li[@class='footm']
/a[@href='company']/..//a[text()='$optionName']`;
const lnkPage = `//div[@class='main-menu-content w-100']//*[@href='$href']`;
const btnCurrency = `//button[@id='currency']`;
const ddoCurrency = `//ul[@class='dropdown-menu show']/..//a[contains(.,'$optionName')]`;

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

  /**
  * Select the currency based on its name.
  * @param {string} optionName The currency option name.
  */
  /**
  * Click the Logo image.
  */
  async clickLogoImage() {
    await common.waitLoading.call(this);
    await keywords.waitClick.call(this, logoImage);
  },

  /**
  * Click page link.
  * @param {String} href The page link.
  */
  async clickPageLink(href) {
    await common.waitLoading.call(this);
    const lnk = lnkPage.replace(`$href`, href);
    await keywords.waitClick.call(this, lnk);
  },

  /**
  * Hover in Company dropdown list.
  */
  async hoverDDLCompany() {
    await common.waitLoading.call(this);
    await keywords.moveMouse.call(this, ddlCompany);
  },

  /**
  * Select the option in Company dropdown list
  * @param {String} optionName The option.
  */
  async clickCompanyOptions(optionName) {
    const xpath = ddoCompany.replace(`$optionName`, optionName);
    await keywords.waitClick.call(this, xpath);
  },

  async selectCurrency(optionName) {
    const xpath = ddoCurrency.replace(`$optionName`, optionName);
    await common.waitLoading.call(this);
    await keywords.waitClick.call(this, btnCurrency);
    await keywords.waitClick.call(this, xpath);
  },

  /**
  * Verify currency text showed on Currency button.
  * @param {string} currency The currency text.
  */
  async checkCurrencyText(currency) {
    await keywords.waitUntilElementIsVisible.call(this, btnCurrency);
    const actualCurrency = await keywords.waitAndGetText.call(this, btnCurrency);
    this.attach(`Actual currency text is: ${actualCurrency}`);
    this.attach(`Expected currency text is: ${currency}`);
    assert.equal(actualCurrency, currency);
  },
};
