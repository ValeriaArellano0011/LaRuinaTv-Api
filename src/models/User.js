const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');

const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alias: {
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    googlePic:{
      type: DataTypes.STRING,
      allowNull: true,
    }
});

module.exports = { User };
