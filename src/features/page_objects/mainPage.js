const keywords = require('./keywords');

const lblPrice = `//span[@class='price__from mr-1']/following-sibling::span`;
const imgTour = `(//div[@class='card-img']/span[@class='badge'])[1]`;

module.exports = {
  /**
  * Verify currency text showed in Prices on page.
  * @param {string} currency The currency text.
  */
  async checkCurrencyPrice(currency) {
    await keywords.verifyElementIncludeText.call(this, lblPrice, currency);
  },

  /**
  * Select a tour on page.
  */
  async selectTour() {
    await keywords.scrollIntoView.call(this, imgTour, 3000);
    await keywords.waitClick.call(this, imgTour);
  },
};
