const { v4: uuidv4 } = require('uuid')

const createConfirmLink = async (url, userId, redis) => {
  const id = uuidv4()
  console.log('this is coming from create confirm ', id)
  await redis.set(id, userId, 'ex', 60 * 60 * 24)
  return `${url}/confirm/${id}`
}

module.exports = createConfirmLink
