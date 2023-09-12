const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
