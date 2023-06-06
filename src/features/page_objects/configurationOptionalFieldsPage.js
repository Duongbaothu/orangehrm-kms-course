const { assert } = require('chai');
const keywords = require('./keywords');
const common = require('./common');

let isCheckboxEnable = false;
const chkRecord = `//p[text()='$optionName']//parent::div//input[@type='checkbox']`;
const lblEmployeeDetails = `//label[text()='$fieldName']`;
const frmEmployeeDetails = `//label[text()='$fieldName']//parent::div/following-sibling::div//input`;
const tabTaxExemptions = `//div[@role='tab']//a[contains(text(),'Tax Exemptions')]`;
const tabItemInEmpInfoMenu = `//div[@role='tablist']//div[@role='tab']/a[contains(text(),'$tabName')]`;
const lblFormTitle = `//p[contains(@class, 'orangehrm-main-title')]`;

const self = module.exports = {
    /**
    * Enable the checkbox by option name
    * @author Han Hoang
    * @param {string} optionName The name of option. Ex: Show US Tax Exemptions menu, Show SIN field in Personal Details
    */
    async enableCheckboxByOptionName(optionName) {
        const optionPath = chkRecord.replace('$optionName', optionName);
        if (await keywords.isSelected.call(this, optionPath) == false) {
            await keywords.waitClick.call(this, optionPath + '//../span');
        }
    },

    /**
    * Select the checkbox by option name in Optional Fields Page
    * @author Han Hoang
    * @param {string} status The status of option, enable or disable the checkbox
    * @param {string} optionName The name of option. Ex: Show US Tax Exemptions menu, Show SIN field in Personal Details
    */
    async clickOnCheckboxByOptionNameInOptionalFieldsPage(status, optionName) {
        const optionPath = chkRecord.replace('$optionName', optionName);
        await common.clickMainMenuItem.call(this, 'PIM');
        await common.selectDropdownMenuItemByText.call(this, 'Configuration', 'Optional Fields');
        if (await keywords.isSelected.call(this, optionPath) && status.toLowerCase() == 'disable') {
            await keywords.waitClick.call(this, optionPath + '//../span');
        } else if (await keywords.isSelected.call(this, optionPath) == false && status.toLowerCase() == 'enable') {
            await self.enableCheckboxByOptionName.call(this, optionName);
        }
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
     * Click on an item in Employee Information menu of My Info Page
     * @author Han Hoang
     * @param {string} item The name of item. Ex: Personal Details, Contact Details
     */
    async clickOnItemInEmployeeInformationMenu(item) {
        const itemPath = tabItemInEmpInfoMenu.replace('$tabName', item);
        await common.clickMainMenuItem.call(this, 'My Info');
        await keywords.waitUntilElementIsVisible.call(this, itemPath);
        await keywords.waitAndScrollIntoView.call(this, itemPath);
        await keywords.waitClick.call(this, itemPath);
    },

    /**
     * Input employee information into a field
     * @author Han Hoang
     * @param {string} fieldName The name of field. Ex: Nickname, Driver's License Number
     * @param {string} fieldValue The value of field, using 'True' to enable the checkbox
     */
    async inputEmployeeInformation(fieldName, fieldValue) {
        let fieldPath = frmEmployeeDetails.replace('$fieldName', fieldName);
        if (fieldName.includes(',')) {
            const arrFields = fieldName.split(',').map((str) => str.trim());
            const arrValues = fieldValue.split(',').map((str) => str.trim());
            if (arrFields.length === arrValues.length) {
                for (let index = 0; index < arrFields.length; index ++) {
                    fieldPath = frmEmployeeDetails.replace('$fieldName', arrFields[index]);
                    await keywords.waitAndScrollIntoView.call(this, fieldPath);
                    if (arrValues[index] === 'True') {
                        if (await keywords.isSelected.call(this, fieldPath) === false) {
                            await keywords.waitClick.call(this, fieldPath + '//parent::label//span');
                            isCheckboxEnable = true;
                        }
                    } else {
                        await keywords.setText.call(this, fieldPath, arrValues[index]);
                    }
                }
            }
        } else {
            await keywords.waitAndScrollIntoView.call(this, fieldPath);
            await keywords.setText.call(this, fieldPath, fieldValue);
        }
    },

    /**
     * Reset the changed field values to default/ empty
     * @author Han Hoang
     * @param {string} fieldName The name of field. Ex: Nickname, Employee Id
     */
    async resetFieldValueToDefault(fieldName) {
        let fieldPath = frmEmployeeDetails.replace('$fieldName', fieldName);
        if (fieldName.includes(',')) {
            const arrFields = fieldName.split(',').map((str) => str.trim());
            for (let index = 0; index < arrFields.length; index ++) {
                fieldPath = frmEmployeeDetails.replace('$fieldName', arrFields[index]);
                await keywords.waitAndScrollIntoView.call(this, fieldPath);
                if (arrFields[index] === 'Smoker') {
                    if (isCheckboxEnable === true) {
                        await keywords.waitClick.call(this, fieldPath + '//parent::label//span');
                        isCheckboxEnable = false;
                    }
                } else {
                    await keywords.setText.call(this, fieldPath, '');
                }
            }
        } else {
            await keywords.waitAndScrollIntoView.call(this, fieldPath);
            await keywords.setText.call(this, fieldPath, '');
        }
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
     * Verify the field is displayed
     * @author Han Hoang
     * @param {string} typeOfElement The type of element. Ex: field, tab
     * @param {string} fieldName The name of field. Ex: Nickname, Employee Full Name
     */
    async verifyTheFieldIsDisplayed(typeOfElement, fieldName) {
        let fieldPath = lblEmployeeDetails.replace('$fieldName', fieldName);
        await common.waitPageHeaderIsLoaded.call(this);
        if (fieldName.includes(',')) {
            const arrFields = fieldName.split(',').map((str) => str.trim());
            for (let index = 0; index < arrFields.length; index ++) {
                fieldPath = lblEmployeeDetails.replace('$fieldName', arrFields[index]);
                await keywords.waitAndScrollIntoView.call(this, fieldPath);
                await keywords.verifyElementIsDisplayed.call(this, fieldPath);
            }
        } else {
            const element = (typeOfElement === 'tab') ? tabTaxExemptions : fieldPath;
            await keywords.verifyElementIsDisplayed.call(this, element);
        }
    },

    /**
     * Verify the field is not displayed
     * @author Han Hoang
     * @param {string} typeOfElement The type of element. Ex: field, tab
     * @param {string} fieldName The name of field. Ex: Nickname, Employee Full Name
     */
    async verifyTheFieldIsNotDisplayed(typeOfElement, fieldName) {
        let fieldPath = lblEmployeeDetails.replace('$fieldName', fieldName);
        let actualResult = false;
        if (await common.verifyTheMainTitleIsDisplayed.call(this, 'Personal Details')) {
            if (fieldName.includes(',')) {
                const arrFields = fieldName.split(',').map((str) => str.trim());
                for (let index = 0; index < arrFields.length; index ++) {
                    fieldPath = lblEmployeeDetails.replace('$fieldName', arrFields[index]);
                    if (await keywords.elementIsExisted.call(this, fieldPath)) {
                        actualResult = true;
                        break;
                    }
                }
            } else {
                const element = (typeOfElement === 'tab') ? tabTaxExemptions : fieldPath;
                actualResult = await keywords.elementIsExisted.call(this, element);
            }
        }
        assert.equal(actualResult, false);
    },

    /**
     * Verify form title in Optional Field Page
     * @author Han Hoang
     * @param {string} expectedTitle The expected title of form
     */
    async verifyTheFormTitleInOptionFieldPage(expectedTitle) {
        await common.waitPageHeaderIsLoaded.call(this);
        const actualFormTitle = await keywords.waitAndGetText.call(this, lblFormTitle);
        assert.equal(actualFormTitle, expectedTitle);
    },
};
