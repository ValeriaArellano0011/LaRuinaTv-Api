const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require('../integrations/postgreSQL');
const { Media } = require("./Media");


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

Media.belongsToMany(Genre, { through: 'MediaGenre' });
Genre.belongsToMany(Media, { through: 'MediaGenre' });

module.exports = { Genre };
