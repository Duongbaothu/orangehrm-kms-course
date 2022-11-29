const {Then, When} = require('@cucumber/cucumber');
const mainPage = require('../page_objects/mainPage');

Then('All price in page will show in {string}', mainPage.checkCurrencyPrice);

When('User select an item in Featured Tours', mainPage.selectTour);

When('User click on Contact Us button in Infor section', mainPage.clickBtnContactUs);
