const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;
const { TIMEOUT_SHORT } = require('../support/config');
let numberOfRecordsFound = 0;

const btnAction = `//button[normalize-space(.)='$action']`;
const txtName = `//form/div/div/div/input[contains(@class, 'oxd-input oxd-input--active')]`;
const lblFormTitle = `//h6[contains(@class, 'orangehrm-main-title')]`;
const lblNameError = `//span[contains(@class, 'oxd-input-field-error-message')]`;
const clickDeleteIconOfEmpName = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Employment Status')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$nameTitle']]//i[contains(@class, 'bi-trash')]`;
const dlgDeleteConfirm = `//div[@role = 'dialog' and .//p[contains(@class, 'oxd-text--card-title') and normalize-space(.) = 'Are you Sure?']]`;
const btnConfirmPopupButtonByName = `//div[@role = 'dialog' and .//p[contains(@class, 'oxd-text--card-title') and normalize-space(.) = 'Are you Sure?']]//button[normalize-space(.) = '$btnName']`;

module.exports = {
    /**
     * Click button
     * @author Nguyet Duong
     * @param {string} action The name of button
     */
    async clickBtnAction(action) {
        await common.waitLoading.call(this);
        const btnActXpath = btnAction.replace(`$action`, action);
        await keywords.waitAndScrollIntoView.call(this, btnActXpath, TIMEOUT_SHORT);
        await keywords.waitClick.call(this, btnActXpath);
    },

    /**
     * Verify form title
     * @author Nguyet Duong
     * @param {string} expectedTitle The expected title of form
     */
    async verifyTheFormTitle(expectedTitle) {
        const actualFormTitle = await keywords.waitAndGetText.call(this, lblFormTitle);
        assert.equal(actualFormTitle, expectedTitle);
    },

    /**
     * Input the employment status name at the Name textbox
     * @author Nguyet Duong
     * @param {string} name The employment status name
     */
    async typeEmploymentStatusName(name) {
        const value = await common.getVariableValue(name, this);
        await keywords.setText.call(this, txtName, value);
    },

    /**
     * Verify the employment status name on the table
     * @author Nguyet Duong
     * @param {string} name The employment status name
     */
    async verifyNameIsVisibale(name) {
        const value = await common.getVariableValue(name, this);
        await keywords.waitUntilElementLocated.call(this, txtName);
        await keywords.waitUntilElementLocated.call(this, lblFormTitle);
        const actualName = await keywords.waitAndGetAttribute.call(this, txtName, 'value');
        assert.equal(actualName, value);
    },

    /**
     * Verify the error message under textbox
     * @author Nguyet Duong
     * @param {string} expectedValidationMsg The expected the message
     */
    async verifyValidationErrorMessage(expectedValidationMsg) {
        const actualValidationMsg = await keywords.waitAndGetText.call(this, lblNameError);
        assert.equal(actualValidationMsg, expectedValidationMsg);
    },

    /**
     * Click the Delete icon
     * @author Nguyet Duong
     * @param {string} name The employment status name
     */
    async clickDeleteIconOfEmpName(name) {
        const value = await common.getVariableValue(name, this);
        const btnDeleteIcon = clickDeleteIconOfEmpName.replace('$nameTitle', value);
        await keywords.waitClick.call(this, btnDeleteIcon);
    },

    /**
     * Verify the pop-up displayed
     * @author Nguyet Duong
     */
    async verifyConfirmPopupDislayed() {
        await keywords.waitUntilElementIsVisible.call(this, dlgDeleteConfirm);
        await keywords.verifyElementIsDisplayed.call(this, dlgDeleteConfirm);
    },

    /**
     * Verify the pop-up is not displayed
     * @author Nguyet Duong
     */
    async verifyConfirmPopupNotDislayed() {
        await keywords.waitForElementIsNotPresent.call(this, dlgDeleteConfirm);
    },

    /**
     * Click button in pop-up
     * @author Nguyet Duong
     * @param {string} buttonName the button in pop-up
     */
    async clickBtnInPopup(buttonName) {
        const btnAction = btnConfirmPopupButtonByName.replace('$btnName', buttonName);
        await keywords.waitClick.call(this, btnAction);
    },

    /**
    * Get the number of records found page loaded
    * @author Nguyet Duong
    */
    async getNumberOfRecords() {
        numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    },

    /**
    * Verify the number of records after added
    * @author Nguyet Duong
    * @param {string} number The number of records added
    */
    async verifyIncreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound + Number(number);
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
    * Verify the number of records after deleted
    * @author Nguyet Duong
    * @param {string} number The number of records deleted
    */
    async verifyDecreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound - Number(number);
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
    * clean up the employment status name data after adding
    * @author Nguyet Duong
    * @param {string} name The employment status name
    */
    async removeEmpStatusName(name) {
        const value = await common.getVariableValue(name, this);
        await common.deleteRecordByKey.call(this, value);
    },

};
