import { useState, useEffect } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({user, onLogout, onCreate}) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const addBlog = (blog) => {
    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        onCreate(blog)
      })
  }

  const likeBlog = (originalBlog) => {
    console.log(originalBlog)
    const updatedBlog = {
      likes: originalBlog.likes + 1,
      user: originalBlog.user.id,
      author: originalBlog.author,
      url: originalBlog.url,
      title: originalBlog.title,
      id: originalBlog.id
    }
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(b => (b.id === returnedBlog.id) ? returnedBlog : b))
      })
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button type="submit" onClick={onLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel='new note'>
        <CreateBlog createBlog={addBlog}/>
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onLike={likeBlog} />
        )}
      </div>
    </div>
  )


}

export default BlogList