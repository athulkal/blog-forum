const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    followerId: {
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
  }
)

module.exports = Follower
