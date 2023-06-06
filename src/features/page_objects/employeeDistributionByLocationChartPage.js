const chai = require('chai');
const { assert } = chai;
const common = require('./common');
const keywords = require('./keywords');

const txtLocationName = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Name']]//input`;
const txtEmployeeId = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Employee Id']]//input`;
const txtFullName = `//div[contains(concat(' ', @class, ' '), ' oxd-input-group ') and .//label[normalize-space(text()) = 'Employee Full Name']]//input[contains(@name,'$partName')]`;
const lblFormLoader = `//div[contains(@class, 'oxd-form-loader')]`;
const lblJob = `//div[contains(@class,'tabs-wrapper')]//a[contains(.,'Job')]`;
const imgChart = `//p[contains(., 'Employee Distribution by Location')]//..//..//..//canvas`;
const tooltip = `//span[contains(@id,'oxd-pie-chart-tooltip')]`;
const chartSubcription = `//p[contains(., 'Employee Distribution by Location')]/following::ul[@class='oxd-chart-legend']//span[contains(@class, 'oxd-text')]`;
const chartLocation = `//p[contains(., 'Employee Distribution by Location')]/following::ul[@class='oxd-chart-legend']//span[contains(.,'$location')]`;

let smallestPercent = 100;

/**
* Function to get the total employee
* @author Lan Tran
*/
async function getTotalEmployee() {
    await common.clickMainMenuItem.call(this, 'PIM');
    await common.clickTopBarMenuItem.call(this, 'Employee List');
    return await common.getNumberOfRecordsFound.call(this);
}

/**
* Function to get the percentage of each location belong to employee
* @author Lan Tran and Nhu Ho
*/
async function getPercentOfEmployeeByLocation() {
    const totalEmployee = await getTotalEmployee.call(this);
    let arrayLocationPercent = [];
    let unassignedValue = 100;
    await common.clickMainMenuItem.call(this, 'Admin');
    await common.selectDropdownMenuItemByText.call(this, 'Organization', 'Locations');
    await common.verifyTheMainTitleIsDisplayed.call(this, 'Locations');

    const numberOfRecordsFound = await common.getNumberOfRecordsFound.call(this);
    if (numberOfRecordsFound !== 0) {
        for (let i = 1; i <= numberOfRecordsFound; i++) {
            const locationNameXpath = `//div[@class='oxd-table-card'][${i}]//div[contains(@class, 'oxd-table-cell')][2]//div`;
            const numberEmployeeXpath = `//div[@class='oxd-table-card'][${i}]//div[contains(@class, 'oxd-table-cell')][6]//div`;
            const location = await keywords.waitAndGetAttribute.call(this, locationNameXpath, 'innerText');
            const numberEmployee = Number(await keywords.waitAndGetAttribute.call(this, numberEmployeeXpath, 'innerText'));

            // Caculate expected percentage of employee by location
            const percent = (numberEmployee / totalEmployee * 100).toFixed(2);

            // Get the smallest percentage to assign to jump step in point to the chart
            smallestPercent = (parseInt(percent) < smallestPercent && parseInt(percent) !== 0) ? parseInt(percent) : parseInt(smallestPercent);
            arrayLocationPercent = [...arrayLocationPercent, { location: location, percent: percent }];
        }
    }

    for (let i = 0; i < arrayLocationPercent.length; i++) {
        unassignedValue -= arrayLocationPercent[i].percent;
    }

    arrayLocationPercent.push({ location: 'Unassigned', percent: Number(unassignedValue).toFixed(2) + '' });
    return arrayLocationPercent;
}

/**
* Caculate the x, y offset by percentage
* @author Nhu Ho
* @param {String} percent The percent
*/
async function calculateOffset(percent) {
    const chartElement = await keywords.waitUntilElementLocated.call(this, imgChart);
    const rect = await chartElement.getRect();

    const radius = rect.width / 2;
    const totalOffset = 360; // Total offset in degrees (360 degrees for a full circle)
    const startingAngle = -90; // Starting angle in degrees (12 o'clock position)
    const offset = (percent / 100) * totalOffset; // Calculate the offset based on the percentage (clockwise)
    const adjustedOffset = (offset + startingAngle) % totalOffset;
    const radians = (adjustedOffset * Math.PI) / 180; // Convert the offset to radians in a clockwise direction
    const offsetX = Math.round(Math.cos(radians) * radius / 2); // Calculate the X offset based on the radius and angle
    const offsetY = Math.round(Math.sin(radians) * radius / 2); // Calculate the Y offset based on the radius and angle
    return { xOffset: parseInt(offsetX), yOffset: parseInt(offsetY) };
}

