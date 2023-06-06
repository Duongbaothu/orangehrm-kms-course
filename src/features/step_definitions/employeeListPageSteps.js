const { When } = require('@cucumber/cucumber');
const employeeListPage = require('../page_objects/employeeListPage');

When('A user go to Employee List page', employeeListPage.gotoPage);
