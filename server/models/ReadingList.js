const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../utils/db')
const { v4: uuidv4 } = require('uuid')

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (blog) => {
        blog.id = uuidv4()
      },
    },
  }
)

module.exports = ReadingList
