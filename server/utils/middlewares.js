const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    //@todo our login test will fail if we change this so fix that
    if (err.errors[0].message === 'blogs.title cannot be null') {
      res.status(400).json({ error: 'Please give the blog a title' })
    } else if (err.errors[0].message === 'blogs.description cannot be null') {
      res.status(400).json({ error: 'Please give the blog a description' })
    } else if (err.errors[0].message === 'blogs.category cannot be null') {
      res.status(400).json({
        error: 'Please describe which category the blog can characterized',
      })
    } else if (err.errors[0].message === 'Validation isEmail on email failed') {
      res.status(400).json({ error: 'Please enter a valid email' })
    } else if (err.errors[0].message === 'users.name cannot be null') {
      res.status(400).json({ error: 'Please provide your name' })
    }
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ error: 'Email already exists please login' })
  }
  next()
}

const getUser = async (req, res, next) => {
  console.log('where is this log ?', req.session)
  if (req.session.userId) {
    req.loggedInUser = req.session.userId
  }
  next()
}

module.exports = { errorHandler, getUser }
