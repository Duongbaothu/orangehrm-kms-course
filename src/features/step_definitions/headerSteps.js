const {When} = require('@cucumber/cucumber');
const header = require('../page_objects/header');

When('User click Account button', header.clickBtnAccount);

When('User click Customer Login button', header.clickBtnCustomerLogin);
