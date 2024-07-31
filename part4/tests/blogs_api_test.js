const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is blogs saved', () => {
  test('get expect number of blogs', async () => {
    const inDb = await helper.blogsInDB()

    assert.strictEqual(inDb.length, helper.initialBlogs.length)
  })

  test('id property correctly named', async () => {
    const inDb = await helper.blogsInDB()

    assert.notEqual(inDb[0].id, undefined)
  })
})

describe('when creating a new blog', () => {
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

    const inDb = await helper.blogsInDB()

    assert.strictEqual(inDb.length, helper.initialBlogs.length + 1)
  })
})

describe('when some fields are missing', () => {
  test('missing likes result in likes 0', async () => {
    const newBlog = {
      'title': 'POST blog',
      'author': 'Rick Rickards',
      'url': 'http://postblog.us'
    }

    const response = await api
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
})

describe('when deleting a blog', () => {
  test('existing blog is deleted', async () => {
    let inDb = await helper.blogsInDB()

    await api
      .delete(`/api/blogs/${inDb[0].id}`)
      .expect(204)

    inDb = await helper.blogsInDB()

    assert.strictEqual(inDb.length, helper.initialBlogs.length - 1)
  })

  test('nonexisting blog is not deleted', async () => {
    const fakeId = await helper.nonExistingBlogId()

    await api
      .delete(`/api/blogs/${fakeId}`)
      .expect(204)

    const inDb = await helper.blogsInDB()

    assert.strictEqual(inDb.length, helper.initialBlogs.length)
  })
})

describe('when updating a blog post', () => {
  test('existing blog is updated', async () => {
    let inDb = await helper.blogsInDB()

    const req = {
      likes: 123456
    }

    const response = await api
      .put(`/api/blogs/${inDb[0].id}`)
      .send(req)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 123456)
  })

  test('nonexisting blog does nothing', async () => {
    const fakeId = await helper.nonExistingBlogId()

    const req = {
      likes: 123456
    }

    await api
      .put(`/api/blogs/${fakeId}`)
      .send(req)
      .expect(204)

    const inDb = await helper.blogsInDB()

    assert.strictEqual(inDb.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})