const express = require('express')
const { connection } = require('./utils/db')
const cors = require('cors')
const { errorHandler } = require('./utils/middlewares')
const userController = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const confirmationRouter = require('./controllers/confirmation')
const forgotPasswordRouter = require('./controllers/forgotPassword')
const resetPasswordRouter = require('./controllers/resetPassword')
const session = require('express-session')
const { SESSION_SECRET } = require('./utils/config')
const RedisStore = require('connect-redis').default
const redis = require('./utils/redis')
const { Op } = require('sequelize')
const passport = require('passport')
const { User } = require('./models')
const { Strategy } = require('passport-twitter')
const blogsRouter = require('./controllers/blogs')
const rateLimit = require('express-rate-limit')
const path = require('path')
const tagsRouter = require('./controllers/topics')

const app = express()
connection()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

const redisStore = new RedisStore({
  client: redis,
})

app.use(express.static(path.join(__dirname, 'images')))
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
// app.use(limiter)

app.use(
  session({
    store: redisStore,
    name: 'zid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
)

// twitter Oauth
passport.use(
  new Strategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3001/auth/twitter/callback',
      includeEmail: true,
    },
    async (_, __, profile, cb) => {
      console.log('twitter profile =>>>> ', profile)
      const { id, emails, displayName } = profile
      let email
      if (emails) {
        // getting the email from twitter
        email = emails[0].value
      }
      //searching if user already exist in the DB
      let user = await User.findOne({
        where: {
          [Op.or]: [{ twitterId: id }, { email }],
        },
      })
      // if no user exists we create a new user
      if (!user) {
        user = await User.create({
          name: displayName,
          twitterId: id,
          email,
        })
        // if no twitterId then the user must be found by email here we basically just update twiiterID
      } else if (!user.twitterId) {
        user.twitterId = id
        await user.save()
      }
      // on success we pass in our user's id
      return cb(null, { id: user.id })
    }
  )
)

app.use(passport.initialize())

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  function (req, res) {
    console.log('this is from our beloved twitter Oauth', req.user.id)
    req.session.userId = req.user.id
    res.redirect('/')
  }
)

app.use('/api/users', userController)
app.use('/confirm', confirmationRouter)
app.use('/forgotPassword', forgotPasswordRouter)
app.use('/resetPassword', resetPasswordRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/tags', tagsRouter)

app.use(errorHandler)

module.exports = app
