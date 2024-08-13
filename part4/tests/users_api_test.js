const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('when creating a new user', () => {
  test('verify POST creates a new user', async () => {
    const newUser = {
      'username': 'usr',
      'password': 'pss',
      'name': 'Robert Baratheon'
    }

    let response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newUser.username)
    assert.strictEqual(response.body.name, newUser.name)

    const inDb = await helper.usersInDB()

    assert.strictEqual(inDb.length, helper.initialUsers.length + 1)
  })

  test('do not allow username length shorter than 3', async () => {
    const newUser = {
      'username': 'us',
      'password': 'password',
      'name': 'Robert Baratheon'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const inDb = await helper.usersInDB()

    assert.strictEqual(inDb.length, helper.initialUsers.length)
  })

  test('do not allow password length shorter than 3', async () => {
    const newUser = {
      'username': 'userTest',
      'password': 'p',
      'name': 'Robert Baratheon'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const inDb = await helper.usersInDB()

    assert.strictEqual(inDb.length, helper.initialUsers.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})