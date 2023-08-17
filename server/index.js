const app = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
