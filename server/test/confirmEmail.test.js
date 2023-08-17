const redis = require('../utils/redis')
const { User } = require('../models')
const createConfirmLink = require('../utils/createConfirm')
const supertest = require('supertest')
const app = require('../app')
const { sequelize } = require('../utils/db')

const api = supertest(app)
let userId
const url = 'http://localhost:3001'

beforeAll(async () => {
  await User.sync({ force: true })
  const user = await User.create({
    email: 'bob@example.com',
    password: 'wdasdaj12eqwkql',
  })

  userId = user.id
})

describe('testing the email confirmation status', () => {
  test('testing createConfirmLink works as expected', async () => {
    const result = await createConfirmLink(url, userId, redis)
    expect(result).toMatch('http://localhost:3001/confirm')
  })
  test('testing if the data is cached in redis', async () => {
    const result = await createConfirmLink(url, userId, redis)
    const chunks = result.split('/')
    const key = chunks[chunks.length - 1]
    const idUser = await redis.get(key)
    expect(idUser).toBeDefined()
  })
  //prettier-ignore
  test('testing if the user\'s confirmed status is updated', async () => {
    const result = await createConfirmLink(url, userId, redis)
    const chunks = result.split('/')
    const id = chunks[chunks.length - 1]
    const response = await api
      .get(`/confirm/${id}`)
      .send({ confirmed: true })
      .expect(200)
    expect(response.body.confirmed).toBeTruthy()
  })
  test('if the ID is invalid the server responds with an error', async () => {
    const id = 'xyz'
    const response = await api.get(`/confirm/${id}`).expect(400)
    expect(response.body.error).toEqual('Invalid ID')
  })
})

afterAll(async () => {
  await sequelize.close()
})

// write down how the test is supposed to work

// 1. we need to create a user in the db
// 2. we need to go to the send the email link by passing a mock host and userId
// and a redis connection
// 3. we check if the function returns a url
// 4. we check if the data is cached in redis
// 5. we check if the user's confirmed status changed to true once we hit that route
// 6. we check if it responds with an error if the id is invalid