/** Click by x, y offset
* @author Nhu Ho
* @param {Number} xOffset The xOffset
* @param {Number} yOffset The yOffset
*/
async function clickPieChart(xOffset, yOffset) {
    await keywords.waitAndScrollIntoView.call(this, imgChart);
    const canvasElement = await keywords.waitUntilElementLocated.call(this, imgChart);
    await keywords.clickElementByOffset.call(this, canvasElement, xOffset, yOffset);
}

/** Get the text from the Tooltip by percentage
* @author Nhu Ho
* @param {String} percent The percent
* @return {String} tooltip data
*/
async function getToolTipDataByPercent(percent) {
    const xy = await calculateOffset.call(this, percent);
    const xOffset = parseInt(xy.xOffset);
    const yOffset = parseInt(xy.yOffset);
    await clickPieChart.call(this, xOffset, yOffset);
    const tooltipText = await keywords.waitAndGetText.call(this, tooltip);
    return tooltipText;
}

/** Get the percentage data from the tooltip of the chart
* @author Lan Tran and Nhu Ho
* @return {Array} tooltip data
*/
async function getDataFromChart() {
    const ulEles = await keywords.waitUntilElementsLocated.call(this, chartSubcription);
    // Click the point smaller than the smallest percentage to make sure the click point inside the piece of chart
    let percent = smallestPercent - 1;
    const arrTooltipText = [];
    let tooltipText = '';

    for (let i = 0; i < ulEles.length; i++) {
        tooltipText = await getToolTipDataByPercent.call(this, percent);
        // The condition to avoid the duplication in the array
        while (tooltipText === arrTooltipText[arrTooltipText.length - 1]) {
            percent += smallestPercent;
            tooltipText = await getToolTipDataByPercent.call(this, percent);
        }
        const result = tooltipText.split('\n');
        arrTooltipText.push({ location: result[0], percent: result[2].replace(/\(|\)/g, '') });
        percent += smallestPercent;
    };
    return arrTooltipText;
}

