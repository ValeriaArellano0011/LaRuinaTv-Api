const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { Likes } = require('./Likes.js')

const Media = sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
     type: DataTypes.STRING,
     allowNull: false
    }
})

Likes.hasMany(Media, { foreignKey: 'playlistId' });

module.exports = { Media }