const { When } = require('@cucumber/cucumber');
const myEntitlementsPage = require('../page_objects/myEntitlementsPage');

When('A user go to My Entitlements page', myEntitlementsPage.gotoPage);