module.exports = {

    /**
    * Add the location for pre-condition of the testing
    * @author Lan Tran
    * @param {String} location The location of employee
    * @param {String} country The country of the location
    */
    async addLocation(location, country) {
        // Navigate to the Add Location page
        await common.clickMainMenuItem.call(this, 'Admin');
        await common.selectDropdownMenuItemByText.call(this, 'Organization', 'Locations');
        await common.clickBtnByName.call(this, 'Add');

        // Fill into Location field
        await keywords.waitUntilElementLocated.call(this, txtLocationName);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        const value = await common.getVariableValue(location, this);
        await keywords.setText.call(this, txtLocationName, value);

        // Fill into Country field
        await common.selectDropdownItemByValue.call(this, country, 'Country');

        await common.clickBtnByName.call(this, 'Save');
    },

    /**
    * Delete location to clean environment
    * @author Lan Tran
    * @param {String} location Employee's location
    */
    async deleteLocation(location) {
        await common.clickMainMenuItem.call(this, 'Admin');
        await common.selectDropdownMenuItemByText.call(this, 'Organization', 'Locations');
        await common.deleteRecordToCleanEnv.call(this, location);
    },

    /**
    * Add the Employee with Location
    * @author Lan Tran
    * @param {String} id Employee's ID
    * @param {String} firstName Employee's first name
    * @param {String} lastName Employee's last name
    * @param {String} location Employee's location
    */
    async addEmployee(id, firstName, lastName, location) {
        // Navigate to the Add Employee page
        await common.clickMainMenuItem.call(this, 'PIM');
        await common.clickTopBarMenuItem.call(this, 'Add Employee');

        // Fill into Firt Name field
        const txtFirstName = txtFullName.replace('$partName', 'firstName');
        await keywords.waitUntilElementLocated.call(this, txtFirstName);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        await keywords.setText.call(this, txtFirstName, firstName);

        // Fill into Last Name field
        const txtLastName = txtFullName.replace('$partName', 'lastName');
        await keywords.waitUntilElementLocated.call(this, txtLastName);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        await keywords.setText.call(this, txtLastName, lastName);

        // Fill into ID field
        await keywords.waitUntilElementLocated.call(this, txtEmployeeId);
        await keywords.waitForElementIsNotPresent.call(this, lblFormLoader);
        await keywords.setText.call(this, txtEmployeeId, id);

        // Save the record
        await common.clickBtnByName.call(this, 'Save');

        if (location !== '') {
            // Change the navigate to Job for adjusting location
            await keywords.waitClick.call(this, lblJob);
            // Edit Employee's location
            await common.selectDropdownItemByValue.call(this, location, 'Location');
            await common.clickBtnByName.call(this, 'Save');
        }
        await common.clickTopBarMenuItem.call(this, 'Employee List');
    },

    /**
    * Delete employee to clean environment
    * @author Lan Tran
    * @param {String} employeeId the Employee's ID
    */
    async deleteEmployee(employeeId) {
        await common.clickMainMenuItem.call(this, 'PIM');
        await common.deleteRecordToCleanEnv.call(this, employeeId);
    },

    /**
    * Verify the location is displayed in the chart
    * @author Lan Tran
    * @param {String} location The employee's location
    */
    async verifyTheLocationIsDisplayed(location) {
        let matchedLocation = 0;
        const locationTitle = await common.getVariableValue(location, this);

        // Call this function to re-assign value of smallestPercent
        await getPercentOfEmployeeByLocation.call(this);
        await common.clickMainMenuItem.call(this, 'Dashboard');
        await keywords.waitAndScrollIntoView.call(this, imgChart);
        const arrTooltipText = await getDataFromChart.call(this);

        for (let i = 0; i < arrTooltipText.length; i++) {
            if (arrTooltipText[i].location === locationTitle) matchedLocation++;
        }

        if (matchedLocation) {
            assert.isTrue(true);
        } else {
            assert.isTrue(false);
        }
    },

    /**
    * Verify the location is not displayed in chart
    * @author Lan Tran
    * @param {String} location The employee's location
    */
    async verifyTheLocationIsNotDisplayed(location) {
        let matchedLocation = 0;
        const locationTitle = await common.getVariableValue(location, this);
        const arrTooltipText = await getDataFromChart.call(this);

        for (let i = 0; i < arrTooltipText.length; i++) {
            if (arrTooltipText[i].location === locationTitle) matchedLocation++;
        }

        if (matchedLocation) {
            assert.isTrue(false);
        } else {
            assert.isTrue(true);
        }
    },

    /**
    * Verify the percentage in the chart
    * @author Lan Tran and Nhu Ho
    * @param {String} location The Employee's location
    */
    async verifyPercentageOfLocation() {
        let matchedLocation = 0;
        const expectedArrayLocationPercent = await getPercentOfEmployeeByLocation.call(this);
        await common.clickMainMenuItem.call(this, 'Dashboard');
        await keywords.waitAndScrollIntoView.call(this, imgChart);
        const arrTooltipText = await getDataFromChart.call(this);

        for (let i = 0; i < arrTooltipText.length; i++) {
            for (let j = 0; j < expectedArrayLocationPercent.length; j++) {
                if (arrTooltipText[i].location === expectedArrayLocationPercent[j].location) {
                    assert.equal(arrTooltipText[i].percent, expectedArrayLocationPercent[j].percent + '%');
                    matchedLocation++;
                }
            }
        }
        // The failure condition if there is no common location in expected and actual array
        if (matchedLocation === 0 ) {
            assert.isFalse(true);
        }
    },

    async clickChartSubcription(location) {
        const value = await common.getVariableValue(location, this);
        const locationXpath = chartLocation.replace('$location', value);
        await keywords.waitClick.call(this, locationXpath);
    },
};
