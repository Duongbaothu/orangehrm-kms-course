const chai = require('chai');
const { assert } = chai;
const common = require('./common');
const keywords = require('./keywords');

const txtMainTitle = `//h6[contains(@class, 'orangehrm-main-title')and(text()='$title')]`;
const txtByField = `//div[label[contains(., '$field')]]/following::input`;
const tblRecords = `//div[@role='rowgroup']//div[@class='oxd-table-card']`;
const txtNameRecord = `//div[@class='oxd-table-body']//div[text()='$value']`;
const navPaging = `//nav[@aria-label='Pagination Navigation']/ul/li`;
const btnDeleteAction = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$key']/..//i[contains(@class, 'bi-trash')]`;
const btnEditAction = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$key']/..//i[contains(@class, 'bi-pencil')]`;
const dialogDelete = `//div[contains(@class,'orangehrm-dialog-popup')]`;
const chkRecord = `//div[@class='oxd-table-body']//div[text()='$key']/../..//input[@type='checkbox']/..//span`;
const btnDeleteSelectedRecords = `//button[normalize-space(.)='Delete Selected']`;
const btnYes = `//button[normalize-space(.)='Yes, Delete']`;
const navNumber = navPaging + `/button[contains(@class,'oxd-pagination-page-item--page') and text()='$index']`;

const timeToSleep = 2000;

