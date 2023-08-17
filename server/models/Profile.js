const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../utils/db')
const { v4: uuidv4 } = require('uuid')

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profilePhoto: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (profile) => {
        profile.id = uuidv4()
      },
    },
  }
)
module.exports = Profile
