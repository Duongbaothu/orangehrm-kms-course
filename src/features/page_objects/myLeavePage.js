const { assert } = require('chai');
const common = require('./common');
const keywords = require('./keywords');

module.exports = {
    /**
    * Go to the My Leave Page
    * @author Nhu Ho
    */
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'My Leave List');
    },

    /**
* verify data row infomation
* @author Nhu Ho
@param {string} leaveType leave type
@param {string} date date
@param {string} employeeName
@param {string} status
*/
    async verifyStatusOfEmployeeLeave(leaveType, date, employeeName, status) {
        let actualStatus = '';
        const empFullName = await common.getVariableValue(employeeName, this);
        const leaveTypeData = await common.getVariableValue(leaveType, this);
        const dateData = await common.getVariableValue(date, this);
        const statusData = await common.getVariableValue(status, this);
        const rowEles = await keywords.waitUntilElementsLocated.call(this, `//div[contains(., '${empFullName}')]/ancestor::div[contains(@class,'oxd-table-row')]`);
        for (let i = 0; i < rowEles.length; i++) {
            const rowText = await rowEles[i].getAttribute('innerText');
            const arrData = rowText.split('\n');
            // column leave type and date
            if (arrData[2].localeCompare(leaveTypeData) === 0 && arrData[0] === dateData) {
                // column status
                actualStatus = arrData[5];
                return;
            }
        }
        // assert status
        assert.equal(actualStatus, statusData, 'Can not find leave to verify status');
    },
};
