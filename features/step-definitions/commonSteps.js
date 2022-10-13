const {Given, Then} = require('@cucumber/cucumber');
const common = require('../page-objects/common');

Given('A user visits {string}', common.navigateToPage);

Then('Page title is {string}', common.checkPageTitle);
