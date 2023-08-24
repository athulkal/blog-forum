const User = require('./User')
const Blog = require('./Blog')
const Follower = require('./Follower')
const Following = require('./Following')
const Comment = require('./Comment')
const Profile = require('./Profile')
const Tags = require('./Tags')
const TagsUsers = require('./TagsUsers')
const TagsBlogs = require('./TagsBlogs')
const ReadingList = require('./ReadingList')

// a user can have many blogs
User.hasMany(Blog)
// a blog belongs to a user
Blog.belongsTo(User)
// a user can have only a single profile
User.hasOne(Profile)
Profile.belongsTo(User)

// a user can follow many people and be followed by many people
User.hasMany(Follower, { foreignKey: 'userId' })
User.hasMany(Following, { foreignKey: 'userId' })

// user can post comments on different blogs
User.hasMany(Comment)
// each comment is owned by the person who posts it
Comment.belongsTo(User)
// a blog can have multiple comments
Blog.hasMany(Comment)
// all comments to a certain blog
Comment.belongsTo(Blog)
// a comment can have many comments as children we are calling them replies
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies' })
// and all replies belong to a parent comment
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' })

/*
example for tags 
user may like to read blogs on the topic -> node js , javascript, web development , typescript
similarly a blog maybe belong to different topics -> a blog about react may have tags like javascript,react,web development
all of these tags belong respectively to users and blogs based on what the user chooses the topics to be
*/

// user can like different contents that are in different category
User.belongsToMany(Tags, { through: TagsUsers })
// and each tags belongs  to many users
Tags.belongsToMany(User, { through: TagsUsers })
// a blog can have many tags
Blog.belongsToMany(Tags, { through: TagsBlogs })
// and tags belong to many blogs
Tags.belongsToMany(Blog, { through: TagsBlogs })

// a reading list include many blogs
ReadingList.hasMany(Blog)
// a user can create only one reading list in this implementation
ReadingList.belongsTo(User)

User.sync({ alter: true })
Blog.sync({ alter: true })
Follower.sync({ alter: true })
Comment.sync({ alter: true })
Following.sync({ alter: true })
Profile.sync({ alter: true })
ReadingList.sync({ alter: true })
Tags.sync({ alter: true })
TagsBlogs.sync({ alter: true })
TagsUsers.sync({ alter: true })

module.exports = {
  User,
  Blog,
  Follower,
  Following,
  Comment,
  Profile,
  Tags,
  ReadingList,
  TagsUsers,
  TagsBlogs,
}
