const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Auth token invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')

  let token = null
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.replace('Bearer ', '')
  }

  request.body = { token: token, ...request.body }

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}