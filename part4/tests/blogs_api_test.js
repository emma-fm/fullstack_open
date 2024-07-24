const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    'title': 'Amazing Amazons',
    'author': 'Eliza Biggs',
    'url': 'http://amazingamazons.ru',
    'likes': 768
  },
  {
    'title': 'Computer Science Weekly',
    'author': 'Annabella Smith',
    'url': 'http://compsciweekly.com',
    'likes': 1341
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('get expect number of blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id property correctly named', async () => {
  const response = await api.get('/api/blogs')

  assert.notEqual(response.body[0].id, undefined)
})

after(async () => {
  await mongoose.connection.close()
})