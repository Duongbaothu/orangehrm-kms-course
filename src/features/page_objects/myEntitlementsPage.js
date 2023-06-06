const common = require('./common');

module.exports = {
    /**
    * Go to the My Entitlements Page
    * @author Nhu Ho
    */
    async gotoPage() {
        await common.clickMainMenuItem.call(this, 'Leave');
        await common.selectDropdownMenuItemByText.call(this, 'Entitlements', 'My Entitlements');
    },
};
