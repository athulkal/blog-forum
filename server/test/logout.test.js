const supertest = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { sequelize } = require('../utils/db')

const api = supertest(app)
const testUser = {
  email: 'bob@example.com',
  password: 'wdasdaj12eqwkql',
  confirmed: true,
}

beforeEach(async () => {
  await User.sync({ force: true })
  await User.create(testUser)
  await api.post('/logout').send(testUser)
})

//1. checking if the header has no cookies

test('testing the logout functionality', async () => {
  const result = await api.get('/logout').expect(200)
  expect(result.header['set-cookie']).toBeUndefined()
})

afterAll(async () => {
  await sequelize.close()
})
