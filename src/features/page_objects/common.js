require('@ln-maf/validations');
require('@ln-maf/core/parameter_types');
const { filltemplate } = require('@ln-maf/core');
const chai = require('chai');
const keywords = require('./keywords');
const config = require('../support/config');
const { assert } = chai;
const fs = require('fs');
const parse = require('csv-parser');

const spnLoadingSpinner = `//div[@class='loading-spinner']`;
const txtUsername = `//input[@name='username']`;
const txtPassword = `//input[@name='password']`;
const btnLogin = `//button[contains(@type,'submit')]`;
const lblModulePageHeader = `//h6[contains(@class,'module')]`;
const lblLevelPageHeader = `//h6[contains(@class,'level')]`;
const itemMainMenu = `//ul[@class="oxd-main-menu"]//li//span[text()='$itemName']`;
const ddoTopbarMenu = `//div[contains(@class,'topbar-body')]//span[normalize-space(text())='$dropdownName']//i`;
const ddlTopbarMenu = `//div[contains(@class,'topbar-body')]//span[normalize-space(text())='$dropdownName']/../ul[contains(@class,'dropdown-menu')]`;
const ddlTopbarMenuItem = `//a[normalize-space(text())='$itemName']`;
const ddoInForm = `//div[contains(@class, 'oxd-grid-item') and .//label[normalize-space(text())='$dropdownName']]//i[contains(@class, 'oxd-select-text--arrow')]`;
const ddlInForm = `//div[contains(@class, 'oxd-grid-item') and .//label[normalize-space(text())='$dropdownName']]//div[@role='listbox']`;
const ddlOptionInForm = `//div[contains(@class, 'oxd-grid-item') and .//label[normalize-space(text())='$dropdownName']]//div[@role='listbox']//div[normalize-space(.)='$option']`;
const txtFieldInForm = `//label[normalize-space(.)='$labelName']/../..//input`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const tblRecords = `//div[@role='rowgroup']//div[@class='oxd-table-card']`;
const btnDelete = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$key']/..//i[contains(@class, 'bi-trash')]`;
const btnEdit = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)='$key']/..//i[contains(@class, 'bi-pencil')]`;
const btnYes = `//button[normalize-space(.)='Yes, Delete']`;
const alrtMessage = `//div[contains(@class, 'oxd-toast-content')]`;
const chkRecord = `//div[@class='oxd-table-body']//div[text()='$key']/../..//input[@type='checkbox']/..//span`;
const chkAllRecords = `//div[@class='oxd-table-header']//input[@type='checkbox']/..//span`;
const btnDeleteSelectedRecords = `//button[normalize-space(.)='Delete Selected']`;
const navPaging = `//nav[@aria-label='Pagination Navigation']/ul/li`;
const btnUpload = `//input[@class='oxd-file-input']`;

