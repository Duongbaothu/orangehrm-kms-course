const keywords = require('./keywords');
const common = require('./common');
const chai = require('chai');
const { assert } = chai;
const { By } = require('selenium-webdriver');

const lblMainTitleForm = `//h6[normalize-space(.)='Corporate Branding']`;
const cliField = `//label[normalize-space(.)='$fieldName']/following-sibling::*`;
const clpField = `//label[normalize-space(.)='$fieldName']/following-sibling::*//div[contains(@role, 'alert')]`;
const clpCanvas = `//label[normalize-space(.)='$fieldName']/following-sibling::*//canvas[contains(@class,'picker-palette')]`;
const clpRange = `//label[normalize-space(.)='$fieldName']/following-sibling::*//input[contains(@class,'picker-range')]`;
const txtHexColorPicker = `//label[normalize-space(.)='$fieldName']/following-sibling::*//div[contains(@role, 'alert')]//input[contains(@class,'input')]`;
const cliBackgroundColor = `//label[normalize-space(.)='$fieldName']/following-sibling::*//div`;
const spnLoading = `//div[contains(@class,'form-loader')]`;
const btnChevronLeft = `//button[contains(@class,'main-menu-button')]`;
const btnPublish = `//button[normalize-space(.)='Publish']`;
const lblModulePage = `//h6[contains(@class,'module')]`;
const tpbHeader = `//div[@class='oxd-topbar-header']`;

