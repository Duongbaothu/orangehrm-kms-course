const keywords = require('./keywords');
const common = require('./common');

const rdoTicketType = `//input[@id='selectTicketType']`;
const frmFlyingFrom = `//input[@id="autocomplete"]`;
const frmToDestination = `//input[@id="autocomplete2"]`;
const txtDepartureDate = `//input[@id="departure"]`;
const btnFlightsSearch = `//button[@id="flights-search"]`;
const txtReturnDate = `//input[@id="return"]`;
const ddlClassFlight = `//select[@id="flight_type"]/option[@value='selectClassFlight']`;
const txtAdults = `//input[@id='fadults']`;
const txtChilds = `//input[@id='fchilds']`;
const lblAdults = `//*[@id="fadein"]/section[1]//p[2]/text()[1]`;
const lblChilds = `//*[@id="fadein"]/section[1]//p[2]/text()[2]`;
const lblFlyingFrom = `//section[contains(@class,'sec__title_list')]//h2/text()[1]`;
const lblToDestination = `//section[contains(@class,'sec__title_list')]//h2/text()[2]`;
const lblPageLabel = `//*[@id="fadein"]//h2[contains(text(),'SEARCH FOR BEST FLIGHTS')]`;
const dblFlights = `//*[@id="data"]/ul/li[1]/div/form//div[1]`;
const lblDateFlight = `//*[@id="fadein"]/div/form/div[2]//h3[contains(text(),'Flight Stops')]`;
const lblDepartureDate = `//*[@id="fadein"]/section[1]//p[1]/text()[1]`;
const lblReturnDate = `//*[@id="fadein"]/section[1]//p[1]/text()[2]`;
const btnBackToSearch = `//*[@id="fadein"]/div[5]/a/strong[contains(text(),'Back To Search')]`;

