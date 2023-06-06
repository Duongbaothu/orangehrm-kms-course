const { When } = require('@cucumber/cucumber');
const addEntitlementsEntitlementsPage = require('../page_objects/addEntitlementsEntitlementsPage');

When('A user go to Add Entitlements page', addEntitlementsEntitlementsPage.gotoPage);

When('A user create new Entitlement with {string}, {string} and entitle value {string} successfully', addEntitlementsEntitlementsPage.addEntilement);
