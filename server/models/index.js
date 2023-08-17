const User = require('./User')
const Blog = require('./Blog')
const Follower = require('./Follower')
const Following = require('./Following')
const Comment = require('./Comment')
const Profile = require('./Profile')
const ReadingList = require('./ReadingList')

User.hasMany(Blog)
Blog.belongsTo(User)
User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Follower, { foreignKey: 'userId' })
User.hasMany(Following, { foreignKey: 'userId' })

User.hasMany(Comment)
Comment.belongsTo(User)
Blog.hasMany(Comment)
Comment.belongsTo(Blog)
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'replies' })
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' })

ReadingList.hasMany(Blog)
ReadingList.belongsTo(User)

User.sync({ alter: true })
Blog.sync({ alter: true })
Follower.sync({ alter: true })
Comment.sync({ alter: true })
Following.sync({ alter: true })
Profile.sync({ alter: true })
ReadingList.sync({ alter: true })

module.exports = {
  User,
  Blog,
  Follower,
  Following,
  Comment,
  Profile,
}
