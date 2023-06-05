/* eslint-disable max-len */
const keywords = require('./keywords');
const common = require('./common');
const { TIMEOUT_SHORT } = require('../support/config');

const ddlOption = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ')and .//label[normalize-space(text()) = '$section']]//i`;
const tabItems = `//div[@role='tablist']//a[normalize-space(.) = '$tabName']`;
const btnQualificationSection = `//h6[normalize-space(.) = '$section']/following-sibling::button[normalize-space(.) = '$button']`;

const self = module.exports = {

    /**
    * Select the Nationality option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} nationalityValue The nationality option
    */
    async updateNationality(nationalityValue) {
        const ddlNationality = ddlOption.replace('$section', 'Nationality');
        await keywords.waitAndScrollIntoView.call(this, ddlNationality);
        await common.selectDropdownItemByValue.call(this, nationalityValue, 'Nationality');
    },

    /**
    * Select the Education option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} educationOption The education option
    */
    async updateEducation(educationOption) {
        await self.selectFunctionButtonUnderQualification.call(this, 'Add', 'Education');
        const ddlEducation = ddlOption.replace('$section', 'Level');
        await keywords.waitAndScrollIntoView.call(this, ddlEducation);
        await common.selectDropdownItemByValue.call(this, educationOption, 'Level');
    },

    /**
    * Select the Skill option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} skillOption The skill option
    */
    async updateSkill(skillOption) {
        await self.selectFunctionButtonUnderQualification.call(this, 'Add', 'Skills');
        const ddlSkill = ddlOption.replace('$section', 'Skill');
        await keywords.waitAndScrollIntoView.call(this, ddlSkill);
        await common.selectDropdownItemByValue.call(this, skillOption, 'Skill');
    },

    /**
    * Select the Language option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} languageOption The language option from the dropdown list
    * @param {string} fluencyOption The fluency option  from the dropdown list
    * @param {string} competencyOption The competency option  from the dropdown list
    */
    async updateLanguage(languageOption, fluencyOption, competencyOption) {
        await self.selectFunctionButtonUnderQualification.call(this, 'Add', 'Languages');
        const ddlLanguage = ddlOption.replace('$section', 'Language');
        await keywords.waitAndScrollIntoView.call(this, ddlLanguage);
        await common.selectDropdownItemByValue.call(this, languageOption, 'Language');
        await common.selectDropdownItemByValue.call(this, fluencyOption, 'Fluency');
        await common.selectDropdownItemByValue.call(this, competencyOption, 'Competency');
    },

    /**
    * Select the License option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} licenseOption The license option
    */
    async updateLicense(licenseOption) {
        await self.selectFunctionButtonUnderQualification.call(this, 'Add', 'License');
        const ddlLicense = ddlOption.replace('$section', 'License Type');
        await keywords.waitAndScrollIntoView.call(this, ddlLicense);
        await common.selectDropdownItemByValue.call(this, licenseOption, 'License Type');
    },

    /**
    * Select the Membership option from the dropdown list
    * @author Tuyen Nguyen
    * @param {string} membershipOption The membership option
    */
    async updateMembership(membershipOption) {
        await self.selectFunctionButtonUnderQualification.call(this, 'Add', 'Assigned Memberships');
        const ddlMembership = ddlOption.replace('$section', 'Membership');
        await keywords.waitAndScrollIntoView.call(this, ddlMembership);
        await common.selectDropdownItemByValue.call(this, membershipOption, 'Membership');
    },

    /**
    * Click on the tab name on My Info page: Personal Details, Contact Details, Emergency Contacts, Dependents, Immigration, Job, Salary, Tax Exemptions, Report-to, Qualifications, Memberships.
    * @author Tuyen Nguyen
    * @param {string} tabName The tab name: Personal Details, Contact Details, Emergency Contacts, Dependents, Immigration, Job, Salary, Tax Exemptions, Report-to, Qualifications, Memberships.
    */
    async selectTabName(tabName) {
        const btnTab = tabItems.replace('$tabName', tabName);
        await keywords.waitAndScrollIntoView.call(this, btnTab, TIMEOUT_SHORT);
        await keywords.waitClick.call(this, btnTab);
    },

    /**
    * Click on the function button on the Qualification tab under each section
    * @author Tuyen Nguyen
    * @param {string} functionButton The function button on Qualification tab: Add, Cancel, Save
    * @param {string} sectionName The section on Qualification tab: Work Experience, Education, Skills, Languages, License, Attachments
    */
    async selectFunctionButtonUnderQualification(functionButton, sectionName) {
        const btnFunction = btnQualificationSection.replace('$section', sectionName).replace('$button', functionButton);
        await keywords.waitAndScrollIntoView.call(this, btnFunction, TIMEOUT_SHORT);
        await keywords.waitClick.call(this, btnFunction);
    },
};
