/* eslint-disable max-len */
const {When} = require('@cucumber/cucumber');
const {filltemplate} = require('@ln-maf/core');
const flightPage = require('../page_objects/flightPage');
require('@ln-maf/core/parameter_types');
require('@ln-maf/validations');

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

When('verify page label Search for Best Flights as {string}', async function(label) {
  this.parameters = flightPage.checkPageTitle(label);
});

When('user click ticket type is {string}', async function(ticketType) {
  this.parameters = flightPage.clickRdoTicketType(ticketType);
});

When('user select {string} class flight', async function(classFlight) {
  this.parameters = flightPage.chooseClassFlight(classFlight);
});

When('user type {string} into Flying From', async function(flyingFrom) {
  flyingFrom = getVal(flyingFrom, this);
  await flightPage.typeFlyingFrom.call(this, flyingFrom);
});

When('user type {string} into To Destination', async function(toDestination) {
  toDestination = getVal(toDestination, this);
  await flightPage.typeToDestination.call(this, toDestination);
});

When('user fill {string} into Departure Date', async function(departureDate) {
  departureDate = getVal(departureDate, this);
  await flightPage.typeDepartureDate.call(this, departureDate);
});

When('user fill {string} into Reture Date', async function(returnDate) {
  returnDate = getVal(returnDate, this);
  await flightPage.typereturnDate.call(this, returnDate);
});

When('fill passengers with {string} adults and {string} childs', async function(adults, childs) {
  adults = getVal(adults, this);
  childs = getVal(childs, this);
  await flightPage.fillPassengers.call(this, adults, childs);
});

When('user click Flights Search button', flightPage.clickBtnFlightsSearch);

When('verify the Flying From is displayed correct as {string}', async function(flyingFrom) {
  this.parameters = flightPage.checkFlyingFrom(flyingFrom);
});

When('verify the To Destination is displayed correct as {string}', async function(toDestination) {
  this.parameters = flightPage.checkToDestination(toDestination);
});

When('verify the Date Flights is displayed correct as {string}', async function(dateFlight) {
  this.parameters = flightPage.checkDateFlight(dateFlight);
});

When('verify the Date Flights are displayed as {string} departureDate and {string} returnDate', async function(departureDate, returnDate) {
  this.parameters = flightPage.checkDateRoundTrip(departureDate, returnDate);
});

When('verify the Passengers are displayed correct as {string} adults and {string} childs', async function(totalAdults, totalChilds) {
  this.parameters = flightPage.checkDateFlight(totalAdults, totalChilds);
});

When('verify the result Flights is displayed as {string}', async function(resultFlights) {
  this.parameters = flightPage.isResultFlightsDisplayed.call(resultFlights);
});

When('verify the button {string} is displayed', async function(backToSearch) {
  this.parameters = flightPage.isDisplayBtnBackToSearch.call(backToSearch);
});

When('verify pop up message error is displayed', async function() {
  this.parameters = flightPage.isDisplayDlgMessageError.call();
});


