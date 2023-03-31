const {Then} = require('@cucumber/cucumber');
const adminPage = require('../page_objects/adminPage');

Then('Verify the item {string} in Main Menu is displayed', adminPage.verifyItemMainMenuIsDisplayed);
