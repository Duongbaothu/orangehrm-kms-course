const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;

const lblCountry = `//label[normalize-space(.)='Country']/../..//div[contains(@class, 'oxd-select-text-input')]`;
const btnEdit = `//label[normalize-space(.)='Edit']//span[contains(@class, 'oxd-switch-input--active')]`;
const txtFieldInForm = `//label[normalize-space(.)='$itemName']/../..//*[self::p or self::textarea or self::input]`;

const self = module.exports = {
    /**
    * Type text in field
    * @author Hanh Nguyen
    * @param {string} valueName The value input of the corresponding text field
    * @param {string} labelName The name of label with the corresponding text field. Ex: Organization Name, Registration Number,...
    */
    async typeTextInField(valueName, labelName) {
        const txtFieldByLabelName = txtFieldInForm.replace('$itemName', labelName);
        await keywords.deleteAllText.call(this, txtFieldByLabelName);
        const value = common.getVariableValue(valueName, this);
        await keywords.setText.call(this, txtFieldByLabelName, value);
    },

    /**
    * Read data and type text from CSV file
    * @author Hanh Nguyen
    * @param {string} labelName The name of label with the corresponding text field. Ex: Organization Name, Registration Number,...
    * @param {string} filePath The path of csv file.
    */
    async readDataAndtypeTextFromCSV(labelName, filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        for (let i = 1; i < csvData.length; i++) {
            await self.typeTextInField.call(this, csvData[i]._0, labelName);
        }
    },

    /**
    * Select country
    * @author Hanh Nguyen
    * @param {string} countryName The value of country need to choose
    */
    async selectCountryByName(countryName) {
        if (countryName !== '') {
            await common.selectDropdownItemByValue.call(this, countryName, 'Country');
        } else {
            const value = await keywords.waitAndGetText.call(this, lblCountry);
            await common.selectDropdownItemByValue.call(this, value, 'Country');
        }
    },

    /**
    * Click Edit button at General Information page.
    * @author Hanh Nguyen
    * @param {string} btnEdit The function button in General Information Page: Edit
    */
    async clickEditButton() {
        await keywords.waitClick.call(this, btnEdit);
    },

    /**
    * Verify the value of field is displayed correctly
    * @author Hanh Nguyen
    * @param {string} labelName The name of label with the corresponding text field. Ex: Organization Name, Registration Number,...
    * @param {string} expectedValueField The value input of the corresponding text field
    */
    async verifyValueFieldIsDisplayCorrectly(labelName, expectedValueField) {
        await common.waitPageHeaderIsLoaded.call(this);
        const txtFieldByLabelName = txtFieldInForm.replace('$itemName', labelName);
        const actualValueField = await keywords.waitAndGetAttribute.call(this, txtFieldByLabelName, 'value');
        assert.equal(actualValueField, expectedValueField);
    },

    /**
    * Verify number of employees is displayed correctly
    * @author Hanh Nguyen
    * @param {string} labelName The name of label with the corresponding text field. Ex: Organization Name, Registration Number,...
    */
    async verifyNumberOfEmployeesIsDisplayedCorrectly(labelName) {
        await common.clickMainMenuItem.call(this, 'PIM');
        const expectedNumberOfEmployees = await common.getNumberOfRecordsFound.call(this);
        // Back to General Information Page
        await common.clickMainMenuItem.call(this, 'Admin');
        await common.selectDropdownMenuItemByText.call(this, 'Organization', 'General Information');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'General Information');
        const txtFieldByLabelName = txtFieldInForm.replace('$itemName', labelName);
        const actualNumberOfEmployees = await keywords.waitAndGetText.call(this, txtFieldByLabelName);
        assert.equal(actualNumberOfEmployees, expectedNumberOfEmployees);
    },

    /**
    * Verify country is displayed correctly
    * @author Hanh Nguyen
    * @param {string} countryName The value of country
    */
    async verifyCountryIsDisplayedCorrectly(countryName) {
        const actualCountry = await keywords.waitAndGetText.call(this, lblCountry);
        let expectedCountry = '';
        if (countryName !== '') {
            expectedCountry = countryName;
        } else {
            expectedCountry = 'Viet Nam';
        }
        assert.equal(actualCountry, expectedCountry);
    },
};
