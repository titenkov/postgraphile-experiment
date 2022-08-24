require('dotenv').config()

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const { checkJwt, handleAuthExceptions } = require('./auth')
const notifications = require('./routes/notifications')
const health = require('./routes/health');

const { AUTH_TYPE } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

if ('jwt' === AUTH_TYPE) {
  // Apply JWT verification and error handling to the graphql endpoint
  app.use('/api/graphql', checkJwt);
  app.use('/api/graphql', handleAuthExceptions);
}

app.use('/api/notifications', notifications)
app.use('/health', health);

module.exports = app
