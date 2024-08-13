const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  return response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user)

  const blog = new Blog({ user: user.id, ...request.body })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id
  const result = await Blog.findById(id)

  if (!result) {
    return response.status(204).json(result)
  }

  if (result.user.toString() !== request.user.toString()) {
    return response.status(401).json({ error: 'Unauthorized operation' })
  }

  await Blog.findByIdAndDelete(id)

  return response.status(204).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.name,
    author: body.number,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog
    .findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })

  if (result) {
    return response.status(200).json(result)
  }
  else {
    return response.status(204).send()
  }

})

module.exports = blogsRouter