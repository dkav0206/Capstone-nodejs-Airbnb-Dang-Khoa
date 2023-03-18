const {Sequelize} = require("sequelize");
const config = require('../config/index');

const sequelize = new Sequelize(config.database, "root", config.passWord, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
});

module.exports = sequelize;