const self = module.exports = {

    /**
     * Set color for field in form.
     * @author Trang Ngo
    */
    async randomHexColor() {
        const random = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        this.results.randomColor = '#' + random;
        this.attach(`Hex: ${this.results.randomColor}`);
    },

    /**
     * Set color for field in form.
     * @author Trang Ngo
     * @param {string} r Red color. Color has values ranging from 0 to 255.
     * @param {string} g Green color. Color has values ranging from 0 to 255.
     * @param {string} b Blue color. Color has values ranging from 0 to 255.
     * @return {string} The hex name color.
    */
    async convertRGBToHex(r, g, b) {
        const hex = '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
        return hex;
    },

    /**
     * Set color for field in form.
     * @author Trang Ngo
     * @param {string} hex Hex of color.
     * @param {string} fieldName The field name. Ex: Primary Color is the field in the Corporate Branding form.
    */
    async setColorForField(hex, fieldName) {
        const field = await common.getVariableValue(fieldName, this);
        await keywords.waitClick.call(this, cliField.replace('$fieldName', field));
        await keywords.waitUntilElementIsVisible.call(this, clpField.replace('$fieldName', field));
        await keywords.setText.call(this, txtHexColorPicker.replace('$fieldName', field), await common.getVariableValue(hex, this));
    },

    /**
     * Click color in picker range and canvas by x-coordinate and y-coordinate
     * @author Hanh Nguyen
     * @param {string} fieldName The field name. Ex: Primary Color is the field in the Corporate Branding form.
     */
    async automateColorPalette(fieldName) {
        try {
            const field = await common.getVariableValue(fieldName, this);
            await keywords.waitClick.call(this, cliField.replace('$fieldName', field));
            await keywords.waitUntilElementLocated.call(this, clpField.replace('$fieldName', field));

            const pickerRangeElement = await this.driver.findElement(By.xpath(clpRange.replace('$fieldName', field)));
            const colorRangeRect = await pickerRangeElement.getRect();
            const length = colorRangeRect.width;
            const randomNumber = Math.floor(Math.random() * length);
            const xCoordinate = randomNumber - length/2;
            await this.driver.actions().dragAndDrop(pickerRangeElement, { x: Math.floor(xCoordinate), y: 0 }).perform();

            const colorPickerPaletteElement = await this.driver.findElement(By.xpath(clpCanvas.replace('$fieldName', field)));
            const colorPickerRect = await colorPickerPaletteElement.getRect();
            const canvasX = colorPickerRect.x + Math.floor(Math.random() * colorPickerRect.width);
            const canvasY = colorPickerRect.y + Math.floor(Math.random() * colorPickerRect.height);
            await this.driver.actions().move({ x: Math.floor(canvasX), y: Math.floor(canvasY) }).click().perform();

            this.results.randomHexColor = await keywords.waitAndGetAttribute.call(this, txtHexColorPicker.replace('$fieldName', field), 'value');
        } catch (error) {
            console.error('error:', error);
            throw error;
        }
    },

    /**
     * Verify expected hex of field.
     * @author Trang Ngo
     * @param {string} fieldName The field name. Ex: Primary Color is the field in the Corporate Branding form.
     * @param {string} expectedHex The hex value of field.
     */
    async verifyColorOfField(fieldName, expectedHex) {
        await keywords.waitForPageIsLoaded.call(this, spnLoading);
        await keywords.waitUntilElementLocated.call(this, lblMainTitleForm);
        await keywords.sleepFor.call(this, 100);
        const style = await keywords.waitAndGetAttribute.call(this, cliBackgroundColor.replace('$fieldName', await common.getVariableValue(fieldName, this)), 'style');
        let actualColorRGB = style.substring(style.indexOf('(') + 1, style.indexOf(')'));
        actualColorRGB = actualColorRGB.split(',');
        const actualColorHex = await self.convertRGBToHex.call(this, actualColorRGB[0], actualColorRGB[1], actualColorRGB[2]);
        assert.equal(actualColorHex, await common.getVariableValue(expectedHex, this));
    },

    /**
     * Verify background color of chevron-left button.
     * @author Trang Ngo
    * @param {String} xpath The element xpath.
    * @param {String} propertyName The CSS property name of the element.
     * @param {string} expectedHex The hex value of field.
     */
    async verifyCSSValueColor(xpath, propertyName, expectedHex) {
        const RGBAColor = await keywords.waitAndGetCSSValue.call(this, xpath, propertyName);
        const actualColorRGB = RGBAColor.replace('rgba(', '').replace(')', '').split(',');
        const actualColorHex = await self.convertRGBToHex.call(this, actualColorRGB[0], actualColorRGB[1], actualColorRGB[2]);
        assert.equal(actualColorHex, await common.getVariableValue(expectedHex, this));
    },

    /**
     * Verify background color of chevron-left button.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyColorOfChevronLeftButton(expectedHex) {
        await self.verifyCSSValueColor.call(this, btnChevronLeft, 'background-color', expectedHex);
    },

    /**
     * Verify background color of Publish button.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyColorOfPublishButton(expectedHex) {
        await self.verifyCSSValueColor.call(this, btnPublish, 'background-color', expectedHex);
    },

    /**
     * Verify font color of Module Page.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyFontColorOfModulePage(expectedHex) {
        await self.verifyCSSValueColor.call(this, lblModulePage, 'color', expectedHex);
    },

    /**
     * Verify font color of Publish button.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyFontColorOfPublishButton(expectedHex) {
        await self.verifyCSSValueColor.call(this, btnPublish, 'border-bottom-color', expectedHex);
    },

    /**
     * Verify gradient start color of topbar header.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyGradientStartColorOfTopbarHeader(expectedHex) {
        const gradientColor = await keywords.waitAndGetCSSValue.call(this, tpbHeader, 'background-image');
        const actualColorRGB = gradientColor.split(',');
        const actualColorHex = await self.convertRGBToHex.call(this, actualColorRGB[1].replace('rgb(', ''), actualColorRGB[2], actualColorRGB[3].replace(')', ''));
        assert.equal(actualColorHex, await common.getVariableValue(expectedHex, this));
    },

    /**
     * Verify gradient end color of topbar header.
     * @author Trang Ngo
     * @param {string} expectedHex The hex value of field.
     */
    async verifyGradientEndColorOfTopbarHeader(expectedHex) {
        const gradientColor = await keywords.waitAndGetCSSValue.call(this, tpbHeader, 'background-image');
        const actualColorRGB = gradientColor.split(',');
        const actualColorHex = await self.convertRGBToHex.call(this, actualColorRGB[4].replace('rgb(', ''), actualColorRGB[5], actualColorRGB[6].substring(0, actualColorRGB[6].length - 6), '');
        assert.equal(actualColorHex, await common.getVariableValue(expectedHex, this));
    },

    /**
     * Reset color to default.
     * @author Trang Ngo
    */
    async resetColorToDefault() {
        await common.clickBtnByName.call(this, 'Reset to Default');
        await self.verifyColorOfField.call(this, 'Primary Color', '#ff7b1d');
        await self.verifyColorOfField.call(this, 'Secondary Color', '#76bc21');
        await self.verifyColorOfField.call(this, 'Primary Font Color', '#ffffff');
        await self.verifyColorOfField.call(this, 'Secondary Font Color', '#ffffff');
        await self.verifyColorOfField.call(this, 'Primary Gradient Color 1', '#ff920b');
        await self.verifyColorOfField.call(this, 'Primary Gradient Color 2', '#f35c17');
    },

    /**
     * Verify colors of system are not changed.
     * @author Trang Ngo
    */
    async verifyColorSystemNotChange() {
        await common.clickTopBarMenuItem.call(this, 'Corporate Branding');
        await self.verifyColorOfChevronLeftButton.call(this, '#ff7b1d');
        await self.verifyColorOfPublishButton.call(this, '#76bc21');
        await self.verifyFontColorOfModulePage.call(this, '#ffffff');
        await self.verifyFontColorOfPublishButton.call(this, '#ffffff');
        await self.verifyGradientStartColorOfTopbarHeader.call(this, '#ff920b');
        await self.verifyGradientEndColorOfTopbarHeader.call(this, '#f35c17');
    },

};
