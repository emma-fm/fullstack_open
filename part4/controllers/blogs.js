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