module.exports = {
  /**
  * Verify the label in page.
  * @param {string} label the label in page.
  */
  async checkPageTitle(label) {
    await common.waitLoading.call(this);
    const actualLabel = await keywords.waitAndGetText.call(this, lblPageLabel);
    this.attach(`Actual pageTitle: ${actualLabel}`);
    this.attach(`Expected pageTitle: ${label}`);
    assert.equal(actualLabel, label);
  },

  /**
  * Select ticket type at Flights page
  * @param {string} ticketType the select ticket type
  */
  async clickRdoTicketType(ticketType) {
    const rdo = rdoTicketType.replace('selectTicketType', ticketType);
    await keywords.waitClick.call(this, rdo);
  },

  /**
  * Choose class type at Flights page
  * @param {string} classFlight the select class
  */
  async chooseClassFlight(classFlight) {
    const ddl = ddlClassFlight.replace('selectClassFlight', classFlight);
    await keywords.waitClick.call(this, ddl);
  },

  /**
  * Type user Flying From at Flights page
  * @param {string} flyingFrom the Flying From
  */
  async typeFlyingFrom(flyingFrom) {
    await keywords.setText.call(this, frmFlyingFrom, flyingFrom);
    this.attach(`User enter flyingFrom: ${flyingFrom}`);
  },

  /**
  * Type user fill To Destination at Flights page.
  * @param {string} toDestination the To Destination
  */
  async typeToDestination(toDestination) {
    await keywords.setText.call(this, frmToDestination, toDestination);
    this.attach(`User enter toDestination: ${toDestination}`);
  },

  /**
  * Type user fill Passengers at Flights page
  * @param {string} adults the adults
  * @param {string} childs the childs
  */
  async fillPassengers(adults, childs) {
    await keywords.setText.call(this, txtAdults, adults);
    await keywords.setText.call(this, txtChilds, childs);
  },

  /**
  * Type user Flying From at Flights page
  * @param {string} departureDate the Departure Date
  */
  async typeDepartureDate(departureDate) {
    await keywords.setText.call(this, txtDepartureDate, departureDate);
    this.attach(`User enter departure: ${departureDate}`);
  },

  /**
  * Type user type return Date at Flights page
  * @param {string} returnDate the Return Date
  */
  async typereturnDate(returnDate) {
    await keywords.setText.call(this, txtReturnDate, returnDate);
    this.attach(`User enter departure: ${returnDate}`);
  },

  /**
  * Click the Login button.
  */
  async clickBtnFlightsSearch() {
    await common.waitLoading.call(this);
    await keywords.waitClick.call(this, btnFlightsSearch);
  },

  /**
  * Verify the Flying From
  * @param {string} flyingFrom the Flying From
  */
  async checkFlyingFrom(flyingFrom) {
    await common.waitLoading.call(this);
    const actualFlyingFrom = await keywords.waitAndGetText.call(this, lblFlyingFrom);
    this.attach(`Actual flyingfrom: ${actualFlyingFrom}`);
    this.attach(`Expected flyingfrom: ${flyingFrom}`);
    assert.equal(actualFlyingFrom, flyingFrom);
  },

  /**
  * Verify the To Destination
  * @param {string} toDestination the To Destination
  */
  async checkToDestination(toDestination) {
    await common.waitLoading.call(this);
    const actualToDestination = await keywords.waitAndGetText.call(this, lblToDestination);
    this.attach(`Actual destination: ${actualToDestination}`);
    this.attach(`Expected destination: ${toDestination}`);
    assert.equal(actualToDestination, toDestination);
  },

  /**
  * Verify the Date Flight
  * @param {string} dateFlight The Date Flight
  */
  async checkDateFlight(dateFlight) {
    await common.waitLoading.call(this);
    const actualDateFlight = await keywords.waitAndGetText.call(this, lblDateFlight);
    this.attach(`Actual DateFlight: ${actualDateFlight}`);
    this.attach(`Expected DateFlight: ${dateFlight}`);
    assert.equal(actualDateFlight, dateFlight);
  },

  /**
  * Verify the date flight for type ticket round trip
  * @param {string} departureDate departure date flight
  * @param {string} returnDate reture date flight
  */
  async checkDateRoundTrip(departureDate, returnDate) {
    await common.waitLoading.call(this);
    const actualDepartureDate = await keywords.waitAndGetText.call(this, lblDepartureDate);
    this.attach(`Actual departure date: ${actualDepartureDate}`);
    this.attach(`Expected departure date: ${departureDate}`);
    assert.equal(actualDepartureDate, departureDate);

    const actualReturnDate = await keywords.waitAndGetText.call(this, lblReturnDate);
    this.attach(`Actual reture date: ${actualReturnDate}`);
    this.attach(`Expected reture date: ${returnDate}`);
    assert.equal(actualReturnDate, returnDate);
  },

  /**
  * Verify the Total Passengers
  * @param {string} totalAdults the total passengers as adults
  * @param {string} totalChilds the total passengers as childs
  */
  async checktotalPassengers(totalAdults, totalChilds) {
    await common.waitLoading.call(this);
    const actualTotalAdults = await keywords.waitAndGetText.call(this, lblAdults);
    this.attach(`Actual totalAdults: ${actualTotalAdults}`);
    this.attach(`Expected totalAdults: ${totalAdults}`);
    assert.equal(actualTotalAdults, totalAdults);

    const actualTotalChilds = await keywords.waitAndGetText.call(this, lblChilds);
    this.attach(`Actual totalChilds: ${actualTotalChilds}`);
    this.attach(`Expected totalChilds: ${totalChilds}`);
    assert.equal(actualTotalChilds, totalChilds);
  },

  /**
  * Verify the result Flights to display
  * @param {string} resultFlights the result Flights
  */
  async isResultFlightsDisplayed(resultFlights) {
    const actualResultFlights = await keywords.waitAndGetText.call(this, dblFlights);
    this.attach(`Actual resultFlights: ${actualResultFlights}`);
    this.attach(`Expected resultFlights: ${resultFlights}`);
    assert.equal(actualResultFlights, resultFlights);
  },

  /**
  * Verify the btn Back to Search in page.
  * @param {string} backToSearch the btn Back to Search in page.
  */
  async isDisplayBtnBackToSearch(backToSearch) {
    await common.waitLoading.call(this);
    const actualBtnBackToSearch = await keywords.waitAndGetText.call(this, btnBackToSearch);
    this.attach(`Actual btn Back to Search: ${actualBtnBackToSearch}`);
    this.attach(`Expected btn Back to Search: ${backToSearch}`);
    assert.equal(actualBtnBackToSearch, backToSearch);
  },

  /**
  * Verify alert error is existed in page.
  */
  async isDisplayDlgMessageError() {
    await common.waitLoading.call(this);
    await until(ExpectedConditions.alertIsPresent());
    return true;
  },
};
