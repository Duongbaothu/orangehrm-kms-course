const { When, Then } = require('@cucumber/cucumber');
const employeeDistributionByLocationChartPage = require('../page_objects/employeeDistributionByLocationChartPage');

When('A user add new location {string} in country {string}', employeeDistributionByLocationChartPage.addLocation);

When('A user add new employee with {string}, {string} and {string} with {string}', employeeDistributionByLocationChartPage.addEmployee);

Then('I verify the {string} is displayed on chart', employeeDistributionByLocationChartPage.verifyTheLocationIsDisplayed);

Then('I verify the percentage of in the chart is correct', employeeDistributionByLocationChartPage.verifyPercentageOfLocation);

When('I delete the location {string} to clean environment', employeeDistributionByLocationChartPage.deleteLocation);

When('I delete the employee by {string} to clean environment', employeeDistributionByLocationChartPage.deleteEmployee);

When('I click on title {string} on the chart', employeeDistributionByLocationChartPage.clickChartSubcription);

Then('I verify the {string} is disappeared on the chart', employeeDistributionByLocationChartPage.verifyTheLocationIsNotDisplayed);
