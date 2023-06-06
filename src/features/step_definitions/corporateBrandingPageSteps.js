const { Then, When } = require('@cucumber/cucumber');
const corporateBranding = require('../page_objects/corporateBrandingPage');

When('Generate a random color HEX', corporateBranding.randomHexColor);

When('Set color {string} for {string}', corporateBranding.setColorForField);

When('User click random color for {string}', corporateBranding.automateColorPalette);

When('User resets color to default', corporateBranding.resetColorToDefault);

When('Verify colors of system are not changed on successful preview', corporateBranding.verifyColorSystemNotChange);

Then('Verify color of {string} in form is equal to {string}', corporateBranding.verifyColorOfField);

Then('Verify background color of the chevron-left button is equal to {string}', corporateBranding.verifyColorOfChevronLeftButton);

Then('Verify background color of the publish button in form is equal to {string}', corporateBranding.verifyColorOfPublishButton);

Then('Verify font color of the module page header is equal to {string}', corporateBranding.verifyFontColorOfModulePage);

Then('Verify font color of the publish button in form is equal to {string}', corporateBranding.verifyFontColorOfPublishButton);

Then('Verify gradient start color of the topbar header is equal to {string}', corporateBranding.verifyGradientStartColorOfTopbarHeader);

Then('Verify gradient end color of the topbar header is equal to {string}', corporateBranding.verifyGradientEndColorOfTopbarHeader);
