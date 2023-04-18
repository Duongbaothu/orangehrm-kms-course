/* eslint-disable max-len */
const chai = require('chai');
const keywords = require('./keywords');
const { assert } = chai;
const common = require('./common');
const { TIMEOUT_SHORT } = require('../support/config');

const btnFunctionByName = `//button[normalize-space(.) = '$buttonName']`;
const lblFormTitle = `//h6[contains(@class, 'orangehrm-main-title')]`;
const txtJobTitle = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Job Title']]//input`;
const lblJobTitleError = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Job Title']]//span[contains(@class, 'oxd-input-field-error-message')]`;
const txtJobDescription = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Job Description']]//textarea`;
const lblJobDescriptionError = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Job Description']]//span[contains(@class, 'oxd-input-field-error-message')]`;
const txtNote = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Note']]//textarea`;
const lblJobNoteError = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Note']]//span[contains(@class, 'oxd-input-field-error-message')]`;
const lblRecordRowByJobTitle = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Job Titles')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$jobTitle']]`;
const lblRecordRowByJobTitleAndDescription = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Job Titles')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$jobTitle'] and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Job Description')]/preceding-sibling::div) + 1][contains(., '$jobDescription')]]`;
const btnTrashIconOfJobTitle = `//div[contains(@class, 'oxd-table-row') and .//div[count(//div[contains(@class, 'oxd-table-header-cell') and contains(., 'Job Titles')]/preceding-sibling::div) + 1][@role = 'cell' and normalize-space(.) = '$jobTitle']]//i[contains(@class, 'bi-trash')]`;
const dlgDeleteModal = `//div[@role = 'dialog' and .//p[contains(@class, 'oxd-text--card-title') and normalize-space(.) = 'Are you Sure?']]`;
const btnDeleteModalButtonByName = `//div[@role = 'dialog' and .//p[contains(@class, 'oxd-text--card-title') and normalize-space(.) = 'Are you Sure?']]//button[normalize-space(.) = '$buttonName']`;
const lblFormLoader = `//div[contains(@class, 'oxd-form-loader')]`;
let numberOfRecordsFound= 0;

