const {When} = require('@cucumber/cucumber');
const footerPage = require('../page_objects/footerPage');
const {filltemplate} = require('@ln-maf/core');

const fillTemplate = filltemplate;

/**
 * Returns the value of the variable if it exists in this.results.
 * @param {string} variable the variable to check
 * @param {Object} scenario the scenario to check
 * @return {Object} the value of the variable if it exists in this.results.
 * Returns the variable itself if variable does not contain "${}"
 */
function getVal(variable, scenario) {
  if (!scenario.results) {
    scenario.results = {};
  }
  return fillTemplate(variable, scenario.results);
}

When('User scroll to the element', footerPage.scrollToFooter);

When('User click {string} text with href: {string}', async function(element, href) {
  href = getVal(href, this);
  await footerPage.clickBtnByName.call(this, href);
});
