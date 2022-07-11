import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog tests', () => {

  test('blog component renders title and author, but not url and likes by default', () => {
    const blog = {
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
      likes: 5,
      user: 'keke'
    }

    const { container } = render(<Blog blog={blog}  />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'testtitle'
    )
    expect(div).toHaveTextContent(
      'testauthor'
    )
    expect(div).not.toHaveTextContent(
      'testurl'
    )
    expect(div).not.toHaveTextContent(
      '5'
    )
  })
  test('url and likes show after pressing button', async () => {
    const blog = {
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
      likes: 5,
      user: { username: 'asd' }
    }
    const user = {
      username: 'asd'
    }

    const { container } = render(<Blog blog={blog}  user={user} />)

    const userr = userEvent.setup()
    const button = screen.getByText('view')
    await userr.click(button)

    const div = container.querySelector('.blogAll')
    expect(div).not.toHaveStyle('display: none')

    expect(div).toHaveTextContent(
      'testurl'
    )
    expect(div).toHaveTextContent(
      '5'
    )
  })
  test.only('pressing like twice (2)', async () => {
    const blog = {
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
      likes: 5,
      user: { username: 'asd' }
    }
    const user = {
      username: 'asd'
    }

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} createBlog={mockHandler} />
    )

    const userr = userEvent.setup()
    const button = screen.getByText('like')
    await userr.click(button)
    await userr.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})