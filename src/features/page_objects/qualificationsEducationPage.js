const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;

let numberOfRecordsFound = 0;
const btnButton = `//button[normalize-space(.)='$itemName']`;
const txtFieldInForm = `//label[normalize-space(.)='$itemName']/../..//input`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const lblRecordNameWithLevelTitle = `//div[contains(@class,'oxd-table-card')]//div[text()="$itemName"]`;
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
    * Verify the Verify the main title 'Edit License' is displayeddisplay
    * @author Hanh Nguyen
    * @param {string} title the expected main title
    */
    async verifyMainTitleIsDisplay(title) {
        const mainTitle = txtMainTitle.replace('$title', title);
        await keywords.waitUntilElementIsVisible.call(this, mainTitle);
        await keywords.verifyElementIsDisplayed.call(this, mainTitle);
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
    * add new Education
    * @author Hanh Nguyen
    * @param {string} valueEducation The value input of Education field
    * @param {string} levelLabel The name of label with Education field
    */
    async addNewEducation(valueEducation, levelLabel) {
        await common.clickBtnByName.call(this, 'Add');
        await self.typeTextInField.call(this, valueEducation, levelLabel);
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
    * Add Level education from CSV file
    * @author Hanh Nguyen
    * @param {string} valueEducation The value input of Education field
    */
    async addEducationFromCSV(valueEducation) {
        await self.typeTextInField.call(this, valueEducation, 'Level');
        await common.clickBtnByName.call(this, 'Save');
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
