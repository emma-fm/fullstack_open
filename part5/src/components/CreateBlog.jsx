import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({onCreate}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = (event) => {
    event.preventDefault()

    if (title && author && url) {
      const blog = {
        title, author, url
      }
      blogService.create(blog)
      onCreate(blog)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )


}

export default CreateBlog