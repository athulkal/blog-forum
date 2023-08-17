const supertest = require('supertest')
const app = require('../app')
const { User } = require('../models')
const createForgotPassword = require('../utils/createForgotPassword')
const { sequelize } = require('../utils/db')
const redis = require('../utils/redis')

const api = supertest(app)

let userId
const url = 'http://localhost:3001'
const userObject = {
  email: 'example@example.com',
  password: 'tesingadsad',
}

beforeEach(async () => {
  await User.sync({ force: true })
  const user = await User.create(userObject)
  userId = user.id
})

describe('testing the forgot password functionality', () => {
  test('testing forgot password link works as expected', async () => {
    const result = await createForgotPassword(url, userId, redis)
    expect(result).toMatch('http://localhost:3001/resetPassword')
  })
  test('testing if the data is cached in redis', async () => {
    const result = await createForgotPassword(url, userId, redis)
    const chunks = result.split('/')
    const key = chunks[chunks.length - 1]
    const id = await redis.get(key)
    expect(id).toBeDefined()
  })
  test('testing if the user password is updated', async () => {
    const result = await createForgotPassword(url, userId, redis)
    const chunks = result.split('/')
    const id = chunks[chunks.length - 1]
    const response = await api
      .post(`/resetPassword/${id}`)
      .send({ password: 'newpassword' })
      .expect(200)
    expect(response.body.message).toEqual('password updated succesfully')
  })
})

afterAll(async () => {
  await sequelize.close()
})
