const chai = require('chai');
const keywords = require('./keywords');
const { assert } = chai;
const common = require('./common');

const txtUsername = `//input[@name='username']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button[contains(@type,'submit')]`;
const msgValidationError = `//input[@name='$fieldName']/parent::*/following-sibling::span`;
const msgCredentialError = `//div[contains(@class,'oxd-alert-content--error')]`;
const itemMainMenu = `//ul[@class='oxd-main-menu']//li//span[text()='$itemName']`;

module.exports = {

    /**
     * Login to system using username and password
     * @author Han Hoang
     * @param {string} username The username of an account
     * @param {string} password The password of an account
     */
    async login(username, password) {
        await keywords.setText.call(this, txtUsername, common.getVariableValue(username, this));
        await keywords.setText.call(this, txtPassword, common.getVariableValue(password, this));
        await keywords.waitClick.call(this, btnLogin);
    },

    /**
     * Verify the credential error message
     * @author Han Hoang
     * @param {string} expectedMessage The expected credential error message
     */
    async verifyCredentialErrorMessage(expectedMessage) {
        const actualMessage = await keywords.waitAndGetText.call(this, msgCredentialError);
        assert.equal(actualMessage, expectedMessage);
    },

    /**
     * Verify the validation error message
     * @author Han Hoang
     * @param {string} expectedMessage The expected validation message
     * @param {string} fieldName The field name has the error message below
     */
    async verifyValidationErrorMessage(expectedMessage, fieldName) {
        const messagePath = msgValidationError.replace(`$fieldName`, fieldName);
        const actualMessage = await keywords.waitAndGetText.call(this, messagePath);
        assert.equal(actualMessage, expectedMessage);
    },

    /**
     * Verify the item in main menu is displayed.
     * @author Han Hoang
     * @param {string} itemName The item name in main menu. Ex: Admin, Dashboard,...
     */
    async verifyItemMainMenuIsDisplayed(itemName) {
        const item = itemMainMenu.replace('$itemName', itemName);
        await keywords.verifyElementIsDisplayed.call(this, item);
    },
};
