/* eslint-disable max-len */
const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;

let numberOfRecordsFound = 0;
const btnButton = `//button[normalize-space(.)='$itemName']`;
const txtFieldInForm = `//label[normalize-space(.)='Name']/../..//input`;
const txtDescriptionField = `//label[normalize-space(.)='Description']/../..//textarea`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const lblRecordWithSkillNameAndDescription = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Name')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$skillName'] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Description')]/preceding-sibling::div) + 1][contains(., '$description')]]`;
const tblTable = `//div[@class='oxd-table']`;

const self = module.exports = {

    /**
  * Verify the skill name and skill  description of the record which added
  * @author Hanh Nguyen
  * @param {String} skillName the value of skill name
  * @param {String} skillDescription the value of skill description
  */
    async verifyRecordWithSkillAndDescriptionIsDisplay(skillName, skillDescription) {
        await keywords.waitUntilElementIsVisible.call(this, tblTable);
        const valueSkillName = await common.getVariableValue(skillName, this);
        const valueDescription = await common.getVariableValue(skillDescription, this);
        const lblRecordRow = lblRecordWithSkillNameAndDescription.replace('$skillName', valueSkillName).replace('$description', valueDescription);
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isTrue(result);
    },

    /**
    * Verify the skill name and skill  description of the record which deleted
    * @author Hanh Nguyen
    * @param {String} skillName the value of skill name
    * @param {String} skillDescription the value of skill description
    */
    async verifyRecordWithSkillAndDescriptionIsNotDisplay(skillName, skillDescription) {
        const valueSkillName = await common.getVariableValue(skillName, this);
        const valueDescription = await common.getVariableValue(skillDescription, this);
        const lblRecordRow = lblRecordWithSkillNameAndDescription.replace('$skillName', valueSkillName).replace('$description', valueDescription);
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isFalse(result);
    },

    /**
    * Type text in name skill field
    * @author Hanh Nguyen
    * @param {string} valueName The value needs to fill in the field
    */
    async typeNameForSkill(valueName) {
        const value = common.getVariableValue(valueName, this);
        await keywords.setText.call(this, txtFieldInForm, value);
    },

    /**
    * Type description for skill
    * @author Hanh Nguyen
    * @param {string} valueName The value needs to fill in the field
    */
    async typeDescriptionForSkill(valueName) {
        const value = common.getVariableValue(valueName, this);
        await keywords.setText.call(this, txtDescriptionField, value);
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
 * Add new skill with skill name and skill description
 * @author Hanh Nguyen
 * @param {String} skillName The value input of skill name field
 * @param {String} skillDescription The value input of skill description field
 */
    async addNewSkill(skillName, skillDescription) {
        await common.clickBtnByName.call(this, 'Add');
        await self.typeNameForSkill.call(this, skillName);
        await self.typeDescriptionForSkill.call(this, skillDescription);
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
    * Read data and add skill name and skill description from CSV file
    * @author Hanh Nguyen
    * @param {string} filePath The path of csv file.
    */
    async readDataAndAddSkillFromCSV(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        for (let i = 1; i < csvData.length; i++) {
            await self.typeNameForSkill.call(this, csvData[i]._0);
            await self.typeDescriptionForSkill.call(this, csvData[i]._1);
        }
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
  * Get number of the records found.
  * @author Hanh Nguyen
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
