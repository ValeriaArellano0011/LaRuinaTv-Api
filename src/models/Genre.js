const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const bcrypt = require("bcrypt");

const Genre = sequelize.define('genre', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = { Genre };
