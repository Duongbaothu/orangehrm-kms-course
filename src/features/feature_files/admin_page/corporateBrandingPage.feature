@AP @AP16 @Config
Feature: As an Admin, I can manage colors and images for Website in Corporate Branding session

    Background: Open browser and navigate to the specific page
        Given A user visits OrangeHRM page
        And A user logged in by admin role
        And Page title is 'OrangeHRM'
        When A user click 'Admin' item in main menu
        And A user click 'Corporate Branding' item in topbar menu
        Then Verify the main title 'Corporate Branding' is displayed correctly
        Then Verify the module page header is 'Admin'
        When set:
            | primaryDefault | secondDefault | primaryFontDefault | secondFontDefault | primaryGradient1Default | primaryGradient2Default |
            | #ff7b1d        | #76bc21       | #ffffff            | #ffffff           | #ff920b                 | #f35c17                 |
        And Generate a random color HEX

    @HappyCases
    Scenario: <No>. Verify color is changed successfully when <action> random color for <colorName>
        When Set color "${randomColor}" for "<colorName>"
        And User click the '<action>' button
        Then Verify color of "<colorName>" in form is equal to "${randomColor}" 
        And <verifyAction>
        When <finalAction>

        Examples:
            | No | action  | colorName                | verifyAction                                                                       | finalAction                                                    |
            | 01 | Publish | Primary Color            | Verify background color of the chevron-left button is equal to "${randomColor}"    | User resets color to default                                   |
            | 02 | Publish | Secondary Color          | Verify background color of the publish button in form is equal to "${randomColor}" | User resets color to default                                   |
            | 03 | Publish | Primary Font Color       | Verify font color of the module page header is equal to "${randomColor}"           | User resets color to default                                   |
            | 04 | Publish | Secondary Font Color     | Verify font color of the publish button in form is equal to "${randomColor}"       | User resets color to default                                   |
            | 05 | Publish | Primary Gradient Color 1 | Verify gradient start color of the topbar header is equal to "${randomColor}"      | User resets color to default                                   |
            | 06 | Publish | Primary Gradient Color 2 | Verify gradient end color of the topbar header is equal to "${randomColor}"        | User resets color to default                                   |
            | 07 | Preview | Primary Color            | Verify background color of the chevron-left button is equal to "${randomColor}"    | Verify colors of system are not changed on successful preview  |
            | 08 | Preview | Secondary Color          | Verify background color of the publish button in form is equal to "${randomColor}" | Verify colors of system are not changed on successful preview  |
            | 09 | Preview | Primary Font Color       | Verify font color of the module page header is equal to "${randomColor}"           | Verify colors of system are not changed on successful preview  |
            | 10 | Preview | Secondary Font Color     | Verify font color of the publish button in form is equal to "${randomColor}"       | Verify colors of system are not changed on successful preview  |
            | 11 | Preview | Primary Gradient Color 1 | Verify gradient start color of the topbar header is equal to "${randomColor}"      | Verify colors of system are not changed on successful preview  |
            | 12 | Preview | Primary Gradient Color 2 | Verify gradient end color of the topbar header is equal to "${randomColor}"        | Verify colors of system are not changed on successful preview  |

    @HappyCases1
    Scenario: <No>. Verify colors are changed successfully when <action> random color for all
        When User click random color for "Primary Color"
        And set "hexPriColor" to "${randomHexColor}"
        And User click random color for "Secondary Color"
        And set "hexSecColor" to "${randomHexColor}"
        And User click random color for "Primary Font Color"
        And set "hexPriFontColor" to "${randomHexColor}"
        And User click random color for "Secondary Font Color"
        And set "hexSecFontColor" to "${randomHexColor}"
        And User click random color for "Primary Gradient Color 1"
        And set "hexPriGradientColor1" to "${randomHexColor}"
        And User click random color for "Primary Gradient Color 2"
        And set "hexPriGradientColor2" to "${randomHexColor}"
        And User click the '<action>' button
        Then Verify color of "Primary Color" in form is equal to "${hexPriColor}" 
        And Verify color of "Secondary Color" in form is equal to "${hexSecColor}" 
        And Verify color of "Primary Font Color" in form is equal to "${hexPriFontColor}" 
        And Verify color of "Secondary Font Color" in form is equal to "${hexSecFontColor}" 
        And Verify color of "Primary Gradient Color 1" in form is equal to "${hexPriGradientColor1}" 
        And Verify color of "Primary Gradient Color 2" in form is equal to "${hexPriGradientColor2}" 
        And Verify background color of the chevron-left button is equal to "${hexPriColor}" 
        And Verify background color of the publish button in form is equal to "${hexSecColor}"
        And Verify font color of the module page header is equal to "${hexPriFontColor}"
        And Verify font color of the publish button in form is equal to "${hexSecFontColor}"
        And Verify gradient start color of the topbar header is equal to "${hexPriGradientColor1}" 
        And Verify gradient end color of the topbar header is equal to "${hexPriGradientColor2}" 
        When <verifyAction>

        Examples:
            | No | action  | colorHEX       | colorName                                                                                                               | primaryColor      | secondaryColor   | primaryFontColor      | secondaryFontColor   | primaryGradientColor1      | primaryGradientColor2      | verifyAction                                                   |
            | 13 | Publish | ${randomColor} | Primary Color,Secondary Color,Primary Font Color,Secondary Font Color,Primary Gradient Color 1,Primary Gradient Color 2 | ${randomColor}    | ${randomColor}   | ${randomColor}        | ${randomColor}       | ${randomColor}             | ${randomColor}             | User resets color to default                                   |                   
            | 14 | Preview | ${randomColor} | Primary Color,Secondary Color,Primary Font Color,Secondary Font Color,Primary Gradient Color 1,Primary Gradient Color 2 | ${randomColor}    | ${randomColor}   | ${randomColor}        | ${randomColor}       | ${randomColor}             | ${randomColor}             | Verify colors of system are not changed on successful preview  |

