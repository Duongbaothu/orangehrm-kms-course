const { When } = require('@cucumber/cucumber');
const addEmployeePage = require('../page_objects/addEmployeePage');

When('A user go to Add Employee page', addEmployeePage.gotoPage);

When('A user create new employee with information {string}, {string} and account {string} from json file successfully', addEmployeePage.addNewEmployee);
