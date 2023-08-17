const confirmation = require('express').Router()
const redis = require('../utils/redis')
const { User } = require('../models')

confirmation.get('/:id', async (req, res) => {
  try {
    console.log('what is happening here ? ')
    const id = req.params.id
    const userId = await redis.get(id)
    const user = await User.findByPk(userId)
    await user.update({ confirmed: true })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' })
  }
})

module.exports = confirmation
