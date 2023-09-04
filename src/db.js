const { Sequelize } = require("sequelize");
const { postgresString } = require("./config");

const sequelize = new Sequelize(
  postgresString,
  {
    logging: false,
    native: false,
  }
);

module.exports = { sequelize };
