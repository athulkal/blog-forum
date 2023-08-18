const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class TagsBlogs extends Model {}

TagsBlogs.init(
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

module.exports = TagsBlogs
