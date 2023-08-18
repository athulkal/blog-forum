const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const { v4: uuidv4 } = require('uuid')

class Tags extends Model {}

Tags.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (tag) => {
        tag.id = uuidv4()
      },
    },
  }
)

module.exports = Tags
