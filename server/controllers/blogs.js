const { getUser } = require('../utils/middlewares')
const { Blog, Comment, Tags } = require('../models')
const blogsRouter = require('express').Router()

blogsRouter.post('/', getUser, async (req, res, next) => {
  console.log(req.loggedInUser)
  if (('testing from blogs router', req.loggedInUser)) {
    try {
      const { title, description, Tags } = req.body
      console.log(req.body)
      const blog = await Blog.create({
        title,
        description,
        userId: req.loggedInUser,
        Tags: [
          {
            name: Tags,
          },
        ],
      })
      console.log('this is happening or no at blog router', blog)
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

blogsRouter.get('/', async (req, res) => {
  try {
    // @todo fix the include on the blog
    const blogs = await Blog.findAll({
      include: {
        model: Comment,
        nested: true,
        attributes: { exclude: ['password'] },
      },
    })
    res.status(200).json(blogs)
  } catch (err) {
    console.log(err)
  }
})

// on getting should we use timestamps or use a date for as a seperate property
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id, {
    include: Tags,
  })
  /// we need to do a recursive query to get the hierarchial comment structure
  res.status(200).json(blog)
})

module.exports = blogsRouter
