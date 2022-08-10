require('dotenv').config()

const app = require('./app')
const postgraphile = require('./postgraphile')

const { PORT } = process.env

app.use(postgraphile);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
})
