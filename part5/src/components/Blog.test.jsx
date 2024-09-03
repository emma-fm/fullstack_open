import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('URL and likes are shown after clicking the view button', async () => {
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

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const defaultDiv = container.querySelector('.hideWhenVisible')
  expect(defaultDiv).toHaveStyle('display: none')

  const expandedDiv = container.querySelector('.showWhenVisible')
  expect(expandedDiv).not.toHaveStyle('display: none')

  const titleAndAuthor = container.querySelector('.titleAndAuthor')
  expect(defaultDiv).toHaveTextContent('Blog Title')
  expect(defaultDiv).toHaveTextContent('Blog Author')

  const url = container.querySelector('.url')
  expect(url).toHaveTextContent('http://blogurl.com')

  const likes = container.querySelector('.likes')
  expect(likes).toHaveTextContent('777')
})