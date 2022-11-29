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
const btnLanguage = `//button[@id='languages']`;
const lblCopyRight = `//div[contains(@class,'container')]//div[contains(@class,' footer-item')]//ul`;
const ddlLanguage = `//button[@id='languages']//following-sibling::ul//a[normalize-space(text())='selectedLanguage']`;

const self = module.exports = {
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

  /**
  * Select language at Home page
  * @param {string} language The select language
  */
  async selectDdlLanguageByValue(language) {
    await common.waitLoading.call(this);
    const ddl = ddlLanguage.replace('selectedLanguage', language);
    await keywords.waitClick.call(this, btnLanguage);
    keywords.scrollIntoView.call(this, ddl);
    await keywords.waitClick.call(this, ddl);
    await keywords.sleepFor(500);
  },

  /**
  * Wait and verify the selected language label displays on Home page
  * @param {string} label The language label
  */
  async verifyLblSelectedLanguageByValue(label) {
    const expectedlabel = label.toUpperCase();
    await keywords.waitUntilElementIsVisible.call(this, btnLanguage);
    const actualLabel = await keywords.waitAndGetText.call(this, btnLanguage);
    this.attach(`Actual selected language: ${actualLabel}`);
    this.attach(`Expected selected language: ${expectedlabel}`);
    assert.equal(actualLabel, expectedlabel);
  },

  /**
  * Wait and verify the copyright displays correctly with the selected language on Home page
  * @param {string} copyright The copyright text
  */
  async verifyLblCopyRightByValue(copyright) {
    await common.waitLoading.call(this);
    keywords.sleepFor(4000);
    keywords.scrollIntoView.call(this, lblCopyRight);
    const actualLabel = await keywords.waitAndGetText.call(this, lblCopyRight);
    this.attach(`Actual copyRight: ${actualLabel}`);
    this.attach(`Expected copyRight: ${copyright}`);
    assert.equal(actualLabel, copyright);
  },

  /**
  * Verify language selected sequential and displayed corectly on Home Page
  * @param {string} expectedListLanguages The list of languages
  */
  async verifyLstLanguages(expectedListLanguages) {
    const languages = expectedListLanguages.split(',');
    for (const language of languages) {
      this.attach(`Select language: ${language}`);
      await self.selectDdlLanguageByValue.call(this, language);
      keywords.sleepFor(4000);
      await self.verifyLblSelectedLanguageByValue.call(this, language);
    };
  },
};

