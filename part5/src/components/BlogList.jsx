import { useState, useEffect } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
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
      <div>
        <CreateBlog onCreate={onCreate}/>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )


}

export default BlogList