const self = module.exports = {

    /**
    * Get the number of records found page loaded
    * @author Tuyen Nguyen
    */
    async getNumberOfRecords() {
        numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    },

    /**
    * Verify the number of records after added
    * @author Tuyen Nguyen
    * @param {string} number The number of records added
    */
    async verifyIncreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound + Number(number);
        assert.equal(expectedNumberOfRecordsFound, actualNumberOfRecordsFound);
    },

    /**
    * Verify the number of records after deleted
    * @author Tuyen Nguyen
    * @param {string} number The number of records deleted
    */
    async verifyDecreasingNumberRecords(number) {
        const actualNumberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        const expectedNumberOfRecordsFound = numberOfRecordsFound - Number(number);
        assert.equal(expectedNumberOfRecordsFound, actualNumberOfRecordsFound);
    },

    /**
    * Click fucntion button at Job Title page.
    * @author Tuyen Nguyen
    * @param {string} buttonName The function button in Admin Page: Add, Edit, No Cancel, Yes Delete,...
    */
    async clickFunctionButton(buttonName) {
        await common.waitLoading.call(this);
        const btnFunction = btnFunctionByName.replace('$buttonName', buttonName);
        await keywords.waitAndScrollIntoView.call(this, btnFunction, TIMEOUT_SHORT);
        await keywords.waitClick.call(this, btnFunction);
    },

    /**
    * Verify the from title on the job title page.
    * @author Tuyen Nguyen
    * @param {string} expectedTitle The form title on teh Job title page: Add Job Title, Edit Job Title
    */
    async verifyTheFormTitle(expectedTitle) {
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        const actualFormTitle = await keywords.waitAndGetText.call(this, lblFormTitle);
        assert.equal(actualFormTitle, expectedTitle);
    },

    /**
    * Enter the job title into the textbox
    * @author Tuyen Nguyen
    * @param {string} title The value of job title
    */
    async typeJobTitle(title) {
        await keywords.waitUntilElementLocated.call(this, txtJobTitle);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        const value = await common.getVariableValue(title, this);
        await keywords.setText.call(this, txtJobTitle, value);
    },

    /**
    * Verify the job title
    * @author Tuyen Nguyen
    * @param {string} title The value of job title
    */
    async verifyJobTitle(title) {
        const value = await common.getVariableValue(title, this);
        await keywords.waitUntilElementLocated.call(this, txtJobTitle);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        const actualJobTitle = await keywords.waitAndGetAttribute.call(this, txtJobTitle, 'value');
        assert.equal(actualJobTitle, value);
    },

    /**
    * Enter the job description into the textbox
    * @author Tuyen Nguyen
    * @param {string} description The value of job description
    */
    async typeJobDescription(description) {
        const value = await common.getVariableValue(description, this);
        await keywords.setText.call(this, txtJobDescription, value);
    },

    /**
    * Enter the job note into the textbox
    * @author Tuyen Nguyen
    * @param {string} note The value of job note
    */
    async typeNote(note) {
        const value = await common.getVariableValue(note, this);
        await keywords.setText.call(this, txtNote, value);
    },

    /**
    * Verify the validation message when missed the value of job title
    * @author Tuyen Nguyen
    * @param {string} expectedValidationMsg The validation message: Required
    */
    async verifyValidationMessageOfJobTitle(expectedValidationMsg) {
        const actualValidationMsg = await keywords.waitAndGetText.call(this, lblJobTitleError);
        assert.equal(actualValidationMsg, expectedValidationMsg);
    },

    /**
    * Verify the validation message when missed the value of job description
    * @author Tuyen Nguyen
    * @param {string} expectedValidationMsg The validation message: Required
    */
    async verifyValidationMessageOfJobDescription(expectedValidationMsg) {
        const actualValidationMsg = await keywords.waitAndGetText.call(this, lblJobDescriptionError);
        assert.equal(actualValidationMsg, expectedValidationMsg);
    },

    /**
    * Verify the validation message when missed the value of note
    * @author Tuyen Nguyen
    * @param {string} expectedValidationMsg The validation message: Required
    */
    async verifyValidationMessageOfJobNote(expectedValidationMsg) {
        const actualValidationMsg = await keywords.waitAndGetText.call(this, lblJobNoteError);
        assert.equal(actualValidationMsg, expectedValidationMsg);
    },

    /**
    * Add the new job title to system
    * @author Tuyen Nguyen
    * @param {string} title The job title
    */
    async addNewJobTitle(title) {
        await self.clickFunctionButton.call(this, 'Add');
        const value = await common.getVariableValue(title, this);
        await keywords.setText.call(this, txtJobTitle, value);
        await self.clickFunctionButton.call(this, 'Save');
    },

    /**
    * verify the job title and job description of the record which added
    * @author Tuyen Nguyen
    * @param {string} title The job title
    * @param {string} description The job description
    */
    async verifyRecordWithTitleAndDescription(title, description) {
        const value = await common.getVariableValue(title, this);
        const text = await common.getVariableValue(description, this);
        const lblRecordRow = lblRecordRowByJobTitleAndDescription.replace('$jobTitle', value).replace('$jobDescription', text);
        await keywords.verifyElementIsDisplayed.call(this, lblRecordRow);
    },

    /**
    * verify the job title of the record which added
    * @author Tuyen Nguyen
    * @param {string} title The job title
    */
    async verifyRecordWithTitle(title) {
        const value = await common.getVariableValue(title, this);
        const lblRecordRow = lblRecordRowByJobTitle.replace('$jobTitle', value);
        await keywords.verifyElementIsDisplayed.call(this, lblRecordRow);
    },

    /**
    * click on the trash icon of a job title
    * @author Tuyen Nguyen
    * @param {string} title The job title
    */
    async clickTrashIconOfJob(title) {
        const value = await common.getVariableValue(title, this);
        const btnTrashIcon = btnTrashIconOfJobTitle.replace('$jobTitle', value);
        await keywords.waitClick.call(this, btnTrashIcon);
    },

    /**
    * Verify the delete dialog appears
    * @author Tuyen Nguyen
    */
    async verifyDeleteDialogDislayed() {
        await keywords.waitUntilElementIsVisible.call(this, dlgDeleteModal);
        await keywords.verifyElementIsDisplayed.call(this, dlgDeleteModal);
    },

    /**
    * Click on the button on the delete dialog
    * @author Tuyen Nguyen
    * @param {string} buttonName The job title: No, Cancel || Yes, Delete
    */
    async clickDeleteModalButton(buttonName) {
        const btnDeleteModalButton = btnDeleteModalButtonByName.replace('$buttonName', buttonName);
        await keywords.waitClick.call(this, btnDeleteModalButton);
    },

    /**
    * Verify the delete dialog disappears
    * @author Tuyen Nguyen
    */
    async verifyDeleteDialogNotDislayed() {
        await keywords.waitForElementIsNotPresent.call(this, dlgDeleteModal);
    },

    /**
    * verify the record is removed from system
    * @author Tuyen Nguyen
    * @param {string} title The job title
    */
    async verifyRecordWithTitleNotDisplayed(title) {
        const value = await common.getVariableValue(title, this);
        const lblRecordRow = lblRecordRowByJobTitle.replace('$jobTitle', value);
        await keywords.waitForElementIsNotPresent.call(this, lblRecordRow);
    },

    /**
    * generate the random character with the specific length and input to the field
    * @author Tuyen Nguyen
    * @param {number} numOfChar The length of character
    * @param {string} fieldName The field name: Job Title, Job Description, Note
    */
    async generateCharAndSetToAddJobFields(numOfChar, fieldName) {
        let txtInput;
        switch (fieldName) {
        case 'Job Title':
            txtInput = txtJobTitle;
            break;
        case 'Job Description':
            txtInput = txtJobDescription;
            break;
        case 'Note':
            txtInput = txtNote;
            break;
        default:
            assert.fail('The fieldName should be Job Title or Job Description or Note');
            break;
        }
        const randomString = await common.generateRandomString.call(this, numOfChar);
        await keywords.setText.call(this, txtInput, randomString);
    },

    /**
    * clean up the job title data after running
    * @author Tuyen Nguyen
    * @param {string} jobTitle The job title
    */
    async removeTheJob(jobTitle) {
        const value = await common.getVariableValue(jobTitle, this);
        await common.deleteRecordByKey.call(this, value);
    },

    /**
    * verify the URL link
    * @author Tuyen Nguyen
    * @param {string} url The job title
    */
    async verifyThePageURL(url) {
        await common.waitLoading.call(this);
        await common.verifyPageURL.call(this, url);
    },
};
