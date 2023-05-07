const { Then, When } = require('@cucumber/cucumber');
const usersManagement = require('../page_objects/userManagementPage');

When('A user type {string} into {string}', usersManagement.typeTextForField);

When('A user delete all text in {string}', usersManagement.deleteTextForField);

Then('Get all info of a user with username {string} in table', usersManagement.getInfoUserWithUsername);

When('Add multiple users with .csv file in {string}', { timeout: 60*2*1000 }, usersManagement.addMultiUsersWithCsv);

When('A user click checkbox Change Password', usersManagement.clickCheckboxForChangePass);

Then('Verify user role of user {string} is {string} showing correctly in table', usersManagement.verifyUserRoleOfUserIsShowingCorrectlyInTable);

Then('Verify employee name of user {string} is {string} showing correctly in table', usersManagement.verifyEmployeeNameOfUserIsShowingCorrectlyInTable);

Then('Verify status of user {string} is {string} showing correctly in table', usersManagement.verifyStatusOfUserIsShowingCorrectlyInTable);
