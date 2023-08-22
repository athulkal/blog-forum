const userController = require('express').Router()
const { User, Follower, Following, Profile, Tags } = require('../models')
const createConfirmLink = require('../utils/createConfirm')
const { getUser } = require('../utils/middlewares')
const redis = require('../utils/redis')
const sendEmail = require('../utils/sendEmail')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const { Op } = require('sequelize')

// setting up store for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.resolve(__dirname, '..', 'images')
    console.log(destinationPath)
    cb(null, destinationPath)
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
// setting up multer middleware
const upload = multer({ storage: storage })

// route for getting all users
userController.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Following,
        },
        {
          model: Follower,
        },
      ],
    })
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
})
// getting logged in user
userController.get('/loggedInUser', getUser, async (req, res) => {
  console.log(req.loggedInUser)
  if (req.loggedInUser) {
    const user = await User.findByPk(req.loggedInUser, {
      attributes: { exclude: ['password,twitterId', 'confirmed'] },
      include: {
        model: Profile,
      },
    })
    res.status(200).json(user)
  } else {
    res.status(400).json({ error: 'Please login' })
  }
})

// registration of a user
userController.post('/', async (req, res, next) => {
  const { email, password, name } = req.body
  if (email && password && name) {
    try {
      const user = await User.create({
        email,
        password,
        name,
      })
      // create a profile for the user
      await Profile.create({ userId: user.id })
      // @todo check how to get host and port from express
      const url = `${req.hostname}:${process.env.PORT}`
      await sendEmail(user.email, await createConfirmLink(url, user.id, redis))
      res.status(201).json(user)
    } catch (err) {
      next(err)
      console.log(err)
    }
  } else if (!name && !email && !password) {
    res.status(400).json({ error: 'please provide all the fields' })
  } else if (!password) {
    res.status(400).json({ error: 'please provide password' })
  } else if (!email) {
    res.status(400).json({ error: 'please provide email' })
  } else if (!name) {
    res.status(400).json({ error: 'please tell us your name ' })
  }
})

userController.get('/:id', getUser, async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: {
      all: true,
    },
  })
  res.status(200).json(user)
})
/// Adding selected topics to the User
userController.patch('/:id', async (req, res) => {
  const { tags } = req.body
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: [{ model: Profile }, { model: Tags }],
  })

  const findTags = await Tags.findAll({ where: { name: { [Op.in]: tags } } })
  await user.addTags(findTags)
  console.log(findTags)
  res.status(201).json(user)
})

// user profile bio edit
userController.patch(
  '/:id/profile',
  upload.single('image'),
  async (req, res) => {
    console.log('does it reach here?')
    const { bio } = req.body
    const userProfile = await Profile.findOne({
      where: { userId: req.params.id },
    })
    if (bio) {
      userProfile.bio = bio
    }

    if (req.file) {
      console.log(req.file)
      userProfile.profilePhoto = fs.readFileSync(req.file.path)
      fs.writeFileSync(
        path.resolve(__dirname, '..', `images/${req.file.originalname}`),
        userProfile.profilePhoto
      )
    }
    await userProfile.save()
    res.status(201).json(userProfile)
  }
)

// user following
userController.post('/:id', getUser, async (req, res) => {
  let isFollowing
  // getting the user to follow from the req.params
  const followingUser = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: {
      all: true,
    },
  })

  // loggged in is cris
  const loggedUser = await User.findByPk(req.loggedInUser, {
    attributes: { exclude: ['password'] },
    include: {
      all: true,
    },
  })

  console.log('logged in user', loggedUser.toJSON())

  // checking if athul is already is in her following
  loggedUser.Followings.forEach((user) => {
    if (user.followingId === followingUser.id) {
      isFollowing = true
    } else {
      isFollowing = false
    }
  })
  // if not add him
  /* when the logged in User press the follow button 
        we create a following for the logged in user  
        at the same time we add the follower 
        for the user that was followed by the logged in user
    */
  if (!isFollowing) {
    const following = await Following.create({
      userId: req.loggedInUser,
      name: followingUser.name,
      followingId: followingUser.id,
    })
    const follower = await Follower.create({
      userId: req.params.id,
      name: loggedUser.name,
      followerId: loggedUser.id,
    })
    res.status(201).json(following)
  } else {
    res
      .status(400)
      .json({ error: `you are already following ${followingUser.name}` })
  }
})

userController.get('/:id/profile', async (req, res) => {
  const userProfile = await Profile.findOne({
    where: { user_id: req.params.id },
  })
  res.status(200).json(userProfile)
})

// we need to clean up this solution

userController.delete('/:id', getUser, async (req, res) => {
  let isFollowing
  // cris
  const loggedUser = await User.findByPk(req.loggedInUser, {
    attributes: { exclude: ['password'] },
    include: {
      all: true,
    },
  })
  // athul
  const followingUser = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
    include: {
      all: true,
      attributes: { exclude: ['password'] },
    },
  })
  // checking if athul exist in cris's following
  loggedUser.Followings.forEach((user) => {
    if (user.name === followingUser.name) {
      isFollowing = true
    } else {
      isFollowing = false
    }
  })
  // if so cris wanna unfollow
  if (isFollowing) {
    await Following.destroy({ where: { followingId: followingUser.id } })
    res.status(204).end()
    await Follower.destroy({ where: { followerId: loggedUser.id } })
  } else {
    res.status(400).end()
  }
})

module.exports = userController
