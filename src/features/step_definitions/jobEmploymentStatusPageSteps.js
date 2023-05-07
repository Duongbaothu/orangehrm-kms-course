const { When } = require('@cucumber/cucumber');
const jobEmploymentStatusPage = require('../page_objects/jobEmploymentStatusPage');

When('User enter a new employment status name as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);

When('User enter the name of an existing employment status as {string}', jobEmploymentStatusPage.typeEmploymentStatusName);
