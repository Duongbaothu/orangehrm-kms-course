const keywords = require('./keywords');
const common = require('./common');
const config = require('../support/config');
const chai = require('chai');
const { assert } = chai;
const { applyJSONToString, MAFSave } = require('@ln-maf/core');

const ddlUserProfile = `//div[@class='oxd-topbar-header-userarea']//li[contains(@class, 'oxd-userdropdown')]`;
const ddoChangePassword = `//ul[@role='menu']//a[text()='Change Password']`;
const txtUserDetails = `//label[text()='$labelName']//parent::div/following-sibling::div/input`;
const btnAction = `//button[contains(., '$actionName')]`;
const lblUsername = `//div[@class='oxd-table-card']//*[text()='$username']`;
const alrtMessage = `//div[@id='oxd-toaster_1']//p[contains(@class, 'oxd-text--toast-message')]`;

/**
 * Set a local variable into global variable
 * @param {string} varName The name of variable
 * @param {string} value The variable value
 * @param {string} scenario The object to be used as the current object
 */
function setVariableToGlobal(varName, value, scenario) {
    MAFSave.call(scenario, varName, applyJSONToString(value, scenario));
}

/**
 * Generate a string with the given length of characters of the given character string
 * @author Han Hoang
 * @param {int} length The length of character string
 * @param {string} charString The character string
 * @return {string} An array of characters
 */
function generateStringOfCharacters(length, charString) {
    let result = '';
    while (length--) {
        result += charString[Math.floor(Math.random() * charString.length)];
    }
    return result;
}

const self = module.exports = {
    /**
    * Click on Change password item in User Profile
    * @author Han Hoang
    */
    async clickOnchangePasswordInUserProfile() {
        await keywords.waitClick.call(this, ddlUserProfile);
        await keywords.waitUntilElementIsVisible.call(this, ddoChangePassword);
        await keywords.waitClick.call(this, ddoChangePassword);
    },

    /**
     * Input User information which including employee/admin name and login details
     * @author Han Hoang
     * @param {string} fieldValue The user information value
     * @param {string} fieldName The name of field. Ex: Username, Password
     */
    async typeUserInformation(fieldValue, fieldName) {
        const fieldPath = txtUserDetails.replace('$labelName', fieldName);
        let value = await common.getVariableValue(fieldValue, this);
        await keywords.waitUntilElementIsVisible.call(this, fieldPath);
        if (fieldName.toLocaleLowerCase().includes('password') && (value !== config.ESS_PASSWORD) && !fieldValue.includes('HRM')) {
            value = await common.decodeString.call(this, value);
        }
        await keywords.setText.call(this, fieldPath, value);
    },

    /**
     * Generating a password with the specific length
     * @author Han Hoang
     * @param {int} passwordLength The length of password
     */
    async generatePasswordWithLength(passwordLength) {
        let password = '';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const number = '0123456789';
        const symbol = '@#$%^&*()_+~|}{[]></-=';
        const passwordFormat = upperCase + lowerCase + number + symbol;
        password += generateStringOfCharacters(1, upperCase);
        password += generateStringOfCharacters(1, lowerCase);
        password += generateStringOfCharacters(1, number);
        password += generateStringOfCharacters(1, symbol);
        password += generateStringOfCharacters(passwordLength - 4, passwordFormat);
        const newPassword = await common.encodeString.call(this, password);
        setVariableToGlobal('newPassword', newPassword, this);
    },

    /**
     * Create an ESS account by admin role with username and password
     * @author Han Hoang
     * @param {string} username The username of an account
     * @param {string} password The password of an account
     */
    async createESSAccountByAdminRole(username, password) {
        const accountUsername = await common.getVariableValue(username, this);
        const accountPassword = await common.getVariableValue(password, this);
        const btnSave = btnAction.replace('$actionName', 'Save');
        const btnAdd = btnAction.replace('$actionName', 'Add');
        await common.clickMainMenuItem.call(this, 'Admin');
        await keywords.waitUntilElementIsVisible.call(this, btnAdd);
        await common.clickBtnByName.call(this, 'Add');
        await keywords.waitUntilElementIsVisible.call(this, btnSave);
        await common.selectDropdownItemByValue.call(this, 'ESS', 'User Role');
        await common.selectDropdownItemByHint.call(this, 'Boss', 'Employee Name', 'Boss A');
        await common.selectDropdownItemByValue.call(this, 'Enabled', 'Status');
        await self.typeUserInformation.call(this, accountUsername, 'Username');
        await self.typeUserInformation.call(this, accountPassword, 'Password');
        await self.typeUserInformation.call(this, accountPassword, 'Confirm Password');
        await common.clickBtnByName.call(this, 'Save');
        await keywords.waitUntilElementIsVisible.call(this, btnAdd);
    },

    /**
     * Delete an ESS account by admin role with username
     * @author Han Hoang
     * @param {string} username The username of an account
     */
    async deleteESSAccountByAdminRole(username) {
        const accountUsername = await common.getVariableValue(username, this);
        const usernamePath = lblUsername.replace('$username', accountUsername);
        const btnAdd = btnAction.replace('$actionName', 'Add');
        await common.loginByAdminRole.call(this);
        await common.clickMainMenuItem.call(this, 'Admin');
        await keywords.waitUntilElementIsVisible.call(this, btnAdd);
        await keywords.waitAndScrollIntoView.call(this, usernamePath);
        await common.clickDeleteRecordByKey.call(this, accountUsername);
        await common.verifyPopupIsDisplayed.call(this, 'Are you Sure?');
        await common.clickBtnInPopup.call(this, 'Yes, Delete');
        await common.popupIsNotDisplayed.call(this, 'Are you Sure?');
    },

    /**
     * Verify alert message is displayed
     * @author Han Hoang
     * @param {string} expectedAlertMessage The alert message. Ex: Successfully Save, Invalid Parameter
     */
    async verifyAlert(expectedAlertMessage) {
        await keywords.waitUntilElementIsVisible.call(this, alrtMessage);
        const actualAlertMessage = await keywords.waitAndGetText.call(this, alrtMessage);
        assert.equal(true, actualAlertMessage.includes(expectedAlertMessage));
    },
};
