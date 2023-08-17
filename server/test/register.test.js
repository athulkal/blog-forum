const supertest = require('supertest')
const { User } = require('../models')
const { sequelize } = require('../utils/db')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.sync({ force: true })
}, 10000)

describe('on creating a user', () => {
  test('a user can be created ', async () => {
    const newUser = { email: 'test12@example.com', password: 'password' }
    const result = await api.post('/api/users').send(newUser).expect(201)
    expect(result.body.email).toContain('test12@example.com')
  }, 100000)
  test('produces an error if email is invalid', async () => {
    const newUser = { email: 'tony', password: 'password' }
    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toContain('Please enter a valid email')
  })
  test('if email is not unique', async () => {
    const firstUser = { email: 'tony@example.com', password: 'password' }
    const secondUser = { email: 'tony@example.com', password: 'password' }
    await api.post('/api/users').send(firstUser)
    const result = await api.post('/api/users').send(secondUser).expect(400)
    expect(result.body.error).toContain('Email already taken')
  })
})

afterAll(async () => {
  await sequelize.close()
})
