const keywords = require('./keywords');
const common = require('./common');
const { assert } = require('chai');

const cldFromDate = `//div[label[contains(., 'From Date')]]/following::input`;
const cldToDate = `//div[label[contains(., 'To Date')]]/following::input`;
const txtLeaveBalance = `//p[contains(@class,'orangehrm-leave-balance-text')]`;
/**
*  verify Leave Balance
* @author Nhu Ho
* @param {string} value
*/
async function verifyLeaveBalance(value) {
    const actualValue = await keywords.waitAndGetText.call(this, txtLeaveBalance);
    assert.equal(actualValue, value);
}
module.exports = {
    /**
* Add new employee successfully
* @author Nhu Ho
* @param {string} leaveType
* @param {string} balance
* @param {string} duration
* @param {string} fromDate
* @param {string} toDate
*/
    async submitApplyLeave(leaveType, balance, duration, fromDate, toDate) {
        const leaveTypeData = await common.getVariableValue(leaveType, this);
        await common.selectDropdownItemByValue.call(this, leaveTypeData, 'Leave Type');
        await keywords.setText.call(this, cldFromDate, fromDate);
        await keywords.setText.call(this, cldToDate, toDate);
        await common.selectDropdownItemByValue.call(this, duration, 'Duration');
        await verifyLeaveBalance.call(this, balance);
        await common.clickBtnByName.call(this, 'Apply');
        await common.verifyAlert.call(this, 'Successfully Saved');
        await common.waitAlertMessageNotDisplay.call(this);
    },

    /**
* Go to the Apply Page
* @author Nhu Ho
*/
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.clickTopBarMenuItem.call(this, 'Apply');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Apply Leave');
    },
};
