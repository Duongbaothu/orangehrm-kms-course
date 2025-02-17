require('dotenv').config();
module.exports = {
    TIMEOUT_SHORT: 3000,
    TIMEOUT_MEDIUM: 50000,
    TIMEOUT_LONG: 100000,
    BASE_URL: 'http://localhost:8200',
    ADMIN_USERNAME: process.env.HRM_USERNAME_ADMIN,
    ADMIN_PASSWORD: process.env.HRM_PASSWORD_ADMIN,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    ESS_USERNAME: process.env.HRM_USERNAME_ESS,
    ESS_PASSWORD: process.env.HRM_PASSWORD_ESS,
};
