const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    'title': 'Amazing Amazons',
    'author': 'Eliza Biggs',
    'url': 'http://amazingamazons.ru',
    'likes': 768,
    'user': '66bb859d9d6a718f96f875a1'
  },
  {
    'title': 'Computer Science Weekly',
    'author': 'Annabella Smith',
    'url': 'http://compsciweekly.com',
    'likes': 1341,
    'user': '66aa760999fb9b4952989acc'
  }
]

const initialUsers = [
  {
    '_id': '66bb859d9d6a718f96f875a1',
    'username': 'user1',
    'password': '12345',
    'name': 'Eddard Stark'
  },
  {
    '_id': '66aa760999fb9b4952989acc',
    'username': 'user2',
    'password': 'abcdef',
    'name': 'Daenerys Targaryen'
  }
]

const nonExistingBlogId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const usernameToken = async (username) => {
  const user = await User.findOne({ username })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(userForToken, config.SECRET)
}

const userIdToken = async (id) => {
  const user = await User.findById(id)

  const userForToken = {
    username: user.username,
    id: user._id
  }

  return jwt.sign(userForToken, config.SECRET)
}

module.exports = {
  initialBlogs, nonExistingBlogId, blogsInDB,
  initialUsers, usersInDB,
  usernameToken, userIdToken
}