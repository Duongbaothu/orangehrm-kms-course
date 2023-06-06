const { When, Then } = require('@cucumber/cucumber');
const myLeavePage = require('../page_objects/myLeavePage');

When('A user go to My Leave page', myLeavePage.gotoPage);

Then('Verify status leave type {string} in date {string} of user {string} display in table is {string}', myLeavePage.verifyStatusOfEmployeeLeave);
