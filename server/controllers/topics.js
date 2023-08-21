const tagsRouter = require('express').Router()
const { Tags } = require('../models')

tagsRouter.get('/', async (req, res) => {
  try {
    const AllTags = await Tags.findAll()
    res.status(200).json(AllTags)
  } catch (err) {
    console.log(err)
  }
})

tagsRouter.post('/', async (req, res) => {
  try {
    // if we are taking an array => tagNames = ["js","web dev"]
    const { tagNames } = req.body
    let tagInstances = []

    tagNames.forEach((tag) => {
      tagInstances.push({ name: tag })
    })

    // for (let tag of tagNames) {
    //   console.log(tag)
    //   tagInstances.push({ name: tag })
    // }

    const tags = await Tags.bulkCreate(tagInstances)
    res.status(201).json(tags)
  } catch (err) {
    console.log(err)
  }
})

module.exports = tagsRouter
