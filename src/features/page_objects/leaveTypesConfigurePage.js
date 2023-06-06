const keywords = require('./keywords');
const common = require('./common');

const txtName = `//div[label[contains(., 'Name')]]/following::input[contains(@class, 'oxd-input')]`;

/**
* Type value into the inout field
* @author Nhu Ho
* @param {string} value The value type
* @param {string} inputField The input field
*/
async function typeValueToInputField(value, inputField) {
    const valueInput = await common.getVariableValue(value, this);
    await keywords.setText.call(this, inputField, valueInput);
}

module.exports = {
    /**
* Add new employee successfully
* @author Nhu Ho
* @param {string} name The leave type's name
*/
    async addNewLeaveType(name) {
        const nameValue = await common.getVariableValue(name, this);
        await common.clickBtnByName.call(this, 'Add');
        await typeValueToInputField.call(this, nameValue, txtName);
        await common.clickBtnByName.call(this, 'Save');
        await common.verifyAlert.call(this, 'Successfully Saved');
        await common.waitAlertMessageNotDisplay.call(this);
    },

    /**
   * Go to the leave type Page
   * @author Nhu Ho
   */
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.selectDropdownMenuItemByText.call(this, 'Configure', 'Leave Types');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Leave Types');
    },
};
