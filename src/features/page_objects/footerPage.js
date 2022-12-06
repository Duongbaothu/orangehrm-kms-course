const keywords = require('./keywords');
const common = require('./common');

const btnOnFooterByHref = `//*[contains(@class,'footer-area')]//*[@href=hrefOfElement]`;

module.exports = {
  /**
  * Scroll to the Footer.
  */
  async scrollToFooter() {
    await common.waitLoading;
    await keywords.scrollToBottom.call(this, 1000);
  },

  /**
   * Click the elements of Footer by Xpath.
   * @param {string} href the href of footer element.
   */
  async clickBtnByHref(href) {
    const xpath = btnOnFooterByHref.replace('hrefOfElement', href);
    await keywords.waitUntilElementIsClickable.call(this, xpath);
    await keywords.waitClick.call(this, xpath);
  },
};
