const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { User } = require('./User.js');
const bcrypt = require("bcrypt");


const Likes = sequelize.define('likes', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => bcrypt.hashSync(Math.random().toString(), 10).replace(/\//g, ''),
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
