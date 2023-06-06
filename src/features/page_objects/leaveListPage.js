const common = require('./common');
const keywords = require('./keywords');

const btnApprove = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)="$itemName"]/..//button[contains(@class, 'oxd-button--label-success')]`;
const btnReject = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)="$itemName"]/..//button[contains(@class, 'oxd-button--label-danger')]`;

module.exports = {
    /**
* search leave by Employee name
* @author Nhu Ho
* @param {string} employeeName
*/
    async filterByEmployeeName(employeeName) {
        const empFullName = await common.getVariableValue(employeeName, this);
        await common.selectDropdownItemByHint.call(this, empFullName, 'Employee Name', empFullName);
        await common.clickBtnByName.call(this, 'Search');
        // wait for search data display in table
        await keywords.sleepFor.call(this, 2000);
    },

    /**
* Approve leave
* @author Nhu Ho
* @param {string} leave
*/
    async approveLeave(leave) {
        const leaveData = await common.getVariableValue(leave, this);
        const btnApproveRecordRow = btnApprove.replace('$itemName', leaveData);
        await keywords.waitClick.call(this, btnApproveRecordRow);
    },

    /**
* Reject  leave
* @author Nhu Ho
* @param {string} leave
*/
    async rejectLeave(leave) {
        const leaveData = await common.getVariableValue(leave, this);
        const btnRejectRecordRow = btnReject.replace('$itemName', leaveData);
        await keywords.waitClick.call(this, btnRejectRecordRow);
    },

    /**
* verify Leave Not Display In Table
* @author Nhu Ho
* @param {string} leave
*/
    async verifyLeaveNotDisplayInTable(leave) {
        await common.verifyRecordWithTitleIsNotDisplay.call(this, leave);
    },

    /**
* Go to the Add Entitlement Page
* @author Nhu Ho
*/
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Leave List');
    },
};
