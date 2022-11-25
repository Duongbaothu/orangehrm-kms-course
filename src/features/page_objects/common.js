const chai = require('chai');
const keywords = require('./keywords');
const {assert} = chai;

const icnLoading = `(//div[@id='preloader'])[1]`;

module.exports = {
  /**
  * Navigate to the page by url.
  * @param {string} url The page url.
  */
  async navigateToPage(url) {
    this.driver.get(url);
  },

  /**
  * Wait and verify the page title.
  * @param {string} title The page title.
  */
  async checkPageTitle(title) {
    await keywords.waitUntilTitleIs.call(this, title);
    const actualTitle = await this.driver.getTitle();
    this.attach(`Actual page title: ${actualTitle}`);
    this.attach(`Expected page title: ${title}`);
    assert.equal(actualTitle, title);
  },

  /**
  * Wait and verify the page URL.
  * @param {string} url The page URL.
  */
  async checkPageURL(url) {
    const actualURL = await this.driver.getCurrentUrl();
    this.attach(`Actual page url: ${actualURL}`);
    this.attach(`Expected page url: ${url}`);
    assert.equal(actualURL, url);
  },

  /**
  * Wait for the loading icon not visible.
  */
  async waitLoading() {
    await keywords.waitUntilElementIsNotVisible.call(this, icnLoading);
  },
};
