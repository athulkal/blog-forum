const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connection = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the DB')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = { connection, sequelize }
