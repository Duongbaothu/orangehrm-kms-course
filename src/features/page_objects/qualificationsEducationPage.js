const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;

let numberOfRecordsFound = 0;
const btnButton = `//button[normalize-space(.)='$itemName']`;
const dlgPopUp = `//div[contains(@class,'orangehrm-dialog-popup')]//p[normalize-space(.)='$itemName']`;
const txtFieldInForm = `//label[normalize-space(.)='$itemName']/../..//input`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const chkRecord = `//div[@class='oxd-table-body']//div[text()="$itemName"]/../..//input[@type='checkbox']/..//span`;
const chkAllRecords = `//div[@class='oxd-table-header']//input[@type='checkbox']/..//span`;
const btnDeleteAction = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)="$itemName"]/..//i[contains(@class, 'bi-trash')]`;
const msgErrorMessage = `//label[contains(text(),'$fieldName')]/ancestor::div[contains(@class,'oxd-form-row')]//span[contains(@class,'error-message')]`;
const lblRecordNameWithLevelTitle = `//div[contains(@class,'oxd-table-card')]//div[text()="$itemName"]`;
const btnEditAction = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)="$key"]/..//i[contains(@class, 'bi-pencil')]`;
const txtMainTitle = `//h6[contains(@class, 'orangehrm-main-title')and(text()='$title')]`;
const tblTable = `//div[@class='oxd-table']`;

