const chai = require('chai');
const keywords = require('./keywords');
const config = require('../support/config');
const {assert} = chai;
const fs = require('fs');
const parse = require('csv-parser');

const icnLoading = `(//div[@id='preloader'])`;
const txtUsername = `//input[@name="username"]`;
const txtPassword = `//input[@name="password"]`;
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
const txtAllInfomationInRecord = `//div[@class='oxd-table-body']//div[text()='$key']/../../div`;

const self = module.exports = {
  /**
  * Navigate to the page by path.
  * @param {string} path The path url.
  */
  async navigateToPage(path) {
    await this.driver.get(config.BASE_URL + path);
  },

  /**
  * Login to system using username and password
  */
  async login() {
    await keywords.setText.call(this, txtUsername, config.ADMIN_USERNAME);
    await keywords.setText.call(this, txtPassword, config.ADMIN_PASSWORD);
    await keywords.waitClick.call(this, btnLogin);
  },

  /**
  * Wait and verify the page title.
  * @param {string} title The page title.
  */
  async checkPageTitle(title) {
    await keywords.waitUntilTitleIs.call(this, title);
    const actualTitle = await this.driver.getTitle();
    this.attach(`Actual page title: ${actualTitle}`);
    this.attach(`Expected page title: ${title}`);
    assert.equal(actualTitle, title);
  },

  /**
  * Wait and verify the page URL.
  * @param {string} path The path URL.
  */
  async checkPageURL(path) {
    const actualURL = await this.driver.getCurrentUrl();
    const expectedURL = config.BASE_URL + path;
    this.attach(`Actual page url: ${actualURL}`);
    this.attach(`Expected page url: ${expectedURL}`);
    assert.equal(actualURL, expectedURL);
  },

  /**
  * Wait for the loading icon not visible.
  */
  async waitLoading() {
    await keywords.waitUntilElementIsNotVisible.call(this, icnLoading);
  },

  /**
  * Click item in main menu.
  * @param {string} itemName The item in Main Menu: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Buzz
  */
  async clickMainMenuItem(itemName) {
    const option = itemMainMenu.replace('$itemName', itemName);
    await keywords.waitClick.call(this, option);
  },

  /**
    * Click item in topbar menu
    * @param {string} itemName The name of item in topbar menu. Ex:  Nationalities, Corporate Branding in Admin or Employee List, Reports in PIM
    */
  async clickTopBarMenuItem(itemName) {
    const tabItemName = ddlTopbarMenuItem.replace('$itemName', itemName);
    await keywords.waitClick.call(this, tabItemName);
  },

  /**
  * Select dropdown and choose dropdown item in topbar menu
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
  * @param {string} expectedModuleHeaderTitle The page module: Admin, PIM, Leave,...
  */
  async verifyModulePageHeaderTitle(expectedModuleHeaderTitle) {
    const actualModuleHeaderTitle = await keywords.waitAndGetText.call(this, lblModulePageHeader);
    this.attach(`Actual page title: ${actualModuleHeaderTitle}`);
    this.attach(`Expected page title: ${expectedModuleHeaderTitle}`);
    assert.equal(actualModuleHeaderTitle, expectedModuleHeaderTitle);
  },

  /**
  * Wait and verify the level of page header.
  * @param {string} expectedLevelHeaderTitle The page level. Ex: Job level belongs to Admin module
  */
  async verifyLevelPageHeaderTitle(expectedLevelHeaderTitle) {
    const actualLevelHeaderTitle = await keywords.waitAndGetText.call(this, lblLevelPageHeader);
    this.attach(`Actual page title: ${actualLevelHeaderTitle}`);
    this.attach(`Expected page title: ${expectedLevelHeaderTitle}`);
    assert.equal(actualLevelHeaderTitle, expectedLevelHeaderTitle);
  },

  /**
  * Select dropdown and choose dropdown item in topbar menu
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
  * Select dropdown and choose dropdown item in topbar menu
  * @param {string} hint The hint value for searching
  * @param {string} labelName The name of label with the corresponding hint field. Ex: Employee Name in Search System User or Employee Name, Employee Id, Supervisor Name in Search Employee Information
  * @param {string} optionValue The name of option in dropdown with the corresponding hint. Ex: Boss A and Boss B are options for the hint is Boss
  */
  async selectValueByHint(hint, labelName, optionValue) {
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
  * @return {number} Number of records found.
  */
  async getNumberOfRecordsFound() {
    const fullText = await keywords.waitAndGetText.call(this, lblRecordsFound);
    const number = fullText.match(/\d/g);
    return parseInt(number);
  },

  /**
  * Verify number of records found
  */
  async verifyNumberOfRecordsFound() {
    const expectedRecordFoundNumber = await self.getNumberOfRecordsFound();
    const actualRecordFoundNumber = keywords.countNumberOfElementsByXPath(tblRecords);
    this.attach(`Actual Record Found Number: ${actualRecordFoundNumber}`);
    this.attach(`Expected Record Found Number: ${expectedRecordFoundNumber}`);
    assert.equal(actualRecordFoundNumber, expectedRecordFoundNumber);
  },

  /**
  * Delete a record by key
  * @param {string} key The key name. Ex: username in Users table, employee id in Employees table
  */
  async deleteRecordByKey(key) {
    const btnDeleteByKey = btnDelete.replace('$key', key);
    await keywords.waitClick.call(this, btnDeleteByKey);
    await keywords.waitClick.call(this, btnYes);
  },

  /**
  * Verify toast alert message
  * @param {string} expectedAlertMessage The alert message. Ex: Successfully Updated, Successfully Deleted
  */
  async verifyAlert(expectedAlertMessage) {
    const actualAlertMessage = await keywords.waitAndGetText.call(this, alrtMessage);
    this.attach(`Actual Alert Message: ${actualAlertMessage}`);
    this.attach(`Expected Alert Message: ${expectedAlertMessage}`);
    assert.equal(true, actualAlertMessage.includes(expectedAlertMessage));
  },

  /**
  * Delete a record by key
  * @param {string} key The key name. Ex: username in Users table, employee id in Employees table
  */
  async clickEditActionByKey(key) {
    const btnSditByKey = btnEdit.replace('$key', key);
    await keywords.waitClick.call(this, btnSditByKey);
  },

  /**
  * Select checkbox by keys
  * @param {string} keys The list of keys name. Ex: username: ess_user1, ess_user2,... or employee id: 0001, 0002. Accept a key, keys or all for selecting all checkboxes.
  */
  async selectCheckboxByKeys(keys) {
    if (keys === 'all') {
      await keywords.waitClick.call(this, chkAllRecords);
    } else {
      const arrKeys = keys.split(',').map((str) => str.trim());
      arrKeys.forEach(async (key) => {
        const chkMultipleRecords = chkRecord.replace('$key', key);
        await keywords.waitClick.call(this, chkMultipleRecords);
      });
    }
  },

  /**
  * Delete selected records
  */
  async deleteSeletedRecords() {
    await keywords.waitClick.call(this, btnDeleteSelectedRecords);
    await keywords.waitClick.call(this, btnYes);
  },

  /**
  * Read csv file
  * @param {string} filePath The path of csv file.
  */
  async readDataFromCSVFile(filePath) {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
          .pipe(parse({headers: true}))
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
  * Get all information from keys
  * @param {string} keys The list of keys name. Ex: username: ess_user1, ess_user2,... or employee id: 0001, 0002. Accept a key, keys or all for selecting all checkboxes.
  */
  async getAllInformationByKeys(keys) {
    if (keys === 'all') {
      await keywords.waitClick.call(this, chkAllRecords);
    } else {
      const arrKeys = keys.split(',').map((str) => str.trim());
      arrKeys.forEach(async (key) => {
        const txtAllInfomationInRecordByKey = txtAllInfomationInRecord.replace('$key', key);
        await keywords.waitAndGetAllText.call(this, txtAllInfomationInRecordByKey);
        // implementing
      });
    }
  },

  /**
  * Decode a string
  * @param {string} encodedString The encoded string. Ex: the encoded string of your password
  * @return {string} The string has been decoded
  */
  async decodeString(encodedString) {
    return atob(encodedString);
  },
};
