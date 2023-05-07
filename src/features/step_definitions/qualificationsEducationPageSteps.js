const { Given, When } = require('@cucumber/cucumber');
const qualificationsEducationPage = require('../page_objects/qualificationsEducationPage');

Given('Type text {string} for {string} field', qualificationsEducationPage.typeTextInField);

When('Add new education with {string} for {string} field', qualificationsEducationPage.addNewEducation);

Given('Verify button with name {string} is visible', qualificationsEducationPage.verifyButtonDisplay);

Given('Type text level name from {string}', qualificationsEducationPage.readDataAndAddEducationFromCSV);
