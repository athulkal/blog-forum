const resetPassword = require('express').Router()
const { User } = require('../models')
const redis = require('../utils/redis')

resetPassword.post('/:id', async (req, res) => {
  const key = req.params.id
  const userId = await redis.get(key)
  console.log('userID', userId)
  const user = await User.findByPk(userId)
  await user.update({ password: req.body.password })
  res.status(200).json({ message: 'password updated succesfully' })
})

module.exports = resetPassword
