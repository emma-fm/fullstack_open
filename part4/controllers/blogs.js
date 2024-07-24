const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  return response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndDelete(id)

  return response.status(204).json(result)
})

module.exports = blogsRouter