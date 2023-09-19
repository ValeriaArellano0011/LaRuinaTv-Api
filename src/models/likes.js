const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { User } = require('./User.js');
const bcrypt = require("bcrypt");


const Likes = sequelize.define('likes', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
    urlId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
})

Likes.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Likes, { foreignKey: 'userId' });

module.exports = { Likes };
