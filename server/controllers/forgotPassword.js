const forgotPassword = require('express').Router()
const { User } = require('../models')
const createForgotPassword = require('../utils/createForgotPassword')
const redis = require('../utils/redis')
const sendEmail = require('../utils/sendEmail')

forgotPassword.post('/', async (req, res) => {
  try {
    const { email } = req.body
    const url = `${req.hostname}:${process.env.PORT}`
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (req.session) {
      req.session.destroy()
    }
    await sendEmail(user.email, await createForgotPassword(url, user.id, redis))
    res.status(200).json({ message: 'Reset password link sent' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = forgotPassword
