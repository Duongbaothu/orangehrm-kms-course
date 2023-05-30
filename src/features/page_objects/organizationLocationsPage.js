const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const { assert } = chai;
const fs = require('fs');

const txaFieldInForm = `//label[normalize-space(.)='$textareaName']/../..//textarea`;
const txtCityInTable = `//div[@class='oxd-table-body']//div[text()='$location']/../../div[3]/div`;
const txtCountryInTable = `//div[@class='oxd-table-body']//div[text()='$location']/../../div[4]/div`;
const txtPhoneInTable = `//div[@class='oxd-table-body']//div[text()='$location']/../../div[5]/div`;
const txtNumberOfEmployeesInTable = `//div[@class='oxd-table-body']//div[text()='$location']/../../div[6]/div`;
const lblAddLocation = `//h6[normalize-space(.)='Add Location']`;
const txtFieldInForm = `//label[normalize-space(.)='$fieldName']/../..//input`;

const self = module.exports = {

    /**
     * Type text for field in form.
     * @author Trang Ngo
     * @param {string} text Content for field.
     * @param {string} fieldName The field name. Ex: Username is the field in the search form of Users (Admin).
     */
    async typeTextForField(text, fieldName) {
        const txt = txtFieldInForm.replace('$fieldName', fieldName);
        await keywords.setText.call(this, txt, await common.getVariableValue(text, this));
    },

    /**
     * Type text for textarea in form.
     * @author Trang Ngo
     * @param {string} text Content for textarea.
     * @param {string} textareaName The textarea name. Ex: Address is the textarea in the add form of Locations (Admin).
     */
    async typeTextForTextarea(text, textareaName) {
        const txa = txaFieldInForm.replace('$textareaName', textareaName);
        await keywords.setText.call(this, txa, await common.getVariableValue(text, this));
    },

    /**
     * Type rondom text with length for field in form.
     * @author Trang Ngo
     * @param {number} length The number of text. Ex: 1, 2, 3,...
     * @param {string} fieldName The field name. Ex: Username is the field in the search form of Users (Admin).
     */
    async typeRandomTextForField(length, fieldName) {
        const randomstring = await common.generateRandomString.call(this, length);
        await self.typeTextForField.call(this, randomstring, fieldName);
    },

    /**
     * Type rondom text with length for textarea in form.
     * @author Trang Ngo
     * @param {number} length The number of text. Ex: 1, 2, 3,...
     * @param {string} textareaName The textarea name. Ex: Address is the textarea in the add form of Locations (Admin).
     */
    async typeRandomTextForTextarea(length, textareaName) {
        const randomstring = await common.generateRandomString.call(this, length);
        await self.typeTextForTextarea.call(this, randomstring, textareaName);
    },

    /**
     * Verify expected value of City with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     * @param {string} expectedCity The expected value of City.
     */
    async verifyCityOfLocationIsShowingCorrectlyInTable(locationName, expectedCity) {
        const name = await common.getVariableValue(locationName, this);
        const txtCityByLocationName = txtCityInTable.replace('$location', name);
        const cityValueTable = await keywords.waitAndGetText.call(this, txtCityByLocationName);
        assert.equal(cityValueTable, await common.getVariableValue(expectedCity, this));
    },

    /**
     * Verify value of City is empty with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     */
    async verifyCityOfLocationIsEmptyInTable(locationName) {
        const name = await common.getVariableValue(locationName, this);
        const txtCityByLocationName = txtCityInTable.replace('$location', name);
        const cityValueTable = await keywords.waitAndGetAttribute.call(this, txtCityByLocationName, 'innerText');
        assert.equal(cityValueTable, '');
    },

    /**
     * Verify expected value of Country with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     * @param {string} expectedCountry The expected value of Country.
     */
    async verifyCountryOfLocationIsShowingCorrectlyInTable(locationName, expectedCountry) {
        const name = await common.getVariableValue(locationName, this);
        const txtCountryByLocationName = txtCountryInTable.replace('$location', name);
        const countryValueTable = await keywords.waitAndGetText.call(this, txtCountryByLocationName);
        assert.equal(countryValueTable, await common.getVariableValue(expectedCountry, this));
    },

    /**
     * Verify expected value of Phone with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     * @param {string} expectedPhone The expected value of Phone.
     */
    async verifyPhoneOfLocationIsShowingCorrectlyInTable(locationName, expectedPhone) {
        const name = await common.getVariableValue(locationName, this);
        const txtPhoneByLocationName = txtPhoneInTable.replace('$location', name);
        const phoneValueTable = await keywords.waitAndGetText.call(this, txtPhoneByLocationName);
        assert.equal(phoneValueTable, await common.getVariableValue(expectedPhone, this));
    },

    /**
     * Verify value of Phone is empty with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     */
    async verifyPhoneOfLocationIsEmptyInTable(locationName) {
        const name = await common.getVariableValue(locationName, this);
        const txtPhoneByLocationName = txtPhoneInTable.replace('$location', name);
        const phoneValueTable = await keywords.waitAndGetAttribute.call(this, txtPhoneByLocationName, 'innerText');
        assert.equal(phoneValueTable, '');
    },

    /**
     * Verify expected Number of Employees of Phone with location name.
     * @author Trang Ngo
     * @param {string} locationName The value of location name.
     * @param {string} expectedNumberOfEmployees The expected value of Number of Employees.
     */
    async verifyNumberEmployeesOfLocationIsShowingCorrectlyInTable(locationName, expectedNumberOfEmployees) {
        const name = await common.getVariableValue(locationName, this);
        const txtNumberOfEmployeesByLocationName = txtNumberOfEmployeesInTable.replace('$location', name);
        const numberOfEmployeesValueTable = await keywords.waitAndGetText.call(this, txtNumberOfEmployeesByLocationName);
        assert.equal(numberOfEmployeesValueTable, await common.getVariableValue(expectedNumberOfEmployees, this));
    },

    /**
     * Verify value of input in form.
     * @author Trang Ngo
     * @param {string} fieldName The field name. Ex: Username is the field in the search form of Users (Admin).
     * @param {string} expectedValue The expected value of field.
     */
    async verifyValueOfInputInForm(fieldName, expectedValue) {
        const name = await common.getVariableValue(fieldName, this);
        const inputField = txtFieldInForm.replace('$fieldName', name);
        await keywords.waitUntilElementIsVisible.call(this, inputField);
        await keywords.waitAndScrollIntoView.call(this, inputField);
        const actual = await keywords.waitAndGetAttribute.call(this, inputField, 'value');
        assert.equal(actual, await common.getVariableValue(expectedValue, this));
    },

    /**
     * Verify value of textarea in form.
     * @author Trang Ngo
     * @param {string} textareaName The textarea name. Ex: Address is the textarea in the add form of Locations (Admin).
     * @param {string} expectedValue The expected value of textarea.
     */
    async verifyValueOfTextareaInForm(textareaName, expectedValue) {
        const name = await common.getVariableValue(textareaName, this);
        const txaField = txaFieldInForm.replace('$textareaName', name);
        await keywords.waitUntilElementIsVisible.call(this, txaField);
        await keywords.waitAndScrollIntoView.call(this, txaField);
        const actual = await keywords.waitAndGetAttribute.call(this, txaField, 'value');
        assert.equal(actual, await common.getVariableValue(expectedValue, this));
    },

    /**
     * Add a locations.
     * @author Trang Ngo
     * @param {string} location List value of field in Add Location form. Ex: Name1,City1,State1,Zip1,Canada,+84012,+72312,Address1,Note1
     */
    async addALocation(location) {
        let listValue = await common.getVariableValue(location, this);
        listValue = listValue.split(',');
        await common.clickBtnByName.call(this, 'Add');
        await keywords.waitUntilElementLocated.call(this, lblAddLocation);
        await self.typeTextForField.call(this, listValue[0], 'Name');
        await self.typeTextForField.call(this, listValue[1], 'City');
        await self.typeTextForField.call(this, listValue[2], 'State/Province');
        await self.typeTextForField.call(this, listValue[3], 'Zip/Postal Code');
        await common.selectDropdownItemByValue.call(this, listValue[4], 'Country');
        await self.typeTextForField.call(this, listValue[5], 'Phone');
        await self.typeTextForField.call(this, listValue[6], 'Fax');
        await self.typeTextForTextarea.call(this, listValue[7], 'Address');
        await self.typeTextForTextarea.call(this, listValue[8], 'Notes');
        await common.clickBtnByName.call(this, 'Save');
        await common.verifyAlert.call(this, 'Successfully Saved');
    },

    /**
     * Add multiple locations with csv file.
     * @author Trang Ngo
     * @param {string} filePath Local path file.
     */
    async addMultiLocationsWithCsv(filePath) {
        const contentFile = fs.readFileSync(filePath, 'utf-8');
        const lines = contentFile.split('\n');
        const stringRandom = await common.generateRandomString.call(this, 8);
        const infoAllLocationName = [];
        for (let i = 1; i < lines.length; i++) {
            const lineValue = lines[i].replace(/"/g, '');
            let listValue = lineValue.split(',');
            infoAllLocationName.push(listValue[0] + i + stringRandom);
            listValue = listValue[0] + i + stringRandom + lineValue.replace(listValue[0], '');
            await self.addALocation.call(this, listValue);
            this.results.lastRun = infoAllLocationName;
        }
        this.attach(this.results.lastRun.toString());
    },

};
