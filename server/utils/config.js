require('dotenv').config()

module.exports = {
  DATABASE_URL:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  PORT: process.env.PORT,
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
  MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_PASSWORD: process.env.DB_PASSWORD,
}
