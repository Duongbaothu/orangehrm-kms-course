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
const txtUserDetails = `//label[text()='$labelName']//parent::div/following-sibling::div//input`;
const btnAction = `//button[contains(.,'$buttonName')]`;
const ddlUserProfile = `//div[@class='oxd-topbar-header-userarea']//li[contains(@class, 'oxd-userdropdown')]`;
const ddoLogout = `//ul[@role='menu']//a[text()='Logout']`;

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

    /**
     * Verify the item in main menu is not displayed.
     * @author Han Hoang
     * @param {string} itemName The item name in main menu. Ex: Admin, Dashboard,...
     */
    async verifyItemMainMenuIsNotDisplayed(itemName) {
        const item = itemMainMenu.replace('$itemName', itemName);
        const acutalResult = await keywords.elementIsExisted.call(this, item);
        assert.equal(acutalResult, false);
    },

    /**
     * Click on button by name
     * @author Han Hoang
     * @param {string} buttonName The name of button. Ex: Add, Save
     */
    async clickOnButtonByName(buttonName) {
        const actionPath = btnAction.replace('$buttonName', buttonName);
        await keywords.waitAndScrollIntoView.call(this, actionPath);
        await keywords.waitClick.call(this, actionPath);
    },

    /**
     * Input User information which including employee/admin name and login details
     * @author Han Hoang
     * @param {string} fieldValue The user information value
     * @param {string} fieldName The name of field. Ex: Username, Password
     */
    async inputUserInformation(fieldValue, fieldName) {
        const fieldPath = txtUserDetails.replace('$labelName', fieldName);
        const value = await common.getVariableValue(fieldValue, this);
        await keywords.setText.call(this, fieldPath, value);
    },

    /**
    * Logout the account
    * @author Han Hoang
    */
    async logout() {
        await keywords.waitClick.call(this, ddlUserProfile);
        if (keywords.waitUntilElementIsVisible.call(this, ddoLogout)) {
            await keywords.waitClick.call(this, ddoLogout);
        }
    },
};
