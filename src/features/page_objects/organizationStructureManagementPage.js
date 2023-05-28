/* eslint-disable max-len */
const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const { assert } = chai;

const chkEditMode = `//div[@class='oxd-switch-wrapper']/label[normalize-space(.)='Edit']/span`;
const txtFieldInForm = `//label[normalize-space(.)='$fieldName']/../..//input`;
const txaFieldInForm = `//label[normalize-space(.)='$fieldName']/../..//textarea`;
const lblOrganizationName = `//div[@class="org-root-container"]/p`;
const lblUnitUnderRootOrganization = `//p[normalize-space(.)='$parentUnit']/../..//div[contains(text(),'$childUnit')]`;
const lblUnitUnderParentUnit = `//div[contains(text(),'$parentUnit')]/../../../..//div[contains(text(),'$childUnit')]`;
const btnDeleteByUnitUnderRootOrganization = `//p[normalize-space(.)='$parentUnit']/../..//div[contains(text(),'$childUnit')]/..//button/i[@class='oxd-icon bi-trash-fill']`;
const btnDeleteByUnitUnderParentUnit = `//div[contains(text(),'$parentUnit')]/../../../..//div[contains(text(),'$childUnit')]/..//button/i[@class='oxd-icon bi-trash-fill']`;
const btnEditByUnitUnderRootOrganization = `//p[normalize-space(.)='$parentUnit']/../..//div[contains(text(),'$childUnit')]/..//button/i[@class='oxd-icon bi-pencil-fill']`;
const btnEditByUnitUnderParentUnit = `//div[contains(text(),'$parentUnit')]/../../../..//div[contains(text(),'$childUnit')]/..//button/i[@class='oxd-icon bi-pencil-fill']`;
const btnAddIcon = `//div[contains(text(),'$unitName')]/..//button/i[@class='oxd-icon bi-plus']`;
const btnClose = `//button[contains(@class, 'oxd-dialog-close-button')]`;
const lblFormLoader = `//div[contains(@class, 'oxd-form-loader')]`;
const btnExpand = `//div[contains(text(),'$unitName')]/../../..//button[@class='oxd-icon-button']`;

/**
* Check whether a child unit with name is displayed under a parent unit or not
* @author Nam Hoang
* @param {String} childUnit the name of child unit
* @param {String} parentUnit the name of parent unit
* @return {Boolean} Element is displayed or not
*/
async function isDisplayed(childUnit, parentUnit) {
    const valueParentUnit = await common.getVariableValue(parentUnit, this);
    const valueChildUnit = await common.getVariableValue(childUnit, this);
    const organizationName = await keywords.waitAndGetText.call(this, lblOrganizationName);
    let isDisplayed = false;
    let lblUnit = '';
    if (valueParentUnit === organizationName) {
        lblUnit = lblUnitUnderRootOrganization.replace('$parentUnit', valueParentUnit);
        lblUnit = lblUnit.replace('$childUnit', valueChildUnit);
        isDisplayed = await keywords.elementIsExisted.call(this, lblUnit);
    } else {
        await self.clickExpandButton.call(this, valueParentUnit);
        lblUnit = lblUnitUnderParentUnit.replace('$parentUnit', valueParentUnit);
        lblUnit = lblUnit.replace('$childUnit', valueChildUnit);
        isDisplayed = await keywords.elementIsExisted.call(this, lblUnit);
    }
    return isDisplayed;
}

