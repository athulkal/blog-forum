const { DataTypes } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('blogs', {
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
      category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('blogs')
  },
}
