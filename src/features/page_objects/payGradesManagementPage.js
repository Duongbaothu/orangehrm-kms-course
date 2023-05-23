/* eslint-disable max-len */
const keywords = require('./keywords');
const common = require('./common');
const { TIMEOUT_SHORT } = require('../support/config');
const chai = require('chai');
const { assert } = chai;

const btnFunctionBySectionAndName = `//h6[contains(@class, 'orangehrm-main-title') and normalize-space(.) = '$section']/following-sibling::form//button[normalize-space(.) = '$buttonName']`;
const txtPayGradeName = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Name']]//input`;
const txtSalary = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = '$salary']]//input`;
const lblRecordRowByName = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Name')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$name']]`;
const lblRecordRowByNameAndCurrency = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Name')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$name'] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Currency')]/preceding-sibling::div) + 1][contains(., '$currency')]]`;
const lblRecordRowByCurrencyMinimumAndMaximum = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Currency')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$currency'] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Minimum Salary')]/preceding-sibling::div) + 1][contains(., '$minimum')] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Maximum Salary')]/preceding-sibling::div) + 1][contains(., '$maximum')]]`;
const btnTrashIconOfName = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Name')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$name']]//i[contains(@class, 'bi-trash')]`;
const btnTrashIconOfCurrency = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Currency')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$currency']]//i[contains(@class, 'bi-trash')]`;
const lblFormLoader = `//div[contains(@class,'oxd-loading-spinner-container')]`;

const self = module.exports = {

    /**
    * Add the new Pay Grade record
    * @author Tuyen Nguyen
    * @param {string} name The Pay Grade name
    */
    async addPayGradeRecord(name) {
        const value = await common.getVariableValue(name, this);
        await keywords.waitForPageIsLoaded.call(this, lblFormLoader);
        await common.clickBtnByName.call(this, 'Add');
        await self.typePayGradeName.call(this, value);
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
    * Add the new Currency with the empty minimum and maximum salary
    * @author Tuyen Nguyen
    * @param {string} currency The Currency value
    */
    async addACurrency(currency) {
        await common.clickBtnByName.call(this, 'Add');
        await common.selectDropdownItemByValue.call(this, currency, 'Currency');
        await self.clickFunctionButtonOnSection.call(this, 'Save', 'Add Currency');
    },

    /**
    * Click function button by name and section.
    * @author Tuyen Nguyen
    * @param {string} buttonName The function button in Admin Page: Add, Edit, No Cancel, Yes Delete,...
    * @param {string} section The sectio name in page (title): Edit Pay Grade, Add Currency,...
    */
    async clickFunctionButtonOnSection(buttonName, section) {
        const btnFunction = btnFunctionBySectionAndName.replace('$buttonName', buttonName).replace('$section', section);
        await keywords.waitAndScrollIntoView.call(this, btnFunction, TIMEOUT_SHORT);
        await keywords.waitClick.call(this, btnFunction);
    },

    /**
    * Enter the pay grade name into the textbox
    * @author Tuyen Nguyen
    * @param {string} name The pay grade name
    */
    async typePayGradeName(name) {
        const value = await common.getVariableValue(name, this);
        await keywords.setText.call(this, txtPayGradeName, value);
    },

    /**
    * Enter the  salary
    * @author Tuyen Nguyen
    * @param {string} salary The value of salary
    * @param {string} fieldName the file name: Minimum Salary, Maximum Salary.
    */
    async typeSalary(salary, fieldName) {
        const txtSalaryField = txtSalary.replace('$salary', fieldName);
        await keywords.waitUntilElementIsVisible.call(this, txtSalaryField);
        const value = await common.getVariableValue(salary, this);
        await keywords.setText.call(this, txtSalaryField, value);
    },

    /**
    * verify the pay grade name and curency record exsisting
    * @author Tuyen Nguyen
    * @param {string} name The par grade name
    * @param {string} currency The currency value
    */
    async verifyRecordWithNameAndCurrencyDisplayed(name, currency) {
        await keywords.waitForPageIsLoaded.call(this, lblFormLoader);
        const value = await common.getVariableValue(name, this);
        const lblRecordRow = lblRecordRowByNameAndCurrency.replace('$name', value).replace('$currency', currency);
        await keywords.verifyElementIsDisplayed.call(this, lblRecordRow);
    },

    /**
    * verify the currency, minimum and maximum salary of the record which added
    * @author Tuyen Nguyen
    * @param {string} currency The currency value
    * @param {string} minimum The minimum salary
    * @param {string} maximum The maximum salary
   */
    async verifyRecordWithCurrencyAndSalaryDisplayed(currency, minimum, maximum) {
        await keywords.waitForPageIsLoaded.call(this, lblFormLoader);
        const lblRecordRow = lblRecordRowByCurrencyMinimumAndMaximum.replace('$currency', currency).replace('$minimum', minimum).replace('$maximum', maximum);
        await keywords.verifyElementIsDisplayed.call(this, lblRecordRow);
    },

    /**
    * verify the currency is remove
    * @author Tuyen Nguyen
    * @param {string} currency The currency value
   */
    async verifyRecordWithCurrencyIsNotDisplay(currency) {
        const lblRecordRow = lblRecordRowByCurrencyMinimumAndMaximum.replace('$currency', currency).replace('$minimum', 0.00).replace('$maximum', 0.00);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isFalse(result);
    },

    /**
    * click on the trash icon of a pay grade
    * @author Tuyen Nguyen
    * @param {string} name The pay grade name
    */
    async clickTrashIconOfName(name) {
        const value = await common.getVariableValue(name, this);
        const btnTrashIcon = btnTrashIconOfName.replace('$name', value);
        await keywords.waitClick.call(this, btnTrashIcon);
    },

    /**
    * click on the trash icon of a currency
    * @author Tuyen Nguyen
    * @param {string} currency The currency value
    */
    async clickTrashIconOfCurrency(currency) {
        const btnTrashIcon = btnTrashIconOfCurrency.replace('$currency', currency);
        await keywords.waitClick.call(this, btnTrashIcon);
    },

    /**
    * verify the pay grade record is removed from system
    * @author Tuyen Nguyen
    * @param {string} name The pay grade name
    */
    async verifyPayGradeRecordWithNameNotDisplayed(name) {
        const value = await common.getVariableValue(name, this);
        const lblRecordRow = lblRecordRowByName.replace('$name', value);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isFalse(result);
    },

    /**
    * generate the random character with the specific length and input to the field
    * @author Tuyen Nguyen
    * @param {number} numOfChar The length of character
    */
    async generateCharAndTypeToPayGradeName(numOfChar) {
        const randomString = await common.generateRandomString.call(this, numOfChar);
        await keywords.setText.call(this, txtPayGradeName, randomString);
    },
};
