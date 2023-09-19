const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { Media } = require('./Media.js');

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Media.belongsToMany(Category, { through: 'MediaCategory' });
Category.belongsToMany(Media, { through: 'MediaCategory' });

module.exports = { Category };
