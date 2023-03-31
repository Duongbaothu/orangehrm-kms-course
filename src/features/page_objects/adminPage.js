require('@ln-maf/validations');
require('@ln-maf/core');
const chai = require('chai');
const keywords = require('./keywords');
const {assert} = chai;

const itemMainMenu = `//ul[@class='oxd-main-menu']//li//span[text()='$itemName']`;

module.exports = {
  /**
   * Verify the item in main menu is displayed.
   * @param {string} itemName The item name in main menu. Ex: Admin, Dashboard,...
   */
  async verifyItemMainMenuIsDisplayed(itemName) {
    const item = itemMainMenu.replace('$itemName', itemName);
    const result = keywords.verifyElementIsDisplayed.call(this, item);
    assert(result, true);
  },
};
