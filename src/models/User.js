const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const bcrypt = require("bcrypt");

const User = sequelize.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => bcrypt.hashSync(Math.random().toString(), 10).replace(/\//g, ''),
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  googlePic:{
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = { User };
