const { When } = require('@cucumber/cucumber');
const leaveTypesConfigurePage = require('../page_objects/leaveTypesConfigurePage');

When('A user go to Leave Types page', leaveTypesConfigurePage.gotoPage);

When('A user create leaves type with name {string} successfully', leaveTypesConfigurePage.addNewLeaveType);
