const { When } = require('@cucumber/cucumber');
const myInfoPage = require('../page_objects/myInfoPage.js');

When('A user update the Nationality {string} on personal detail', myInfoPage.updateNationality);

When('A user update the Education {string} on qualifications', myInfoPage.updateEducation);

When('A user update the Skill with name {string} on qualifications', myInfoPage.updateSkill);

When('A user update the Languages {string} with Fluency {string} and Competency {string} on qualifications', myInfoPage.updateLanguage);

When('A user update the Licenses {string} on qualifications', myInfoPage.updateLicense);

When('A user update the Memberships {string} on memberships', myInfoPage.updateMembership);

When('A user click on tab {string}', myInfoPage. selectTabName);
