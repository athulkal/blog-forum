const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class TagsUsers extends Model {}

TagsUsers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
  }
)

module.exports = TagsUsers
