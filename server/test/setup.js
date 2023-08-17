const { connection } = require('../utils/db')

const setup = async () => {
  await connection()
  console.log('test db connected')
}

module.exports = setup