const self = module.exports = {

    /**
  * Verify record with title display
  * @author Hanh Nguyen
  * @param {String} title the value of title
  */
    async verifyRecordWithTitleDisplay(title) {
        await keywords.waitUntilElementIsVisible.call(this, tblTable);
        const valueTitle = await common.getVariableValue(title, this);
        const lblRecordRow = lblRecordNameWithLevelTitle.replace('$itemName', valueTitle);
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isTrue(result);
    },

    /**
  * Verify record with title no display
  * @author Hanh Nguyen
  * @param {String} title the value of title
  */
    async verifyRecordWithTitleIsNotDisplay(title) {
        await keywords.waitUntilElementIsVisible.call(this, tblTable);
        const valueTitle = await common.getVariableValue(title, this);
        const lblRecordRow = lblRecordNameWithLevelTitle.replace('$itemName', valueTitle);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isFalse(result);
    },

    /**
  * Verify the main title is display
  * @author Hanh Nguyen
  * @param {string} title the expected main title
  */
    async verifyMainTitleIsDisplay(title) {
        const mainTitle = txtMainTitle.replace('$title', title);
        await keywords.waitUntilElementIsVisible.call(this, mainTitle);
        await keywords.verifyElementIsDisplayed.call(this, mainTitle);
    },

    /**
  * Delete record by key to clean environment
  * @author Hanh Nguyen
  * @param {string} key The value of title name that user want to have action
  */
    async deleteRecordToCleanEnvironment(key) {
        const value = await common.getVariableValue(key, this);
        const btnDeleteByValue = btnDeleteAction.replace('$itemName', value);
        await keywords.waitClick.call(this, btnDeleteByValue);
        await self.clickButtonWithName.call(this, 'Yes, Delete');
    },

    /**
  * Click button with name
  * @author Hanh Nguyen
  * @param {string} value The name of button in page. Ex: Add, Save....
  */
    async clickButtonWithName(value) {
        const option = btnButton.replace('$itemName', value);
        await keywords.waitClick.call(this, option);
    },

    /**
    * Type text in field
    * @author Hanh Nguyen
    * @param {string} valueName The value input of the corresponding text field
    * @param {string} labelName The name of label with the corresponding text field. Ex: Level, Name, Description
    */
    async typeTextInField(valueName, labelName) {
        const txtFieldByLabelName = txtFieldInForm.replace('$itemName', labelName);
        const value = common.getVariableValue(valueName, this);
        await keywords.setText.call(this, txtFieldByLabelName, value);
    },

    /**
    * Verify button is display
    * @author Hanh Nguyen
    * @param {string} itemName The value of button in page. Ex: Delete Selected, Save, Add,...
    */
    async verifyButtonDisplay(itemName) {
        const btnButtonVerify = btnButton.replace('$itemName', itemName);
        await keywords.waitAndScrollIntoView.call(this, btnButtonVerify);
        await keywords.verifyElementIsDisplayed.call(this, btnButtonVerify);
    },

    /**
    * Verify popup with the question is display
    * @author Hanh Nguyen
    * @param {string} value The value of question in popup
    */
    async verifyPopupDisplay(value) {
        const dialogPopUp = dlgPopUp.replace('$itemName', value);
        await keywords.waitUntilElementIsVisible.call(this, dialogPopUp);
        await keywords.verifyElementIsDisplayed.call(this, dialogPopUp);
    },

    /**
    * add new Education
    * @author Hanh Nguyen
    * @param {string} valueEducation The value input of Education field
    * @param {string} levelLabel The name of label with Education field
    */
    async addNewEducation(valueEducation, levelLabel) {
        await self.clickButtonWithName.call(this, 'Add');
        await self.typeTextInField.call(this, valueEducation, levelLabel);
        await self.clickButtonWithName.call(this, 'Save');
    },

    /**
   * Verify the error message show
   * @author Hanh Nguyen
   * @param {string} expectedMessage The expected error message
   * @param {string} valueFieldName The field show error message
   */
    async verifyErrorMessage(expectedMessage, valueFieldName) {
        const msgMessage = msgErrorMessage.replace('$fieldName', valueFieldName);
        const actualMsg = await keywords.waitAndGetText.call(this, msgMessage);
        assert.equal(actualMsg, expectedMessage);
    },

    /**
    * Edit a record by key
    * @author Hanh Nguyen
    * @param {string} key The key name. Ex: the value of education in table
    */
    async clickEditEducationByKey(key) {
        const keyName = await common.getVariableValue(key, this);
        const btnEditByKey = btnEditAction.replace('$key', keyName);
        await keywords.waitClick.call(this, btnEditByKey);
    },

    /**
    * Delete a record by key
    * @author Hanh Nguyen
    * @param {string} key The key name. Ex: the value of education in table
    */
    async clickDeleteEducationByKey(key) {
        const value = await common.getVariableValue(key, this);
        const btnDeleteByValue = btnDeleteAction.replace('$itemName', value);
        await keywords.waitClick.call(this, btnDeleteByValue);
    },

    /**
    * addEducationFromCSV
    * @author Hanh Nguyen
    * @param {string} valueEducation The value input of Education field
    */
    async addEducationFromCSV(valueEducation) {
        await self.typeTextInField.call(this, valueEducation, 'Level');
        await self.clickButtonWithName.call(this, 'Save');
    },

    /**
    * Read data and add Level education from CSV file
    * @author Hanh Nguyen
    * @param {string} filePath The path of csv file.
    */
    async readDataAndAddEducationFromCSV(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        for (let i = 1; i < csvData.length; i++) {
            await self.addEducationFromCSV.call(this, csvData[i]._0);
        }
    },

    /**
  * Select checkbox by keys
  * @author Hanh Nguyen
  * @param {string} keys The list of keys name. Ex: username: ess_user1, ess_user2,... or employee id: 0001, 0002. Accept a key, keys or all for selecting all checkboxes.
  */
    async selectCheckboxByKeys(keys) {
        if (keys === 'all') {
            await keywords.waitClick.call(this, chkAllRecords);
        } else {
            const arrKeys = keys.split(',').map((str) => str.trim());
            arrKeys.forEach(async (key) => {
                const valueKey = await common.getVariableValue(key, this);
                const chkMultipleRecords = chkRecord.replace('$itemName', valueKey);
                await keywords.waitClick.call(this, chkMultipleRecords);
            });
        }
    },

    /**
  * Get number of the records found.
  * @return {number} Number of records found.
  */
    async getNumberOfRecordsFound() {
        numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    },

    /**
    * Verify the number of records after added
    * @author Hanh Nguyen
    * @param {string} number The number of records added
    */
    async verifyNumberRecordsIncreasing(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const value = parseInt(number);
        const expectedNumberOfRecordsFound = numberOfRecordsFound + value;
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
    * Verify the number of records after deleted
    * @author Hanh Nguyen
    * @param {string} number The number of records deleted
    */
    async verifyNumberRecordsDecreasing(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const value = parseInt(number);
        const expectedNumberOfRecordsFound = numberOfRecordsFound - value;
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },
};
