const supertest = require('supertest')
const app = require('../app')
const { Blog, User } = require('../models')
const api = supertest(app)

//dummy user object
const userObject = {
  email: 'example@example.com',
  password: 'tesingadsad',
  confirmed: true,
}

let userId
// dummy data for creating a blog
const blogData = {
  title: 'title',
  description: 'hello world',
  category: ['testing'],
}
//user for loggin in
const loggedInUser = { email: 'example@example.com', password: 'tesingadsad' }

beforeEach(async () => {
  await Blog.sync({ force: true })
  await User.sync({ force: true })
  const user = await User.create(userObject)
  userId = user.id
})

describe('on creating a blog', () => {
  test('if there is no logged in user gives back an error', async () => {
    const response = await api.post('/api/blogs').send(blogData).expect(400)
    expect(response.body.error).toContain('please login to create a blog')
  })

  //@todo fix this test getting different error expected to be blog title but getting login error

  test('if there is no title provided gives back an error', async () => {
    const testBlog = { description: 'hello world', category: ['testing'] }
    const result = await api.post('/login').send(loggedInUser).expect(200)
    console.log(result.headers['set-cookie'].pop().split(';')[0])
    // currently the user is not being assigned to the session cookie

    const req = {
      session: {
        cookie: {
          path: '/',
          _expires: '2023-08-02T00:55:50.981Z',
          originalMaxAge: 604800000,
          httpOnly: true,
          secure: false,
        },
        userId,
      },
    }
    const next = jest.fn()
    const getUser = jest.fn(req, next)
    const response = await api
      .post('/api/blogs', getUser(req, next))
      .send(testBlog)
      .expect(400)
    expect(response.body.error).toEqual('Please give the blog a title')
  })
})
