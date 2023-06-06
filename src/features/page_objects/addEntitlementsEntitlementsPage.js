const keywords = require('./keywords');
const common = require('./common');
const { assert } = require('chai');

const txtEntitlement = `//div[label[contains(., 'Entitlement')]]/following::input`;
const dlgConfirmUpdate = `//div[contains(@class,'oxd-dialog-sheet')]`;
const dlgCardTitle = `//p[contains(@class, 'oxd-text--card-title')]`;
const dlgCardBody = `//p[contains(@class, 'oxd-text--card-body')]`;

/**
* Type value into the input field
* @author Nhu Ho
* @param {string} value The value type
* @param {string} inputField The input field
*/
async function typeValueToInputField(value, inputField) {
    const valueInput = await common.getVariableValue(value, this);
    await keywords.setText.call(this, inputField, valueInput);
}

/**
* verify Card title
* @author Nhu Ho
* @param {string} title The title of confirm dialog
*/
async function verifyCardTiltle(title) {
    const titleValue = await keywords.waitAndGetText.call(this, dlgCardTitle);
    assert(titleValue, title);
}

/**
* verify CardBody content
* @author Nhu Ho
* @param {string} content The content of confirm dialog
*/
async function verifyCardBody(content) {
    const bodyValue = await keywords.waitAndGetText.call(this, dlgCardBody);
    assert(bodyValue, content);
}

module.exports = {
    /**
* Add new employee successfully
* @author Nhu Ho
* @param {string} employeeName
* @param {string} leaveType
* @param {string} entitlement
*/
    async addEntilement(employeeName, leaveType, entitlement) {
        const empFullName = await common.getVariableValue(employeeName, this);
        const leaveTypeData = await common.getVariableValue(leaveType, this);
        await common.selectDropdownItemByHint.call(this, empFullName, 'Employee Name', empFullName);
        await common.selectDropdownItemByValue.call(this, leaveTypeData, 'Leave Type');
        const number = parseInt(entitlement);
        await typeValueToInputField.call(this, number, txtEntitlement);
        await common.clickBtnByName.call(this, 'Save');
        await keywords.waitUntilElementIsVisible.call(this, dlgConfirmUpdate);
        await verifyCardTiltle.call(this, 'Updating Entitlement');
        await verifyCardBody.call(this, `Existing Entitlement value 0.00 will be updated to ${entitlement}`);
        await common.clickBtnByName.call(this, 'Confirm');
        await common.verifyAlert.call(this, 'Successfully Saved');
        await common.waitAlertMessageNotDisplay.call(this);
    },

    /**
* Go to the Add Entitlement Page
* @author Nhu Ho
*/
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.selectDropdownMenuItemByText.call(this, 'Entitlements', 'Add Entitlements');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Add Leave Entitlement');
    },
};
