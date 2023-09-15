const { DataTypes } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { Likes } = require('./Likes.js');
const bcrypt = require("bcrypt");

const Media = sequelize.define('media', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => bcrypt.hashSync(Math.random().toString(), 10).replace(/\//g, ''),
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idLinkYT: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idLinkSPOTY: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idLinkDRIVE: {
        type: DataTypes.STRING,
        allowNull: true
    },
    urlLinkWEB: {
        type: DataTypes.STRING,
        allowNull: true
    },
    urlLinkDOWNLOAD: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageVisor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageSlider: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Likes.hasMany(Media, { foreignKey: 'mediaId' });

module.exports = { Media };