const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const { v4: uuidv4 } = require('uuid')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date.now()),
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'blogs',
    hooks: {
      beforeCreate: (blog) => {
        blog.id = uuidv4()
      },
    },
  }
)

module.exports = Blog
