const { When } = require('@cucumber/cucumber');
const applyLeavePage = require('../page_objects/applyLeavePage');

When('A user go to Apply Leave page', applyLeavePage.gotoPage);

When('A user submit a leave with infor leave type {string} balance {string}, duration {string} from {string} to {string}', applyLeavePage.submitApplyLeave);
