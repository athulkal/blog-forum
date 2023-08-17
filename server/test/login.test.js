const app = require('../app')
const supertest = require('supertest')
const { User } = require('../models')
const { sequelize } = require('../utils/db')

const api = supertest(app)

beforeEach(async () => {
  await User.sync({ force: true })
  await User.create({
    email: 'bob@example.com',
    password: 'wdasdaj12eqwkql',
  })
})

describe('testing the login functionality', () => {
  test('sends a back an error with invalid email', async () => {
    const testUser = { email: 'invalid@example.com', password: 'fake' }
    const result = await api.post('/login').send(testUser).expect(400)
    expect(result.body.error).toEqual('Please enter valid credentials')
  })
  test('sends back an error if email is not confirmed', async () => {
    const testUser = { email: 'bob@example.com', password: 'wdasdaj12eqwkql' }
    const result = await api.post('/login').send(testUser).expect(400)
    expect(result.body.error).toEqual('Please confirm your email')
  })
  test('sends back an error if password is incorrect', async () => {
    const testUser = { email: 'bob@example.com', password: 'wdasdajasdad' }
    const user = await User.findOne({ where: { email: testUser.email } })
    await user.update({ confirmed: true })
    const result = await api.post('/login').send(testUser).expect(400)
    expect(result.body.error).toEqual('Please enter valid credentials')
  })
  test('if password and email is correct and email is confirmed returns 200', async () => {
    const testUser = { email: 'bob@example.com', password: 'wdasdaj12eqwkql' }
    const user = await User.findOne({ where: { email: testUser.email } })
    await user.update({ confirmed: true })
    const result = await api.post('/login').send(testUser).expect(200)
    expect(result.headers['set-cookie'][0]).toMatch(/zid=s%3/)
  })
})

afterAll(async () => {
  await sequelize.close()
})
