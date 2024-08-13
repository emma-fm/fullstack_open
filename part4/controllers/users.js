const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  let user = new User(request.body)

  if (user.password.length < 3) {
    return response.status(400).json({ error: 'Password length too short' })
  }

  const saltRounds = 10

  user.password = await bcrypt.hash(user.password, saltRounds)

  const result = await user.save()

  return response.status(201).json(result)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  return response.json(users)
})

module.exports = usersRouter