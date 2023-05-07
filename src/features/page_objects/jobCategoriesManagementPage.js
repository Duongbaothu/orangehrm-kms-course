const keywords = require('./keywords');
const common = require('./common');

const txtName = `//form/div/div/div/input[contains(@class, 'oxd-input oxd-input--active')]`;

module.exports = {

    /**
     * Input the Job Category name at the Name textbox
     * @author Nguyet Duong
     * @param {string} name The Job Category name
     */
    async typeEmploymentStatusName(name) {
        const value = await common.getVariableValue(name, this);
        await keywords.setText.call(this, txtName, value);
    },
};
