const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDB
}