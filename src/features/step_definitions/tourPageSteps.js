const {Then} = require('@cucumber/cucumber');
const tourPage = require('../page_objects/tourPage');

Then('The booking uses selected {string}', tourPage.checkCurrencyBooking);
