import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('by default only renders title and author', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'http://blogurl.com',
    likes: 777,
    user: {
      name: 'Username'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const defaultDiv = container.querySelector('.hideWhenVisible')
  expect(defaultDiv).toHaveTextContent('Blog Title')
  expect(defaultDiv).toHaveTextContent('Blog Author')
  expect(defaultDiv).not.toHaveTextContent('http://blogurl.com')
  expect(defaultDiv).not.toHaveTextContent('777')
  expect(defaultDiv).not.toHaveStyle('display: none')

  const expandedDiv = container.querySelector('.showWhenVisible')
  expect(expandedDiv).toHaveStyle('display: none')
})