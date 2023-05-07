const { When } = require('@cucumber/cucumber');
const jobCategoriesManagementPage = require('../page_objects/jobCategoriesManagementPage');

When('User enter a new job category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);

When('User enter the name of an existing job category as {string}', jobCategoriesManagementPage.typeEmploymentStatusName);
