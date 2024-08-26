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

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button type="submit" onClick={onLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel='new note'>
        <CreateBlog onCreate={onCreate}/>
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )


}

export default BlogList