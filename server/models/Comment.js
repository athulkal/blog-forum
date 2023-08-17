const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const { v4: uuidv4 } = require('uuid')

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    hooks: {
      beforeCreate: (comment) => {
        comment.id = uuidv4()
      },
    },
  }
)

module.exports = Comment
