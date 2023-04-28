const chai = require('chai');
const { assert } = chai;
const common = require('./common');
const keywords = require('./keywords');

let numberOfRecordsFound = 0;
const btnName = `//button[normalize-space(.)='$name']`;
const txtFieldInForm = `//label[normalize-space(.)='$labelName']/../..//input`;
const cellRecord = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$record']`;

const self = module.exports = {
    /**
    * Set the number of records found page loaded
    * @author Lan Tran
    */
    async getNumberOfRecords() {
        numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    },

    /**
    * Type the input to the field
    * @author Lan Tran
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
    * @author Lan Tran
    * @param {string} number The number of records added
    */
    async verifyIncreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound + Number(number);
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
    * Verify the new record is displayed in table
    * @author Lan Tran
    * @param {string} record The new record added to the table
    */
    async verifyRecordInTable(record) {
        const value = await common.getVariableValue(record, this);
        const newRecord = cellRecord.replace('$record', value);
        await keywords.verifyElementIsDisplayed.call(this, newRecord);
    },

    /**
    * Add the new record to the table
    * @author Lan Tran
    * @param {string} record The new record added to the table
    */
    async addRecord(record) {
        await common.clickBtnByName.call(this, 'Add');
        const value = await common.getVariableValue(record, this);
        await self.typeTextForField.call(this, value, 'Name');
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
    * Verify the new button is displayed
    * @author Lan Tran
    * @param {string} name The new button name
    */
    async verifyNewButtonVisible(name) {
        const btnVisible = btnName.replace('$name', name);
        await keywords.verifyElementIsDisplayed.call(this, btnVisible);
    },

    /**
    * Verify the number of records after deleted
    * @author Lan Tran
    * @param {string} number The number of records deleted
    */
    async verifyDecreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound - Number(number);
        assert.equal(actualNumberOfRecordsFound, expectedNumberOfRecordsFound);
    },

    /**
    * Verify the deleted record is not in table
    * @author Lan Tran
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
};
