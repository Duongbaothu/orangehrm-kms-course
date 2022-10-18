// eslint-disable-next-line no-unused-vars
const {By, until, WebElement} = require('selenium-webdriver');
const {promisify} = require('util');
const {timeout} = require('../../../config');
const sleep = promisify(setTimeout);
const chai = require('chai');
const {assert} = chai;

const self = module.exports = {
  /**
  * Wait until the element is present on DOM.
  * @param {String} xpath The element xpath.
  * @return {WebElement} The web element.
  */
  async waitUntilElementLocated(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  },

  /**
  * Wait until the element is not present on DOM.
  * @param {WebElement} element The web element.
  * @return {Boolean} true if the element is not present on DOM otherwise false.
  */
  async waitUntilStalenessOfElement(element) {
    return this.driver.wait(until.stalenessOf(element), timeout);
  },

  /**
  * Wait until the element is present on DOM and visible on UI.
  * @param {String} xpath The element xpath.
  * @return {WebElement} The web element.
  */
  async waitUntilElementIsVisible(xpath) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    return this.driver.wait(until.elementIsVisible(element), timeout);
  },

  /**
  * Wait until the element is present on DOM but not visible on UI.
  * @param {String} xpath The element xpath.
  * @return {WebElement} The web element.
  */
  async waitUntilElementIsNotVisible(xpath) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    return this.driver.wait(until.elementIsNotVisible(element), timeout);
  },

  /**
  * Wait until the element is clickable.
  * @param {String} xpath The element xpath.
  * @return {WebElement} The web element.
  */
  async waitUntilElementIsClickable(xpath) {
    const element = await self.waitUntilElementIsVisible.call(this, xpath);
    return this.driver.wait(until.elementIsEnabled(element), timeout);
  },

  /**
  * Sleep and wait for ms milliseconds.
  * @param {String} ms The number of milliseconds to sleep.
  */
  async sleepFor(ms) {
    await sleep(ms);
  },

  /**
  * Wait until the title is matched.
  * @param {String} title The page title.
  */
  async waitUntilTitleIs(title) {
    return this.driver.wait(until.titleIs(title), timeout);
  },

  /**
  * Clear text box then input text.
  * @param {String} xpath The text box xpath.
  * @param {String} text The text you want to input.
  */
  async setText(xpath, text) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    element.clear();
    element.sendKeys(text);
  },

  /**
  * Wait the element to be clickable then click it.
  * @param {String} xpath The element xpath.
  */
  async waitClick(xpath) {
    const element = await self.waitUntilElementIsClickable.call(this, xpath);
    element.click();
  },

  /**
  * Wait and get text.
  * @param {String} xpath The element xpath.
  * @return {String} Text of element.
  */
  async waitAndGetText(xpath) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    const result = await element.getText();
    return result;
  },

  /**
  * Wait and get attribute value.
  * @param {String} xpath The element xpath.
  * @param {String} attribute The element attribute.
  * @return {String} Attribute value of the element.
  */
  async waitAndGetAttribute(xpath, attribute) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    const result = await element.getAttribute(attribute);
    return result;
  },

  /**
  * Click dropdown option by value.
  * @param {String} xpath The element xpath.
  * @param {String} valueExpect The expected value.
  */
  async waitAndClickDropdownOptionByValue(xpath, valueExpect) {
    await self.waitUntilElementIsClickable.call(this, xpath);
    await driver.findElements(By.xpath(xpath)).then((elements) => {
      elements.forEach(async (element) => {
        const value = await element.getAttribute('value');
        if (value === String(valueExpect)) {
          element.click();
        }
      });
    });
  },

  /**
  * Scroll element into view(middle).
  * @param {String} xpath The element xpath.
  * @param {String} ms The number of milliseconds to wait for scroll to complete.
  */
  async scrollIntoView(xpath, ms) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    const script = `
            arguments[0].scrollIntoView({
              behavior: 'auto',
              block: 'center',
              inline: 'center'
            });
          `;
    await this.driver.executeScript(script, element);
    await sleep(ms);
  },

  /**
  * Scroll to top of the page.
  * @param {String} ms The number of milliseconds to wait for scroll to top complete.
  */
  async scrollToTop(ms) {
    const script = `
            window.focus();
            window.scrollTo(0, 0);
          `;
    await this.driver.executeScript(script);
    await sleep(ms);
  },

  /**
  * Scroll to bottom of the page.
  * @param {String} ms The number of milliseconds to wait for scroll to bottom complete.
  */
  async scrollToBottom(ms) {
    const script = `
            window.focus();
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
          `;
    await this.driver.executeScript(script);
    await sleep(ms);
  },

  /**
  * Verify Element is displayed.
  * @param {String} xpath The element xpath.
  */
  async verifyElementIsDisplayed(xpath) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    const result = element.isDisplayed();
    assert(result, true);
  },

  /**
  * Remove attribute of element.
  * @param {String} xpath The element xpath.
  * @param {String} attribute The element attribute.
  */
  async removeAttribute(xpath, attribute) {
    const element = await self.waitUntilElementLocated.call(this, xpath);
    const script = `arguments[0].removeAttribute('${attribute}')`;
    await this.driver.executeScript(script, element);
  },

  /**
  * Move mouse over the element.
  * @param {String} xpath The element xpath.
  */
  async moveMouse(xpath) {
    const element = await self.waitUntilElementIsClickable.call(this, xpath);
    await this.driver.actions().move({origin: element, x: 0, y: 0}).perform();
  },
};
