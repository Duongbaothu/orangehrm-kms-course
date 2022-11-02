const keywords = require('./keywords');

const lblCurrencyBooking = `//div[@class='sidebar-widget-item']/..//span[contains(@class,'text-value')]`;

module.exports = {
  /**
  * Verify currency text showed in Price on Booking page.
  * @param {string} currency The currency text.
  */
  async checkCurrencyBooking(currency) {
    await keywords.verifyElementIncludeText.call(this, lblCurrencyBooking, currency);
  },
};
