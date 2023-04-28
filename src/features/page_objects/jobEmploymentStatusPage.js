const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;
let numberOfRecordsFound = 0;

const txtName = `//form/div/div/div/input[contains(@class, 'oxd-input oxd-input--active')]`;
const lblFormTitle = `//h6[contains(@class, 'orangehrm-main-title')]`;

module.exports = {

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
};
