const { Given, When } = require('@cucumber/cucumber');
const qualificationsSkillsPage = require('../page_objects/qualificationsSkillsPage');

Given('Type text {string} for Name field', qualificationsSkillsPage.typeNameForSkill);

Given('Type text {string} for Description field', qualificationsSkillsPage.typeDescriptionForSkill);

When('Add new skill with {string} and {string}', qualificationsSkillsPage.addNewSkill);

Given('Verify button with name {string} is present', qualificationsSkillsPage.verifyButtonDisplay);

Given('Type text skill name and description from {string}', qualificationsSkillsPage.readDataAndAddSkillFromCSV);

Given('Verify the skill with title {string} and {string} are shown in the table', qualificationsSkillsPage.verifyRecordWithSkillAndDescriptionIsDisplay);

Given('Verify the record with title {string} and {string} is deleted successfully', qualificationsSkillsPage.verifyRecordWithSkillAndDescriptionIsNotDisplay);