const self = module.exports = {
    /**
    * Navigate to the OrangeHRM page
    * @author Nam Hoang
    */
    async navigateToOrangeHRMPage() {
        await this.driver.get(config.BASE_URL);
    },

    /**
    * Login to system using username and password
    * @author Nam Hoang
    */
    async loginByAdminRole() {
        await keywords.setText.call(this, txtUsername, config.ADMIN_USERNAME);
        await keywords.setText.call(this, txtPassword, config.ADMIN_PASSWORD);
        await keywords.waitClick.call(this, btnLogin);
    },

    /**
    * Verify the page title.
    * @author Nam Hoang
    * @param {string} title The page title.
    */
    async verifyPageTitle(title) {
        await keywords.waitUntilTitleIs.call(this, title);
        const actualTitle = await this.driver.getTitle();
        assert.equal(actualTitle, title);
    },

    /**
    * Verify the page URL.
    * @author Nam Hoang
    * @param {string} path The path URL.
    */
    async verifyPageURL(path) {
        const actualURL = await this.driver.getCurrentUrl();
        const expectedURL = config.BASE_URL + path;
        assert.equal(actualURL, expectedURL);
    },

    /**
    * Wait for the page is loaded.
    * @author Nam Hoang
    */
    async waitLoading() {
        await keywords.waitForPageIsLoaded.call(this, spnLoadingSpinner);
    },

    /**
    * Click item in main menu.
    * @author Nam Hoang
    * @param {string} itemName The item in Main Menu: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Buzz
    */
    async clickMainMenuItem(itemName) {
        const option = itemMainMenu.replace('$itemName', itemName);
        await keywords.waitClick.call(this, option);
    },

    /**
      * Click item in topbar menu
      * @author Nam Hoang
      * @param {string} itemName The name of item in topbar menu. Ex:  Nationalities, Corporate Branding in Admin or Employee List, Reports in PIM
      */
    async clickTopBarMenuItem(itemName) {
        const tabItemName = ddlTopbarMenuItem.replace('$itemName', itemName);
        await keywords.waitClick.call(this, tabItemName);
    },

    /**
    * Select dropdown and choose dropdown item in topbar menu
    * @author Nam Hoang
    * @param {string} dropdownName The name of dropdown. Ex: User Management, Job, Organization, Qualifications, Configuration in Admin or Configuration in PIM
    * @param {string} itemName The name of item in dropdown. Ex: Users is a subitem in User Management dropdown
    */
    async selectDropdownMenuItemByText(dropdownName, itemName) {
        const tabName = ddoTopbarMenu.replace('$dropdownName', dropdownName);
        await keywords.waitClick.call(this, tabName);
        const ddlTabName = ddlTopbarMenu.replace('$dropdownName', dropdownName);
        if (keywords.waitUntilElementIsVisible.call(this, ddlTabName)) {
            const tabItemName = ddlTopbarMenuItem.replace('$itemName', itemName);
            await keywords.waitClick.call(this, tabItemName);
        }
    },

    /**
    * Wait and verify the module of page header.
    * @author Nam Hoang
    * @param {string} expectedModuleHeaderTitle The page module: Admin, PIM, Leave,...
    */
    async verifyModulePageHeaderTitle(expectedModuleHeaderTitle) {
        const actualModuleHeaderTitle = await keywords.waitAndGetText.call(this, lblModulePageHeader);
        assert.equal(actualModuleHeaderTitle, expectedModuleHeaderTitle);
    },

    /**
    * Wait and verify the level of page header.
    * @author Nam Hoang
    * @param {string} expectedLevelHeaderTitle The page level. Ex: Job level belongs to Admin module
    */
    async verifyLevelPageHeaderTitle(expectedLevelHeaderTitle) {
        const actualLevelHeaderTitle = await keywords.waitAndGetText.call(this, lblLevelPageHeader);
        assert.equal(actualLevelHeaderTitle, expectedLevelHeaderTitle);
    },

    /**
    * Select dropdown and choose dropdown item in topbar menu
    * @author Nam Hoang
    * @param {string} optionValue The name of option in dropdown. Ex: Admin and ESS are options in User Role dropdown
    * @param {string} dropdownName The name of dropdown. Ex: User Role, Status dropdown in User Management
    */
    async selectDropdownItemByValue(optionValue, dropdownName) {
        const ddoName = ddoInForm.replace('$dropdownName', dropdownName);
        await keywords.waitClick.call(this, ddoName);
        const ddlItemName = ddlInForm.replace('$dropdownName', dropdownName);
        if (keywords.waitUntilElementIsVisible.call(this, ddlItemName)) {
            const optionName = ddlOptionInForm.replace('$dropdownName', dropdownName).replace('$option', optionValue);
            await keywords.waitClick.call(this, optionName);
        }
    },

    /**
    * Type a hint to search and then select option in the dropdown list
    * @author Nam Hoang
    * @param {string} hint The hint value for searching
    * @param {string} labelName The name of label with the corresponding hint field. Ex: Employee Name in Search System User or Employee Name, Employee Id, Supervisor Name in Search Employee Information
    * @param {string} optionValue The name of option in dropdown with the corresponding hint. Ex: Boss A and Boss B are options for the hint is Boss
    */
    async selectDropdownItemByHint(hint, labelName, optionValue) {
        const txtFieldByLabelName = txtFieldInForm.replace('$labelName', labelName);
        await keywords.setText.call(this, txtFieldByLabelName, hint);
        const ddlItemName = ddlInForm.replace('$dropdownName', labelName);
        if (keywords.waitUntilElementIsVisible.call(this, ddlItemName)) {
            const optionName = ddlOptionInForm.replace('$dropdownName', labelName).replace('$option', optionValue);
            await keywords.waitClick.call(this, optionName);
        }
    },

    /**
    * Get number of the records found.
    * @author Nam Hoang
    * @return {number} Number of records found.
    */
    async getNumberOfRecordsFound() {
        await self.waitLoading.call(this);
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        const fullText = await keywords.waitAndGetText.call(this, lblRecordsFound);
        let number = fullText.match(/\d/g);
        if (number === null) {
            number = 0;
        }
        number = number.join('');
        return parseInt(number);
    },

    /**
    * Verify number of records found
    * @author Nam Hoang
    */
    async verifyNumberOfRecordsFound() {
        const expectedRecordFoundNumber = await self.getNumberOfRecordsFound.call(this);
        let numberOfRecordsFound = await keywords.countNumberOfElementsByXPath.call(this, tblRecords);
        if (expectedRecordFoundNumber > 50) {
            const pagingSection = await keywords.isDisplayed.call(this, navPaging);
            if (pagingSection) {
                numberOfRecordsFound = 0;
                const numberPages = await keywords.countNumberOfElementsByXPath.call(this, navPaging);
                for (let index = 2; index <= numberPages; index++) {
                    await keywords.waitClick.call(this, navPaging + `[${index}]/button`);
                    numberOfRecordsFound += await keywords.countNumberOfElementsByXPath.call(this, tblRecords);
                }
                await keywords.refresh.call(this);
            }
        }
        assert.equal(numberOfRecordsFound, expectedRecordFoundNumber);
    },

    /**
    * Verify the page has pagination
    * @author Nam Hoang
    */
    async verifyPageHasPagination() {
        let result = false;
        const numberOfRecordsFound = await self.getNumberOfRecordsFound.call(this);
        if (numberOfRecordsFound > 50) {
            result = await keywords.isDisplayed.call(this, navPaging);
        }
        assert.equal(result, true);
    },

    /**
    * verify paginated page number
    * @author Nam Hoang
    * @param {string} expectedNumberOfPages The paginated page number
    */
    async verifyPaginatedPageNumber(expectedNumberOfPages) {
        let numberPages = 0;
        const numberOfRecordsFound = await self.getNumberOfRecordsFound.call(this);
        if (numberOfRecordsFound > 50) {
            const pagingSection = await keywords.isDisplayed.call(this, navPaging);
            if (pagingSection) {
                numberPages = (await keywords.countNumberOfElementsByXPath.call(this, navPaging)) - 1;
            }
        }
        expectedNumberOfPages = parseInt(expectedNumberOfPages);
        assert.equal(numberPages, expectedNumberOfPages);
    },

    /**
    * Delete a record by key
    * @author Nam Hoang
    * @param {string} key The key name. Ex: username in Users table, employee id in Employees table
    */
    async deleteRecordByKey(key) {
        const keyName = await self.getVariableValue(key, this);
        const btnDeleteByKey = btnDelete.replace('$key', keyName);
        await keywords.waitClick.call(this, btnDeleteByKey);
        await keywords.waitClick.call(this, btnYes);
    },

    /**
    * Verify toast alert message
    * @author Nam Hoang
    * @param {string} expectedAlertMessage The alert message. Ex: Successfully Updated, Successfully Deleted
    */
    async verifyAlert(expectedAlertMessage) {
        const actualAlertMessage = await keywords.waitAndGetText.call(this, alrtMessage);
        assert.equal(true, actualAlertMessage.includes(expectedAlertMessage));
    },

    /**
    * Edit a record by key
    * @author Nam Hoang
    * @param {string} key The key name. Ex: username in Users table, employee id in Employees table
    */
    async clickEditActionByKey(key) {
        const keyName = await self.getVariableValue(key, this);
        const btnEditByKey = btnEdit.replace('$key', keyName);
        await keywords.waitClick.call(this, btnEditByKey);
    },

    /**
    * Select checkbox by keys
    * @author Nam Hoang
    * @param {string} keys The list of keys name. Ex: username: ess_user1, ess_user2,... or employee id: 0001, 0002. Accept a key, keys or all for selecting all checkboxes.
    */
    async selectCheckboxByKeys(keys) {
        const keyNames = await self.getVariableValue(keys, this);
        if (keyNames === 'all') {
            await keywords.waitClick.call(this, chkAllRecords);
        } else {
            const arrKeys = keyNames.split(',').map((str) => str.trim());
            arrKeys.forEach(async (key) => {
                const chkMultipleRecords = chkRecord.replace('$key', key);
                await keywords.waitClick.call(this, chkMultipleRecords);
            });
        }
    },

    /**
    * Delete selected records
    * @author Nam Hoang
    */
    async deleteSeletedRecords() {
        await keywords.waitClick.call(this, btnDeleteSelectedRecords);
        await keywords.waitClick.call(this, btnYes);
    },

    /**
    * Read csv file
    * @author Nam Hoang
    * @param {string} filePath The path of csv file.
    */
    async readDataFromCSVFile(filePath) {
        const results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(parse({ headers: true }))
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', () => {
                    console.log(`Read ${results.length} records from CSV file`);
                    resolve(results);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    },

    /**
    * Decode a string
    * @author Nam Hoang
    * @param {string} encodedString The encoded string. Ex: the encoded string of your password
    * @return {string} The string has been decoded
    */
    async decodeString(encodedString) {
        return atob(encodedString);
    },

    /**
      * Encode a string
      * @author Nam Hoang
      * @param {string} password The password string
      * @return {string} The string has been encoded
      */
    async encodeString(password) {
        return btoa(password);
    },

    /**
      * Upload file
      * @author Nam Hoang
      * @param {String} filePath The path of file that you want to upload.
      */
    async uploadFile(filePath) {
        const element = await keywords.waitUntilElementLocated.call(this, btnUpload);
        element.sendKeys(process.cwd() + '/' + filePath);
    },

    /**
       * Returns the value of the variable if it exists in this.results
       * @author Nam Hoang
       * @param {string} variable the variable to check
       * @param {string} scenario the object to be used as the current object
       * @return {Object} the value of the variable if it exists in this.results. Returns the variable itself if variable does not contain "${}"
       */
    async getVariableValue(variable, scenario) {
        if (!scenario.results) {
            scenario.results = {};
        }
        return filltemplate(variable, scenario.results);
    },
};
