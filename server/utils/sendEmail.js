const nodemailer = require('nodemailer')
const {
  MAILTRAP_HOST,
  MAILTRAP_PORT,
  MAILTRAP_USERNAME,
  MAILTRAP_PASSWORD,
} = require('./config')

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USERNAME,
    pass: MAILTRAP_PASSWORD,
  },
})

const sendEmail = async (reciever, link) => {
  try {
    const info = await transporter.sendMail({
      from: '"Athul kallungal " athul@adminblogforum.com ',
      to: reciever,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: `
      <div>
      <h1>Hello, welcome to the blog forum. </h1>
      <p>Please verify your email using this link<p>
      <a href= ${link}> confirm link </a>
      <div>
      `,
    })
    console.log('Message sent: %s', info.messageId)
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendEmail
