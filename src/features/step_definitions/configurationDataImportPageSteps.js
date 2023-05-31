const { Then, When } = require('@cucumber/cucumber');
const configurationDataImportPage = require('../page_objects/configurationDataImportPage');

Then('Verify the popup with message {string} show', configurationDataImportPage.verifyPopupWithMessageShow);

Then('Verify record with Id key is added from path file {string} successfully', configurationDataImportPage.readDataCSVAndVerifyRecordWithIdDisplay);

Then('Delete the record with Id key and delete {string} modified path file to clean environment', configurationDataImportPage.deleteRecordWithIdAndDeleteModifiledCSVFile);

When('Add employee list from csv file {string} by {string} path file', configurationDataImportPage.addRandomVariablesAndUploadRecordFromCSV);

Then('Verify the importData file is downloaded successfully to local', configurationDataImportPage.verifyFileIsDownloaded);

Then('Click to Download to get sample CSV file', configurationDataImportPage.clickDownload);

Then('Delete all record from csv file and delete {string} modified path file to clean environment', configurationDataImportPage.deleteAllRecordsAndDeleteModifiledCSVFile);

