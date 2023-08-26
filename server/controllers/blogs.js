const { getUser } = require('../utils/middlewares')
const {
  User,
  Blog,
  Following,
  Tags,
  TagsUsers,
  TagsBlogs,
  Follower,
} = require('../models')
const { Op } = require('sequelize')
const blogsRouter = require('express').Router()

blogsRouter.post('/', getUser, async (req, res, next) => {
  console.log(req.loggedInUser)
  if (('testing from blogs router', req.loggedInUser)) {
    try {
      const { title, description, tagNames } = req.body
      console.log(req.body)

      const blog = await Blog.create({
        title,
        description,
        userId: req.loggedInUser,
      })

      const tags = await Tags.findAll({
        where: { name: { [Op.in]: tagNames } },
      })
      console.log(tags)

      await blog.addTags(tags)

      // console.log('this is happening or no at blog router', blog)
      res.status(201).json(blog)
    } catch (error) {
      console.log(error)
      next(error)
    }
  } else {
    res.status(400).json({ error: 'please login to create a blog' })
  }
})

blogsRouter.post('/:id', getUser, async (req, res) => {
  console.log(req.body)
  const { comment, parentId } = req.body
  if (req.loggedInUser) {
    await Comment.create({
      comment,
      userId: req.loggedInUser,
      blogId: req.params.id,
      parentId,
    })
  } else {
    res.status(400).json({ error: 'please log in to comment' })
  }
  const blog = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        as: 'Comments',
        include: [
          {
            model: Comment,
            as: 'replies',
          },
        ],
      },
    ],
  })
  console.log(blog.toJSON())
  res.status(201).json(blog)
})

blogsRouter.patch('/:id', async (req, res) => {
  const { title, description, category, likes } = req.body
  const blog = await Blog.findByPk(req.params.id, {
    include: {
      model: Comment,
      attributes: { exclude: ['userId', 'blogId'] },
    },
  })

  if (title) {
    blog.title = title
    await blog.save()
  }
  if (description) {
    blog.description = description
    await blog.save()
  }
  if (category) {
    blog.category = category
    await blog.save()
  }
  if (likes) {
    blog.likes = likes
    await blog.save()
  }
  res.status(201).json(blog)
})

// Fetching all the blogs

// blogsRouter.get('/', getUser, async (req, res) => {
//   try {
//     // @todo fix the include on the blog
//     const blogs = await Blog.findAll({
//       include: [
//         {
//           model: User,
//           attributes: {
//             exclude: ['password', 'twitterId', 'confirmed', 'email'],
//           },
//         },
//         {
//           model: Tags,
//         },
//       ],
//     })
//     res.status(200).json(blogs)
//   } catch (err) {
//     console.log(err)
//   }
// })
// for the feed
blogsRouter.get('/:tagId', getUser, async (req, res) => {
  const recommendedBlog = await Blog.findAll({
    include: [
      { model: User },
      { model: Tags, where: { id: req.params.tagId } },
    ],
  })
  res.status(200).json(recommendedBlog)
})

// this is how we can get the post of the followers
blogsRouter.get('/', getUser, async (req, res) => {
  let followersId = []
  console.log(req.loggedInUser)
  const user = await User.findByPk(req.loggedInUser, {
    include: {
      model: Following,
    },
  })
  user.Followings.forEach((follower) => followersId.push(follower.followingId))

  const blogs = await Blog.findAll({
    where: { userId: followersId },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'twitterId', 'confirmed', 'email'],
        },
      },
      { model: Tags },
    ],
  })
  res.status(200).json(blogs)
})

// on getting should we use timestamps or use a date for as a seperate property
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    include: Tags,
  })
  res.status(200).json(blog)
})

module.exports = blogsRouter
