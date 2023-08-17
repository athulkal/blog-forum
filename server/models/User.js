const { DataTypes, Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twitterId: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        const salt = 10
        user.id = uuidv4()
        if (user.password) {
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10)
        }
      },
    },
  }
)

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User
