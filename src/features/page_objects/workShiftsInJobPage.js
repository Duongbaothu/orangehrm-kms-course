/* eslint-disable max-len */
const keywords = require('./keywords');
const common = require('./common');

const txtFieldName = `//div/label[normalize-space(text())='$fieldName']/../..//input`;
const txtDurationPerDay = `//label[normalize-space(.)='Duration Per Day']/../..//p[text()='$durationPerDay']`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const lblRecordRowByJobWorkShifts = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Name')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$name'] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'From')]/preceding-sibling::div) + 1][contains(., '$from')] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'To')]/preceding-sibling::div) + 1][contains(., '$to')] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Hours Per Day')]/preceding-sibling::div) + 1][contains(., '$hoursPerDay')]]`;

module.exports = {
    /**
     * Insert value for shift of Add Work Shifts form in Job page
     * @author Nguyet Duong
     * @param {string} text Content for field.
     * @param {string} fieldName The field name of a record Work Shifts.
     */
    async typeTxtForFieldsName(text, fieldName) {
        const txtValue = txtFieldName.replace('$fieldName', fieldName);
        const value = await common.getVariableValue(text, this);
        await keywords.setText.call(this, txtValue, value);
    },

    /**
     * Add a new work shift with Name
     * @author Nguyet Duong
     * @param {string} shiftName The Shift Name of a record Work Shifts
     */
    async addNewWorkShiftWithName(shiftName) {
        await common.clickBtnByName.call(this, 'Add');
        const txtValue = txtFieldName.replace('$fieldName', 'Shift Name');
        const value = await common.getVariableValue(shiftName, this);
        await keywords.setText.call(this, txtValue, value);
        await common.clickBtnByName.call(this, 'Save');
    },

    /**
     * Verify the duration per day is displayed.
     * @author Nguyet Duong
     * @param {string} durationPerDay The durationPerDay in Work Shifts Job page
     */
    async verifyDurationPerDayIsDisplayed(durationPerDay) {
        const value = await common.getVariableValue(durationPerDay, this);
        const item = txtDurationPerDay.replace('$durationPerDay', value);
        await keywords.verifyElementIsDisplayed.call(this, item);
    },

    /**
    * verify the Work Shifts records with name, from time, to time, and hours per day of the record which added
    * @author Nguyet Duong
    * @param {string} name The name of a record Work Shifts
    * @param {string} from The from of a record Work Shifts
    * @param {string} to The to of a record Work Shifts
    * @param {string} hoursPerDay The hoursPerDay of a record Work Shifts
    */
    async verifyRecordWorkShiftIsDisplayed(name, from, to, hoursPerDay) {
        const valueName = await common.getVariableValue(name, this);
        const valueFrom = await common.getVariableValue(from, this);
        const valueTo = await common.getVariableValue(to, this);
        const valueHoursPerDay = await common.getVariableValue(hoursPerDay, this);
        const lblRecordRow = lblRecordRowByJobWorkShifts.replace('$name', valueName).replace('$from', valueFrom).replace('$to', valueTo).replace('$hoursPerDay', valueHoursPerDay);
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        const result = await keywords.elementIsExisted.call(this, lblRecordRow);
        assert.isTrue(result);
    },
};
