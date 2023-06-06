const { When, Then } = require('@cucumber/cucumber');
const leaveListPage = require('../page_objects/leaveListPage');

When('A user go to Leave List page', leaveListPage.gotoPage);

When('A user filter leave by employee name {string}', leaveListPage.filterByEmployeeName );

When('A user approve {string} leave', leaveListPage.approveLeave);

When('A user reject {string} leave', leaveListPage.rejectLeave);


Then('Verify {string} is not displayed in table leaves after approving successfully', leaveListPage.verifyLeaveNotDisplayInTable);
