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
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id property correctly named', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.notEqual(response.body[0].id, undefined)
})

test('verify POST creates a new blog', async () => {
  const newBlog = {
    'title': 'POST blog',
    'author': 'Rick Rickards',
    'url': 'http://postblog.us',
    'likes': 7
  }

  let response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.title, newBlog.title)
  assert.strictEqual(response.body.author, newBlog.author)
  assert.strictEqual(response.body.url, newBlog.url)
  assert.strictEqual(response.body.likes, newBlog.likes)

  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('default likes is 0', async () => {
  const newBlog = {
    'title': 'POST blog',
    'author': 'Rick Rickards',
    'url': 'http://postblog.us'
  }

  let response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('missing title results in bad request', async () => {
  const newBlog = {
    'author': 'Rick Rickards',
    'url': 'http://postblog.us',
    'likes': 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('missing url results in bad request', async () => {
  const newBlog = {
    'title': 'POST blog',
    'author': 'Rick Rickards',
    'likes': 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})