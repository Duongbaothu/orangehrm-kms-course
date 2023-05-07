const keywords = require('./keywords');
const common = require('./common');

const btnButton = `//button[normalize-space(.)='$itemName']`;
const txtFieldInForm = `//label[normalize-space(.)='$itemName']/../..//input`;

const self = module.exports = {
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
};
