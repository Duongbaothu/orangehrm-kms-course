const common = require('./common');

module.exports = {
    /**
    * Go to the Employee List Page
    * @author Nhu Ho
    */
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'PIM');
        await common.verifyTheMainTitleIsDisplayed.call(this, 'Employee Information');
    },
};
