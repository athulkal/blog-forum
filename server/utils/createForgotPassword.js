const { v4: uuidv4 } = require('uuid')

const createForgotPassword = async (url, userId, redis) => {
  const id = uuidv4()
  console.log('this is coming from create confirm ', id)
  await redis.set(id, userId, 'ex', 60 * 20)
  return `${url}/resetPassword/${id}`
}

module.exports = createForgotPassword
