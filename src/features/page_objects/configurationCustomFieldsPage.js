const { assert } = require('chai');
const keywords = require('./keywords');
const common = require('./common');

let numberOfCustomFieldAvailable = 0;
const btnAdd = `//button[contains(., 'Add')]`;
const tabItemInEmpInfoMenu = `//div[@role='tablist']//div[@role='tab']/a[contains(text(),'$tabName')]`;
const lblFieldName = `//label[text()='$fieldName']`;
const lblEmployeeList = `//h5[contains(@class,'oxd-text--h5')]`;
const lblNumberOfCustomFieldsAvailable = `//div[@class='orangehrm-custom-field-title']//p`;
const ddoInForm = `//div[contains(@class, 'oxd-grid-item') and .//label[normalize-space(text())='$dropdownName']]//i[contains(@class, 'oxd-select-text--arrow')]`;
const ddlInForm = `//div[contains(@class, 'oxd-grid-item') and .//label[normalize-space(text())='$dropdownName']]//div[@role='listbox']`;
const tblCustomField = `//div[@class='orangehrm-container']`;
const txtFieldInfo = `//label[text()='$fieldName']/parent::div/following-sibling::div/input`;

const self = module.exports = {

    /**
     * Input a value for a field
     * @author Han Hoang
     * @param {string} value The value of field
     * @param {string} fieldName The name of field. Ex: Field Name, Select Options when choosing type is Drop Down
     */
    async typeTextForField(value, fieldName) {
        const data = await common.getVariableValue(value, this);
        const fieldPath = txtFieldInfo.replace('$fieldName', fieldName);
        await keywords.setText.call(this, fieldPath, data);
    },

    /**
     * Click on an item/ tab in Employee Information menu of My Info Page
     * @author Han Hoang
     * @param {string} item The name of item. Ex: Personal Details, Contact Details
     */
    async clickOnTabInEmployeeInformationMenu(item) {
        const itemPath = tabItemInEmpInfoMenu.replace('$tabName', item);
        await common.clickMainMenuItem.call(this, 'My Info');
        await keywords.waitAndScrollIntoView.call(this, itemPath);
        await keywords.waitClick.call(this, itemPath);
    },

    /**
     * Delete a record by field name in Custom Fields Table
     * @author Han Hoang
     * @param {string} fieldName The name of field
     */
    async deleteRecordInCustomFieldTableByFieldName(fieldName) {
        await common.clickMainMenuItem.call(this, 'PIM');
        await keywords.waitUntilElementLocated.call(this, lblEmployeeList);
        await common.selectDropdownMenuItemByText.call(this, 'Configuration', 'Custom Fields');
        await keywords.waitUntilElementLocated.call(this, tblCustomField);
        await common.clickDeleteRecordByKey.call(this, fieldName);
        await common.clickBtnInPopup.call(this, 'Yes, Delete');
        await keywords.waitUntilElementLocated.call(this, tblCustomField);
    },

    /**
     * Delete all record in Custom Fields Table
     * @author Han Hoang
     */
    async deleteAllRecordInCustomFieldTable() {
        await keywords.waitUntilElementIsVisible.call(this, tblCustomField);
        if (await common.getNumberOfRecordsFound.call(this) >= 1) {
            await common.selectCheckboxByKeys.call(this, 'all');
            await common.deleteSeletedRecords.call(this);
        }
    },

    /**
     * Create a new field in Custom Fields table
     * @author Han Hoang
     * @param {int} numberOfTimes The number of times to create a record. Maximum 5 times
     * @param {string} value The name of field. Ex: Field Name, Select Options
     * @param {string} typeOfField The type of field. Ex: Dropdown, Text or Number
     * @param {string} ddoValues The value of drop-down list, use commas if multiple selections. Ex: option1, option2
     * @param {string} location The location of field in My Info page when it created. Ex: Personal Details, Job
     */
    async createNewFieldInCustomFieldTable(numberOfTimes, value, typeOfField, ddoValues, location) {
        const fieldValue = await common.getVariableValue(value, this);
        const type = await common.getVariableValue(typeOfField, this);
        const ddoOptions = await common.getVariableValue(ddoValues, this);
        for (let index = 0; index < numberOfTimes; index++) {
            const data = (numberOfTimes === 1) ? fieldValue : fieldValue + index;
            await common.clickBtnByName.call(this, 'Add');
            await common.selectDropdownItemByValue.call(this, location, 'Screen');
            await common.selectDropdownItemByValue.call(this, type, 'Type');
            await self.typeTextForField.call(this, data, 'Field Name');
            if (ddoOptions !== '') {
                await self.typeTextForField.call(this, ddoOptions, 'Select Options');
            }
            await common.clickBtnByName.call(this, 'Save');
            await keywords.waitUntilElementIsVisible.call(this, tblCustomField);
        }
    },

    /**
     * Edit a record in Custom Fields table
     * @author Han Hoang
     * @param {string} nameOfField The name of field. Ex: Field Name, Select Options
     * @param {string} value The new value of field
     * @param {string} optionValue The new value of dropdown
     */
    async editRecordInTable(nameOfField, value, optionValue) {
        const fieldValue = await common.getVariableValue(value, this);
        const options = await common.getVariableValue(optionValue, this);
        await keywords.waitUntilElementIsVisible.call(this, lblFieldName.replace('$fieldName', nameOfField));
        if (nameOfField === 'Screen') {
            await common.selectDropdownItemByValue.call(this, fieldValue, nameOfField);
        } else if (nameOfField === 'Type') {
            await common.selectDropdownItemByValue.call(this, fieldValue, nameOfField);
            if (fieldValue === 'Drop Down') {
                await self.typeTextForField.call(this, options, 'Select Options');
            }
        } else {
            await self.typeTextForField.call(this, fieldValue, nameOfField);
        }
    },

    /**
     * Get the number of remaining fields of the custom field
     * @author Han Hoang
     */
    async getNumberOfCustomFieldsAvailable() {
        const lblString = await keywords.waitAndGetText.call(this, lblNumberOfCustomFieldsAvailable);
        numberOfCustomFieldAvailable = Number(lblString.trim().replace(/^\D+/g, ''));
    },

    /**
     * Verify the number of remaining fields of the custom field after added
     * @author Han Hoang
     * @param {string} number The number of records added
     */
    async verifyDecreasingNumberRecords(number) {
        const lblString = await keywords.waitAndGetText.call(this, lblNumberOfCustomFieldsAvailable);
        const actualNumberOfRecordsFound = lblString.trim().replace(/^\D+/g, '');
        const expectedNumberOfRecordsFound = numberOfCustomFieldAvailable - Number(number);
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
     * Verify the field is not displayed in My Info Page
     * @author Han Hoang
     * @param {string} fieldName The name of field. Ex: Driver's License Number, Employee Id
     * @param {string} value The value of field
     */
    async verifyFieldIsNotDisplayedWithValue(fieldName, value) {
        let actualResult = false;
        const nameOfField = await common.getVariableValue(fieldName, this);
        const expectedValue = await common.getVariableValue(value, this);
        const fieldPath = lblFieldName.replace('$fieldName', nameOfField);
        const empFullNamePath = lblFieldName.replace('$fieldName', 'Employee Full Name');
        const ddoName = ddoInForm.replace('$dropdownName', nameOfField);
        const ddlItemName = ddlInForm.replace('$dropdownName', nameOfField);
        await keywords.waitUntilElementLocated.call(this, empFullNamePath);
        if (expectedValue !== '') {
            if (await keywords.elementIsExisted.call(this, ddoName)) {
                await keywords.waitAndScrollIntoView.call(this, fieldPath);
                await keywords.waitClick.call(this, ddoName);
                const arrValues = expectedValue.split(',').map((str) => str.trim());
                for (let i = 0; i < arrValues.length; i++) {
                    const actualValue = await keywords.waitAndGetText.call(this, ddlItemName);
                    if (actualValue === expectedValue) {
                        actualResult = true;
                        break;
                    }
                }
            }
        } else {
            actualResult = await keywords.elementIsExisted.call(this, fieldPath);
        }
        assert.isFalse(actualResult);
    },

    /**
     * Verify the field is displayed with specific value in My Info Page
     * @author Han Hoang
     * @param {string} fieldName The name of field. Ex: Driver's License Number, Employee Id
     * @param {string} fieldType The type of field. Ex: Text or Number or Drop Down
     * @param {string} value The value of field
     */
    async verifyFieldIsDisplayedWithValue(fieldName, fieldType, value) {
        const nameOfField = await common.getVariableValue(fieldName, this);
        const expectedValue = await common.getVariableValue(value, this);
        const fieldPath = lblFieldName.replace('$fieldName', nameOfField);
        const actualValuePath = txtFieldInfo.replace('$fieldName', nameOfField);
        const ddoName = ddoInForm.replace('$dropdownName', nameOfField);
        const ddlItemName = ddlInForm.replace('$dropdownName', nameOfField);
        if (await keywords.isDisplayed.call(this, fieldPath)) {
            await keywords.waitAndScrollIntoView.call(this, fieldPath);
            if (fieldType === 'Drop Down') {
                if (await keywords.elementIsExisted.call(this, ddoName)) {
                    await keywords.waitClick.call(this, ddoName);
                    const arrValues = expectedValue.split(',').map((str) => str.trim());
                    for (const item of arrValues) {
                        await keywords.verifyElementIncludeText.call(this, ddlItemName, item);
                    }
                } else {
                    await keywords.verifyElementIsDisplayed.call(this, fieldPath);
                }
            } else {
                const actualValue = await keywords.waitAndGetText.call(this, actualValuePath);
                assert.equal(actualValue, expectedValue);
            }
        }
    },

    /**
     * Verify Add button is not displayed
     * @author Han Hoang
     */
    async verifyAddButtonIsNotDisplayed() {
        const actualResult = await keywords.elementIsExisted.call(this, btnAdd);
        assert.isFalse(actualResult);
    },

    /**
     * Verify the field number available message
     * @author Han Hoang
     * @param {string} expectedMessage The expected message
     */
    async verifyTheFieldNumberMessage(expectedMessage) {
        const actualMessage = await keywords.waitAndGetText.call(this, lblNumberOfCustomFieldsAvailable);
        assert.equal(actualMessage, expectedMessage);
    },
};