/**
* go to page which includes xpath in table
* @author Nhu Ho
* @param {string} xpath xpath of element
*/
async function gotoPagNumIncludeXpath(xpath) {
    let isActualDisplay = false;
    const numberPages = await keywords.countNumberOfElementsByXPath.call(this, navPaging);
    for (let index = 1; index < numberPages; index++) {
        const navNum = navNumber.replace('$index', index);
        await keywords.waitClick.call(this, navNum);
        // ensure all elements in table was shown
        await keywords.sleepFor.call(this, timeToSleep);
        isActualDisplay = await keywords.elementIsExisted.call(this, xpath);
        if (isActualDisplay) {
            break;
        }
    }
}
const self = module.exports = {

    /**
    * Type value into the inout field
    * @author Nhu Ho
    * @param {string} value The value type
    * @param {string} field The input field
    */
    async typeValueToField(value, field) {
        const valueInput = await common.getVariableValue(value, this);
        const inputField = txtByField.replace('$field', field);
        await keywords.waitUntilElementLocated.call(this, inputField);
        await keywords.setText.call(this, inputField, valueInput);
    },

    /**
    * Add new nationality successfully
    * @author Nhu Ho
    * @param {string} randomName The nationality's name
    */
    async addNewNationality(randomName) {
        const nameValue = await common.getVariableValue(randomName, this);
        await common.clickBtnByName.call(this, 'Add');
        await self.verifyMainTitleIsDisplayed.call(this, 'Add Nationality');
        await self.typeValueToField.call(this, nameValue, 'Name');
        await common.clickBtnByName.call(this, 'Save');
        await common.verifyAlert.call(this, 'Successfully Saved');
    },

    /**
    * Select Checkbox by nationality's name
    * @author Nhu Ho
    * @param {string} keys arrString nationality's name. Exp 'name1, name2'
    */
    async selectCheckboxByKeys(keys) {
        const keyValues = await common.getVariableValue(keys, this);
        const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this, tblRecords);
        const arrKeys = keyValues.split(',').map((str) => str.trim());
        if (numberOfRecordsFound > 50) {
            const chkMultipleRecord = chkRecord.replace('$key', arrKeys[0]);
            await gotoPagNumIncludeXpath.call(this, chkMultipleRecord);
        }
        for (let i = 0; i < arrKeys.length; i++) {
            const chkMultipleRecords = chkRecord.replace('$key', arrKeys[i]);
            await keywords.waitAndScrollIntoView.call(this, chkMultipleRecords);
            await keywords.waitClick.call(this, chkMultipleRecords);
        };
    },

    /**
    * Click delete action button in table
    * @author Nhu Ho
    * @param {string} key The key nationality's name
    */
    async clickDeleteActionByKey(key) {
        const keyValue = await common.getVariableValue(key, this);
        const btnDeleteByKey = btnDeleteAction.replace('$key', keyValue);
        const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this, tblRecords);
        if (numberOfRecordsFound > 50) {
            await gotoPagNumIncludeXpath.call(this, btnDeleteByKey);
        }
        await keywords.waitAndScrollIntoView.call(this, btnDeleteByKey);
        await keywords.waitClick.call(this, btnDeleteByKey);
    },

    /**
    * Click edit action button in table
    * @author Nhu Ho
    * @param {string} key The key nationality's name
    */
    async clickUpdateActionByKey(key) {
        const keyValue = await common.getVariableValue(key, this);
        const btnUpdateByKey = btnEditAction.replace('$key', keyValue);
        const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this, tblRecords);
        if (numberOfRecordsFound > 50) {
            await gotoPagNumIncludeXpath.call(this, btnUpdateByKey);
        }
        await keywords.waitAndScrollIntoView.call(this, btnUpdateByKey);
        await keywords.waitClick.call(this, btnUpdateByKey);
    },

    /**
    *  Click selected delete and confurm to delete records
    */
    async deleteSeletedRecords() {
        await keywords.waitAndScrollIntoView.call(this, btnDeleteSelectedRecords);
        await keywords.waitClick.call(this, btnDeleteSelectedRecords);
        await keywords.waitClick.call(this, btnYes);
    },

    /**
    * verify name exists or not in table
    * @author Nhu Ho
    * @param {string} value the value is nationality's name
    * @param {boolean} isExists expect exists or not
    */
    async verifyNameExistsOrNotInTable(value, isExists) {
        const nameValue = await common.getVariableValue(value, this);
        let isActualDisplay = false;
        const txtNameByValue = txtNameRecord.replace('$value', nameValue);
        const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this, tblRecords);
        if (numberOfRecordsFound <= 50) {
            isActualDisplay = await keywords.elementIsExisted.call(this, txtNameByValue);
        } else {
            const numberPages = await keywords.countNumberOfElementsByXPath.call(this, navPaging);
            for (let index = 1; index < numberPages; index++) {
                const navNum = navNumber.replace('$index', index);
                await keywords.waitClick.call(this, navNum);
                // ensure all elements in page was shown
                await keywords.sleepFor.call(this, timeToSleep);
                isActualDisplay = await keywords.elementIsExisted.call(this, txtNameByValue);
                if (isActualDisplay) {
                    break;
                }
            }
        }
        assert.equal(isActualDisplay, isExists);
    },

    /**
    * verify dialog displays
    * @author Nhu Ho
    */
    async verifyDialogDisplay() {
        await keywords.waitUntilElementIsVisible.call(this, dialogDelete);
        await keywords.verifyElementIsDisplayed.call(this, dialogDelete);
    },

    /**
    * Verify value display in input field
    * @author Nhu Ho
    * @param {string} value The expected value.
    * @param {string} field The input field.
    */
    async verifyValueInField(value, field) {
        const expectedValue = await common.getVariableValue(value, this);
        const txt = txtByField.replace('$field', field);
        await keywords.waitUntilElementIsVisible.call(this, txt);
        const actualValue = await keywords.waitAndGetAttribute.call(this, txt, 'value');
        assert.equal(actualValue, expectedValue);
    },

    /**
    * Verify the main title is displayed.
    * @author Nhu Ho
    * @param {string} title The expected main title.
    */
    async verifyMainTitleIsDisplayed(title) {
        const mainTitle = txtMainTitle.replace('$title', title);
        await keywords.waitUntilElementIsVisible.call(this, mainTitle);
        await keywords.verifyElementIsDisplayed.call(this, mainTitle);
    },

    /**
    * Delete record by key to clean environment
    * @author Nhu Ho
    * @param {string} key The value of title name that user want to have action
    */
    async deleteRecordToCleanEnv(key) {
        await self.clickDeleteActionByKey.call(this, key);
        await self.verifyDialogDisplay.call(this);
        await keywords.waitClick.call(this, btnYes);
    },

    /**
    * Generate random string and with specific length and set to field name
    * @author Nhu Ho
    * @param {string} numberOfChar The length of random string
    * @param {string} labelName The field name. Ex: Name
    */
    async generateStringAndTypeToField(numberOfChar, labelName) {
        const value = await common.generateRandomString.call(this, Number(numberOfChar));
        await self.typeValueToField.call(this, value, labelName);
    },
};
