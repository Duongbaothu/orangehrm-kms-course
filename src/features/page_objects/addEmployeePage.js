const keywords = require('./keywords');
const common = require('./common');
const { employeeInfo } = require('./../data/e2e/data');
const { MAFSave } = require('@ln-maf/core');
const txtFirstName = `//input[@name='firstName']`;
const txtMiddleName = `//input[@name='middleName']`;
const txtLastName = `//input[@name='lastName']`;
const txtEmployeeId = `//div[label[contains(., 'Employee Id')]]/following::input[contains(@class, 'oxd-input')]`;
const chkCreateLogin = `//div[@class='oxd-switch-wrapper']//label`;
const txtUsername = `//div[label[contains(., 'Username')]]/following::input`;
const txtPassword = `//div[label[contains(., 'Password')]]/following::input`;
const txtConfirmPassword = `//div[label[contains(., 'Confirm Password')]]/following::input`;

/**
* Type value into the inout field
* @author Nhu Ho
* @param {string} value The value type
* @param {string} inputField The input field
*/
async function typeValueToInputField(value, inputField) {
    const valueInput = await common.getVariableValue(value, this);
    await keywords.waitUntilElementLocated.call(this, inputField);
    await keywords.setText.call(this, inputField, valueInput);
}

/**
* Click checkbox
* @author Nhu Ho
*/
async function clickCreateLoginCheckbox() {
    await keywords.waitClick.call(this, chkCreateLogin);
}

/**
 * Set a local variable into global variable
 * @param {string} varName The name of variable
 * @param {string} value The variable value
 * @param {string} scenario The object to be used as the current object
 */
function setVariableToGlobal(varName, value, scenario) {
    MAFSave.call(scenario, varName, value);
}

module.exports = {
    /**
* Add new employee successfully
* @author Nhu Ho
* @param {string} empID The employee's ID
* @param {string} empName The employee's name
* @param {string} empAcc The employee's account

*/
    async addNewEmployee(empID, empName, empAcc) {
        const username = 'ess' + Date.now();
        const password = 'Ess@123@' + Math.floor(Math.random() * 9999);
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Add Employee');
        await typeValueToInputField.call(this, employeeInfo.firstName, txtFirstName);
        await typeValueToInputField.call(this, employeeInfo.middleName, txtMiddleName);
        await typeValueToInputField.call(this, employeeInfo.lastName, txtLastName);
        await typeValueToInputField.call(this, employeeInfo.employeeID, txtEmployeeId);

        await clickCreateLoginCheckbox.call(this);
        await typeValueToInputField.call(this, username, txtUsername);
        await typeValueToInputField.call(this, password, txtPassword);
        await typeValueToInputField.call(this, password, txtConfirmPassword);
        await common.clickBtnByName.call(this, 'Save');
        await common.verifyAlert.call(this, 'Successfully Saved');
        await common.waitAlertMessageNotDisplay.call(this);
        const empFullName = employeeInfo.firstName + ' ' + employeeInfo.middleName + ' ' + employeeInfo.lastName;
        setVariableToGlobal(empName, empFullName, this);
        setVariableToGlobal(empID, employeeInfo.employeeID, this);
        setVariableToGlobal(empAcc, { username, password }, this);
    },

    /**
* Go to the Add Employee Page
* @author Nhu Ho
*/
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'PIM');
        await common.clickTopBarMenuItem.call(this, 'Add Employee');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Add Employee');
    },
};