const self = module.exports = {

    /**
    * Click Enable or Disable Edit Mode
    * @author Nam Hoang
    */
    async clickEnableOrDisableEditMode() {
        await keywords.waitClick.call(this, chkEditMode);
    },

    /**
    * Verify to the dialog does not display
    * @author Nam Hoang
    */
    async verifyDialogNotDisplay() {
        await keywords.waitForElementIsNotPresent.call(this, btnClose);
        const result = await keywords.elementIsExisted.call(this, btnClose);
        assert.isFalse(result);
    },

    /**
    * Click expand button
    * @author Nam Hoang
    * @param {String} unitName the name of unit
    */
    async clickExpandButton(unitName) {
        const valueUnitName = await common.getVariableValue(unitName, this);
        const btnExpandByName = btnExpand.replace('$unitName', valueUnitName);
        await keywords.waitUntilElementIsVisible.call(this, btnExpandByName);
        await keywords.waitClick.call(this, btnExpandByName);
    },

    /**
    * Click Enable or Disable Edit Mode
    * @author Nam Hoang
    * @param {string} text Content for field.
    * @param {string} fieldName The field name. Ex: Unit ID, Name, Description,...
    */
    async typeTextForField(text, fieldName) {
        const valueText = await common.getVariableValue(text, this);
        const valueFieldName = await common.getVariableValue(fieldName, this);
        let inputField = '';
        if (valueFieldName === 'Description') {
            inputField = txaFieldInForm.replace('$fieldName', valueFieldName);
        } else {
            inputField = txtFieldInForm.replace('$fieldName', valueFieldName);
        }
        await keywords.setText.call(this, inputField, valueText);
    },

    /**
    * Verify child unit with name is displayed correctly under a parent unit
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async verifyUnitWithNameDisplayed(childUnit, parentUnit) {
        const isUnitDisplay = await isDisplayed.call(this, childUnit, parentUnit);
        assert.isTrue(isUnitDisplay);
    },

    /**
    * Verify child unit with name is not displayed under a parent unit
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async verifyUnitWithNameNotDisplayed(childUnit, parentUnit) {
        const isUnitDisplay = await isDisplayed.call(this, childUnit, parentUnit);
        assert.isFalse(isUnitDisplay);
    },

    /**
    * Click delete an unit by name under a parent unit
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async clickDeleteAnUnitByName(childUnit, parentUnit) {
        const valueParentUnit = await common.getVariableValue(parentUnit, this);
        const valueChildUnit = await common.getVariableValue(childUnit, this);
        const organizationName = await keywords.waitAndGetText.call(this, lblOrganizationName);
        let btnDeleteByUnit = '';
        if (valueParentUnit === organizationName) {
            btnDeleteByUnit = btnDeleteByUnitUnderRootOrganization.replace('$parentUnit', valueParentUnit);
            btnDeleteByUnit = btnDeleteByUnit.replace('$childUnit', valueChildUnit);
        } else {
            await self.clickExpandButton.call(this, valueParentUnit);
            btnDeleteByUnit = btnDeleteByUnitUnderParentUnit.replace('$parentUnit', valueParentUnit);
            btnDeleteByUnit = btnDeleteByUnit.replace('$childUnit', valueChildUnit);
        }
        await keywords.waitClick.call(this, btnDeleteByUnit);
        await common.clickBtnInPopup.call(this, 'Yes, Delete');
    },

    /**
    * Click delete unit to clean environment
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async deleteUnitToCleanEnvironment(childUnit, parentUnit) {
        const valueParentUnit = await common.getVariableValue(parentUnit, this);
        const valueChildUnit = await common.getVariableValue(childUnit, this);
        await self.clickEnableOrDisableEditMode.call(this);
        await self.clickDeleteAnUnitByName.call(this, valueChildUnit, valueParentUnit);
    },

    /**
    * Add an unit by name
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async addAnUnitByName(childUnit, parentUnit) {
        const valueParentUnit = await common.getVariableValue(parentUnit, this);
        const valueChildUnit = await common.getVariableValue(childUnit, this);
        await self.clickEnableOrDisableEditMode.call(this);
        await self.clickAddByUnitName.call(this, valueParentUnit);
        await self.typeTextForField.call(this, valueChildUnit, 'Name');
        await common.clickBtnByName.call(this, 'Save');
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        await self.clickEnableOrDisableEditMode.call(this);
        await self.verifyUnitWithNameDisplayed.call(this, valueChildUnit, valueParentUnit);
    },

    /**
    * Click edit an unit by name under a parent unit
    * @author Nam Hoang
    * @param {String} childUnit the name of child unit
    * @param {String} parentUnit the name of parent unit
    */
    async clickEditAnUnitByName(childUnit, parentUnit) {
        const valueParentUnit = await common.getVariableValue(parentUnit, this);
        const valueChildUnit = await common.getVariableValue(childUnit, this);
        const organizationName = await keywords.waitAndGetText.call(this, lblOrganizationName);
        let btnEditByUnit = '';
        if (valueParentUnit === organizationName) {
            btnEditByUnit = btnEditByUnitUnderRootOrganization.replace('$parentUnit', valueParentUnit);
            btnEditByUnit = btnEditByUnit.replace('$childUnit', valueChildUnit);
        } else {
            await self.clickExpandButton.call(this, valueParentUnit);
            btnEditByUnit = btnEditByUnitUnderParentUnit.replace('$parentUnit', valueParentUnit);
            btnEditByUnit = btnEditByUnit.replace('$childUnit', valueChildUnit);
        }
        await keywords.waitClick.call(this, btnEditByUnit);
    },

    /**
    * Click add icon with unit name
    * @author Nam Hoang
    * @param {String} unitName the name of unit
    */
    async clickAddByUnitName(unitName) {
        const valueUnitName = await common.getVariableValue(unitName, this);
        const organizationName = await keywords.waitAndGetText.call(this, lblOrganizationName);
        if (valueUnitName === organizationName) {
            await common.clickBtnByName.call(this, 'Add');
        } else {
            const btnAddByUnit = btnAddIcon.replace('$unitName', valueUnitName);
            await keywords.waitClick.call(this, btnAddByUnit);
        }
    },

    /**
    * Generate random string with specific length and set it to field name
    * @param {string} numberOfChar The length of random string
    * @param {string} labelName The field name. Ex: Name, Job Title
    */
    async generateStringAndSetItToField(numberOfChar, labelName) {
        const value = await common.generateRandomString(Number(numberOfChar));
        await self.typeTextForField.call(this, value, labelName);
    },
};
