const login = require('express').Router()

const { User, Profile } = require('../models')

login.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email: email },
    })
    console.log(user)
    if (!user) {
      res.status(400).json({ error: 'Please enter valid credentials' })
    }
    if (!user.confirmed) {
      res.status(400).json({ error: 'Please confirm your email' })
    }
    const correctPassword = await user.validPassword(password)
    if (correctPassword) {
      req.session.userId = user.id
      const loggedInUser = await User.findOne({
        where: { email: email },
        attributes: { exclude: ['password,twitterId'] },
        include: {
          model: Profile,
        },
      })
      res.status(200).json(loggedInUser)
    } else {
      res.status(400).json({ error: 'Please enter valid credentials' })
    }
  } catch (err) {
    next(err)
    console.log(err)
  }
})

module.exports = login
