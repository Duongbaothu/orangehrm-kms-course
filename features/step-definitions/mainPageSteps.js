const {When} = require('@cucumber/cucumber');
const mainPage = require('../page-objects/mainPage');

When('User click Account button', mainPage.clickBtnAccount);

When('User click Customer Login button', mainPage.clickBtnCustomerLogin);
