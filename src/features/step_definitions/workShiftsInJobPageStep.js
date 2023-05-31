const { Given, When, Then } = require('@cucumber/cucumber');
const workShiftsInJobPage = require('../page_objects/workShiftsInJobPage');

Given('User add a Work Shift with shift name as {string}', workShiftsInJobPage.addNewWorkShiftWithName);

When('Enter value {string} for {string}', workShiftsInJobPage.typeTxtForFieldsName);

When('User enter the name {string} of an existing {string}', workShiftsInJobPage.typeTxtForFieldsName);

Then('Verify Duration Per Day {string} displayed correctly', workShiftsInJobPage.verifyDurationPerDayIsDisplayed);

Then('Verify the Work Shifts records with name {string} from {string} to {string} and hours per day {string} is added successfully', workShiftsInJobPage.verifyRecordWorkShiftIsDisplayed);
