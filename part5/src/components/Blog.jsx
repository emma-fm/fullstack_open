import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle = {
    backgroundColor: 'lightBlue'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    onLike(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='hideWhenVisible'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        <p className='titleAndAuthor'>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p className='url'>{blog.url}</p>
        <p className='likes'>likes {blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.user.name}</p>
        <p><button style={removeBtnStyle} onClick={deleteBlog}>remove</button></p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Blog