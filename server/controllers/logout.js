const logout = require('express').Router()

logout.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('there is an error', err)
    }
  })
  res.status(200).end()
})

module.exports = logout
