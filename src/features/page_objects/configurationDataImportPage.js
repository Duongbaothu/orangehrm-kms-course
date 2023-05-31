const chai = require('chai');
const keywords = require('./keywords');
const common = require('./common');
const { assert } = chai;
const path = require('path');
const fs = require('fs');

const dlgPopup = `//div[contains(@class,'orangehrm-text-center-align')]`;
const linkDownload = `//div[contains(@class, 'orangehrm-information-card-container')]//p[text()='Sample CSV file : ']/a[contains(@class, 'download-link')]`;
const navPaging = `//nav[@aria-label='Pagination Navigation']/ul/li`;
const navNumber = navPaging + `/button[contains(@class,'oxd-pagination-page-item--page') and text()='$index']`;
const lblRecordNameWithLevelTitle = `//div[contains(@class,'oxd-table-card')]//div[text()="$itemName"]`;
const lblRecordsFound = `//span[contains(.,'Record Found') or contains(.,'Records Found')]`;
const chkDeleteAllRecords = `//div[@class='oxd-table-header']//input[@type='checkbox']/..//span`;
const btnDeleteSelectedRecords = `//button[normalize-space(.)='Delete Selected']`;
const btnYes = `//button[normalize-space(.)='Yes, Delete']`;
const btnDeleteAction = `//div[@role='rowgroup']//div[@class='oxd-table-card']//div[normalize-space(.)="$key"]/..//i[contains(@class, 'bi-trash')]`;

/**
* Go to page which includes xpath in table
* @param {string} xpath xpath of element
*/
async function gotoPagNumIncludeXpath(xpath) {
    let isActualDisplay = false;
    const numberPages = await keywords.countNumberOfElementsByXPath.call(this, navPaging);
    for (let index = 1; index < numberPages; index++) {
        const navNum = navNumber.replace('$index', index);
        await keywords.waitClick.call(this, navNum);
        // ensure all elements in table was shown
        await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
        isActualDisplay = await keywords.elementIsExisted.call(this, xpath);
        if (isActualDisplay) {
            break;
        }
    }
}

