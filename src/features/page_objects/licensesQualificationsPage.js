const chai = require('chai');
const { assert } = chai;
const common = require('./common');
const keywords = require('./keywords');

let numberOfRecordsFound = 0;
const btnName = `//button[normalize-space(.)='$name']`;
const txtFieldInForm = `//label[normalize-space(.)='$labelName']/../..//input`;
const lblMainTitle = `//h6[contains(@class,'main-title')]`;
const cellRecord = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$record']`;
const popupTitle = `//p[normalize-space(.)='$title']`;
const errorMessage = `//label[normalize-space(.)='$labelName']/../..//span[contains(.,'$message')]`;
const btnDelete = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$key']/..//i[contains(@class, 'bi-trash')]`;

const self = module.exports = {
    /**
    * Set the number of records found page loaded
    */
    async getNumberOfRecords() {
        numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    },

    /**
    * Click a button by name
    * @param {string} name The name of button. Ex: Add, Search
    */
    async clickButtonByName(name) {
        const btnClickByName = btnName.replace('$name', name);
        await keywords.waitClick.call(this, btnClickByName);
    },

    /**
    * Verify main title of page
    * @param {string} expectedMainTitle The expected main title of page, Ex: Add license, licenses
    */
    async verifyMainTitle(expectedMainTitle) {
        const actualMainTitle = await keywords.waitAndGetText.call(this, lblMainTitle);
        assert.equal(actualMainTitle, expectedMainTitle);
    },

    /**
    * Type the input to the field
    * @param {string} text The value input of the corresponding text field
    * @param {string} labelName The name of label with the corresponding text field. Ex: Name
    */
    async typeTextForField(text, labelName) {
        const txtFieldByLabelName = txtFieldInForm.replace('$labelName', labelName);
        const value = await common.getVariableValue(text, this);
        await keywords.setText.call(this, txtFieldByLabelName, value);
    },

    /**
    * Verify the number of records after added
    * @param {string} number The number of records added
    */
    async verifyIncreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound + Number(number);
        assert.equal(expectedNumberOfRecordsFound, actualNumberOfRecordsFound);
    },

    /**
    * Verify the new record is displayed in table
    * @param {string} record The new record added to the table
    */
    async verifyRecordInTable(record) {
        const value = await common.getVariableValue(record, this);
        const newRecord = cellRecord.replace('$record', value);
        await keywords.verifyElementIsDisplayed.call(this, newRecord);
    },

    /**
    * Add the new record to the table
    * @param {string} record The new record added to the table
    */
    async addRecord(record) {
        await self.clickButtonByName.call(this, 'Add');
        const value = await common.getVariableValue(record, this);
        await self.typeTextForField.call(this, value, 'Name');
        await self.clickButtonByName.call(this, 'Save');
    },

    /**
    * Verify the new button is displayed
    * @param {string} name The new button name
    */
    async verifyNewButtonVisible(name) {
        const btnVisible = btnName.replace('$name', name);
        await keywords.verifyElementIsDisplayed.call(this, btnVisible);
    },

    /**
     * Verify the popup question is presented
     * @param {string} question The question in popup message
     */
    async verifyPopupQuestionPresented(question) {
        const popupQuestion = await popupTitle.replace('$title', question);
        await keywords.waitUntilElementIsVisible.call(this, popupQuestion);
        await keywords.verifyElementIsDisplayed.call(this, popupQuestion);
    },

    /**
    * Verify the number of records after deleted
    * @param {string} number The number of records deleted
    */
    async verifyDecreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound - Number(number);
        assert.equal(expectedNumberOfRecordsFound, actualNumberOfRecordsFound);
    },

    /**
    * Verify the deleted record is not in table
    * @param {string} records The deleted record from the table
    */
    async verifyRecordDeleted(records) {
        let isRecordDisplay = false;
        const arrRecords = records.split(',').map((str) => str.trim());
        arrRecords.forEach(async (record) => {
            const value = await common.getVariableValue(record, this);
            const newRecord = cellRecord.replace('$record', value);
            if (await keywords.elementIsExisted.call(this, newRecord)) {
                isRecordDisplay = true;
            }
        });
        assert.isFalse(isRecordDisplay);
    },

    /**
    * Click delete button a record by key
    * @param {string} key The key name.
    */
    async clickTrashButton(key) {
        const value = await common.getVariableValue(key, this);
        const btnDeleteByKey = btnDelete.replace('$key', value);
        await keywords.waitClick.call(this, btnDeleteByKey);
    },

    /**
     * Verify the error message is showed under label name
     * @param {string} message The error message is displayed
     * @param {string} labelName The lable name of error message
     */
    async verifyErrorMessage(message, labelName) {
        const label = errorMessage.replace('$labelName', labelName);
        const fullErrorMessage = label.replace('$message', message);
        await keywords.verifyElementIsDisplayed.call(this, fullErrorMessage);
    },
};
