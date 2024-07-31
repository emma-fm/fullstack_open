const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    'username': 'user1',
    'password': '12345',
    'name': 'Eddard Stark'
  },
  {
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
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingBlogId, blogsInDB,
  initialUsers, usersInDB
}