const express = require('express')
const config = require('./utils/config')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected successfully to MongoDB')
  })
  .catch(error => {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)

module.exports = app