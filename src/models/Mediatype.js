const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { Media } = require("./Media");


const Mediatype = sequelize.define('mediatype', {
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

Media.belongsToMany(Mediatype, { through: 'MediaMediatype' });
Mediatype.belongsToMany(Media, { through: 'MediaMediatype' });

module.exports = { Mediatype };