const self = module.exports = {
    /**
     * Click download
     * @author Hanh Nguyen
     */
    async clickDownload() {
        await keywords.waitAndScrollIntoView.call(this, linkDownload);
        await keywords.waitClick.call(this, linkDownload);
    },

    /**
    * Verify the popup with message show correctly
    * @author Hanh Nguyen
    * @param {string} expectedMessage The expected message in popup
    */
    async verifyPopupWithMessageShow(expectedMessage) {
        await keywords.waitUntilElementIsVisible.call(this, dlgPopup);
        const actualMessage = await keywords.waitAndGetText.call(this, dlgPopup);
        assert.equal(actualMessage, expectedMessage);
    },

    /**
    * Delete file path
    * @author Hanh Nguyen
    * @param {string} filePath The file path need to delete
    */
    async deleteFile(filePath) {
        const filePathDelete = path.join(process.cwd(), filePath);
        fs.unlink(filePathDelete, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log(`File deleted successfully: ${filePathDelete}`);
            }
        });
    },

    /**
    * Add Random Variables And Upload Record From CSV
    * @author Hanh Nguyen
    * @param {string} modifiedFilePath The modified path of csv file
    * @param {string} initialFilePath The initial path of csv file
    */
    async addRandomVariablesAndUploadRecordFromCSV(modifiedFilePath, initialFilePath) {
        const csvData = fs.readFileSync(initialFilePath, 'utf-8');
        const rows = csvData.split('\n');
        const header = rows.shift().split(',');
        // Generate a random employee ID, work_email, other_email and replace the existing values
        rows.forEach((row, index) => {
            if (row === '') return;
            const fields = row.split(',');
            // Generate a random employee ID, work_email, other_email and replace the existing ID
            const randomId = Math.floor(Math.random() * 1000000);
            if (fields[header.indexOf('employee_id')]) {
                fields[header.indexOf('employee_id')] = randomId;
            }
            if (fields[header.indexOf('work_email')]) {
                fields[header.indexOf('work_email')] = `employee${randomId}@company.com`;
            }
            if (fields[header.indexOf('other_email')]) {
                fields[header.indexOf('other_email')] = `personal${randomId}@gmail.com`;
            }
            // Replace the original row with the modified row
            rows[index] = fields.join(',');
        });
        // Join the modified rows back into a CSV string
        const modifiedCsvData = [header.join(',')].concat(rows).join('\n');
        fs.writeFileSync(modifiedFilePath, modifiedCsvData);
        await common.uploadFile.call(this, modifiedFilePath);
    },

    /**
    * Read data import from csv file and verify the record is added successfully
    * @author Hanh Nguyen
    * @param {string} filePath The path of csv file.
    */
    async readDataCSVAndVerifyRecordWithIdDisplay(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        let isActualDisplay = false;
        const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        for (let i = 1; i < csvData.length; i++) {
            const txtNameByValue = lblRecordNameWithLevelTitle.replace('$itemName', csvData[i]._3);
            if (numberOfRecordsFound <= 50) {
                await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
                isActualDisplay = await keywords.elementIsExisted.call(this, txtNameByValue);
            } else {
                const numberPages = await keywords.countNumberOfElementsByXPath.call(this, navPaging);
                for (let index = 1; index < numberPages; index++) {
                    const navNum = navNumber.replace('$index', index);
                    await keywords.waitClick.call(this, navNum);
                    // ensure all elements in page was shown
                    await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
                    isActualDisplay = await keywords.elementIsExisted.call(this, txtNameByValue);
                    if (isActualDisplay) {
                        break;
                    }
                }
                assert.isTrue(isActualDisplay);
            }
        }
    },

    /**
    * Read data import from csv file, delete the record with Id and delete modified csv file to clean environment
    * @author Hanh Nguyen
    * @param {string} filePath The path of csv file.
    */
    async deleteRecordWithIdAndDeleteModifiledCSVFile(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        for (let i = 1; i < csvData.length; i++) {
            const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
            const btnDeleteByKey = btnDeleteAction.replace('$key', csvData[i]._3);
            if (numberOfRecordsFound <= 50) {
                await keywords.waitAndScrollIntoView.call(this, btnDeleteByKey);
                await common.deleteRecordToCleanEnv.call(this, csvData[i]._3);
                await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
            } else {
                await gotoPagNumIncludeXpath.call(this, btnDeleteByKey);
                await keywords.waitAndScrollIntoView.call(this, btnDeleteByKey);
                await common.deleteRecordToCleanEnv.call(this, csvData[i]._3);
                await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
            }
        }
        await self.deleteFile.call(this, filePath);
    },

    /**
    * Delete all records from test case more than 50 records and delete modified csv file to clean environment
    * @author Hanh Nguyen
    * @param {string} filePath The path of csv file.
    */
    async deleteAllRecordsAndDeleteModifiledCSVFile(filePath) {
        const csvData = await common.readDataFromCSVFile.call(this, filePath);
        let isActualDisplay = false;
        let numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        while (numberOfRecordsFound > 50) {
            // back to page index 1
            const navNum = navNumber.replace('$index', '1');
            await keywords.waitClick.call(this, navNum);
            await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
            await keywords.waitAndScrollIntoView.call(this, chkDeleteAllRecords);
            await keywords.waitClick.call(this, chkDeleteAllRecords);
            await keywords.waitClick.call(this, btnDeleteSelectedRecords);
            await keywords.waitClick.call(this, btnYes);
            await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
            numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
        }
        for (let i = 1; i < csvData.length; i++) {
            const txtNameByValue = lblRecordNameWithLevelTitle.replace('$itemName', csvData[i]._3);
            isActualDisplay = await keywords.elementIsExisted.call(this, txtNameByValue);
            if (isActualDisplay) {
                await keywords.waitAndScrollIntoView.call(this, txtNameByValue);
                await common.deleteRecordToCleanEnv.call(this, csvData[i]._3);
                await keywords.waitUntilElementIsVisible.call(this, lblRecordsFound);
            }
        }
        await self.deleteFile.call(this, filePath);
    },

    /**
    * Verify file downloaded success
    * @author Hanh Nguyen
    */
    async verifyFileIsDownloaded() {
        // Set the default download directory as 'Downloads' folder in the user's home directory
        const downloadDir = process.env.DOWNLOAD_DIR || path.join(require('os').homedir(), 'Downloads');
        const filePath = path.join(downloadDir, 'importData.csv');
        // Wait for the file to be downloaded
        await keywords.waitForFileIsDownloaded.call(this, filePath);
        // Check if the file size is greater than 0
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        assert.isAbove(fileSizeInBytes, 0, 'File size should be greater than 0');
    },

};
