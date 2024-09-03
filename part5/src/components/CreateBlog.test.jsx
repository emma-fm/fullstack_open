import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('new blog details are correctly sent to handler', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlog createBlog={mockHandler} />)

  const titleInput = container.querySelector('#title-input')
  await user.type(titleInput, 'Blog Title')

  const authorInput = container.querySelector('#author-input')
  await user.type(authorInput, 'Blog Author')

  const urlInput = container.querySelector('#url-input')
  await user.type(urlInput, 'Blog URL')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Blog Title')
  expect(mockHandler.mock.calls[0][0].author).toBe('Blog Author')
  expect(mockHandler.mock.calls[0][0].url).toBe('Blog URL')
})