const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const { assert } = chai;
const fs = require('fs');

const txtFieldInForm = `//label[normalize-space(.)='$fieldName']/../..//input`;
const lblInfoItemTable = `(//div[contains(@class,'table-cell')][2]//div[contains(text(),'$userName')]/../../div)[$number]`;
const chkChangePass = `//div[contains(@class,'checkbox')]//span`;
const lblAddUser = `//h6[normalize-space(.)='Add User']`;
const alrtMessage = `//div[contains(@class, 'oxd-toast-content')]`;
const txtUserRoleInTable = `//div[@class='oxd-table-body']//div[text()='$username']/../../div[3]/div`;
const txtEmployeeNameInTable = `//div[@class='oxd-table-body']//div[text()='$username']/../../div[4]/div`;
const txtStatusInTable = `//div[@class='oxd-table-body']//div[text()='$username']/../../div[5]/div`;

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
     * Delete all text for field in form.
     * @author Trang Ngo
     * @param {string} fieldName The field name. Ex: Username is the field in the search form of Users (Admin).
     */
    async deleteTextForField(fieldName) {
        const txt = txtFieldInForm.replace('$fieldName', fieldName);
        await keywords.deleteAllText.call(this, txt);
    },

    /**
     * Add multi item with csv file.
     * @author Trang Ngo
     * @param {string} filePath Local path file.
     */
    async addMultiUsersWithCsv(filePath) {
        const contentFile = fs.readFileSync(filePath, 'utf-8');
        const lines = contentFile.split('\n');
        const lineFields = lines[0].split(',');
        const stringRandom = await common.generateRandomString.call(this, 8);
        const infoAllUsername = [];
        for (let i = 1; i < lines.length; i++) {
            const lineValue = lines[i].split(',');
            await common.clickBtnByName.call(this, 'Add');
            await keywords.waitUntilElementLocated.call(this, lblAddUser);
            await common.selectDropdownItemByValue.call(this, lineValue[0].replace(/"/g, ''), lineFields[0].replace(/"/g, ''));
            await common.selectDropdownItemByHint.call(this, lineValue[1].replace(/"/g, ''), lineFields[1].replace(/"/g, ''), lineValue[1].replace(/"/g, ''));
            await common.selectDropdownItemByValue.call(this, lineValue[2].replace(/"/g, ''), lineFields[2].replace(/"/g, ''));
            await self.typeTextForField.call(this, lineValue[3].replace(/"/g, '') + `${stringRandom}`, lineFields[3].replace(/"/g, ''));
            await self.typeTextForField.call(this, `${stringRandom}a!A1`, 'Password');
            await self.typeTextForField.call(this, `${stringRandom}a!A1`, 'Confirm Password');
            await common.clickBtnByName.call(this, 'Save');
            await keywords.waitUntilElementIsVisible.call(this, alrtMessage);
            await common.verifyAlert.call(this, 'Successfully Saved');
            infoAllUsername.push(lineValue[3].replace(/"/g, '') + `${stringRandom}`);
            this.results.lastRun = infoAllUsername;
        }
        this.attach(this.results.lastRun.toString());
    },

    /**
     * Get info user with username.
     * @author Trang Ngo
     * @param {string} username The value of username in table.
    */
    async getInfoUserWithUsername(username) {
        const lblInfoItemUserName = lblInfoItemTable.replace('$userName', await common.getVariableValue(username, this));
        const lblInfoOfUsername = lblInfoItemUserName.replace('$number', '2');
        await keywords.waitAndScrollIntoView.call(this, lblInfoOfUsername);
        if (keywords.waitUntilElementIsVisible.call(this, lblInfoOfUsername)) {
            const info = [];
            for (let i = 2; i < 6; i += 1) {
                const lblInfoAccordingToColumn = lblInfoItemUserName.replace('$number', i.toString());
                const value = await keywords.waitAndGetText.call(this, lblInfoAccordingToColumn);
                info.push(value);
                this.results.lastRun = info;
            }
            this.attach(this.results.lastRun.toString());
        }
    },

    /**
     * Click check box for change Password.
     * @author Trang Ngo
     */
    async clickCheckboxForChangePass() {
        await keywords.waitUntilElementIsVisible.call(this, chkChangePass);
        await keywords.waitClick.call(this, chkChangePass);
    },

    /**
     * Verify expected value of User role with Username.
     * @author Nam Hoang
     * @param {string} user The value of username
     * @param {string} expectedUserRole The expected value of User role
     */
    async verifyUserRoleOfUserIsShowingCorrectlyInTable(user, expectedUserRole) {
        const username = await common.getVariableValue(user, this);
        const txtUserRoleByUser = txtUserRoleInTable.replace('$username', username);
        const userRoleInTable = await keywords.waitAndGetText.call(this, txtUserRoleByUser);
        assert.equal(userRoleInTable, expectedUserRole);
    },

    /**
     * Verify expected value of Employee name with Username.
     * @author Nam Hoang
     * @param {string} user The value of username
     * @param {string} expectedEmployeeName The expected value of Employee name
     */
    async verifyEmployeeNameOfUserIsShowingCorrectlyInTable(user, expectedEmployeeName) {
        const username = await common.getVariableValue(user, this);
        const txtEmployeeNameByUser = txtEmployeeNameInTable.replace('$username', username);
        const employeeNameInTable = await keywords.waitAndGetText.call(this, txtEmployeeNameByUser);
        assert.equal(employeeNameInTable, expectedEmployeeName);
    },

    /**
     * Verify expected value of Status with Username.
     * @author Nam Hoang
     * @param {string} user The value of username
     * @param {string} expectedStatus The expected value of Status
     */
    async verifyStatusOfUserIsShowingCorrectlyInTable(user, expectedStatus) {
        const username = await common.getVariableValue(user, this);
        const txtStatusByUser = txtStatusInTable.replace('$username', username);
        const statusInTable = await keywords.waitAndGetText.call(this, txtStatusByUser);
        assert.equal(statusInTable, expectedStatus);
    },

};
