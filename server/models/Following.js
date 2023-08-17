const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Following extends Model {}

Following.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
  }
)

module.exports = Following
