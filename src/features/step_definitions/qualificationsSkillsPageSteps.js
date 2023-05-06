const { Given, When } = require('@cucumber/cucumber');
const qualificationsSkillsPage = require('../page_objects/qualificationsSkillsPage');

When('Get number of records found in Skills table', qualificationsSkillsPage.getNumberOfRecordsFound);

Given('Type text {string} for Name field', qualificationsSkillsPage.typeNameForSkill);

Given('Type text {string} for Description field', qualificationsSkillsPage.typeDescriptionForSkill);

Given('Verify the number of records found in the table increase by {string} unit', qualificationsSkillsPage.verifyNumberRecordsIncreasing);

Given('Verify the number of records found in the table decrease by {string} unit', qualificationsSkillsPage.verifyNumberRecordsDecreasing);

When('Add new skill with {string} and {string}', qualificationsSkillsPage.addNewSkill);

Given('Verify button with name {string} is present', qualificationsSkillsPage.verifyButtonDisplay);

Given('Type text skill name and description from {string}', qualificationsSkillsPage.readDataAndAddSkillFromCSV);

Given('Verify the skill with title {string} and {string} are shown in the table', qualificationsSkillsPage.verifyRecordWithSkillAndDescriptionIsDisplay);

Given('Verify the record with title {string} and {string} is deleted successfully', qualificationsSkillsPage.verifyRecordWithSkillAndDescriptionIsNotDisplay);
