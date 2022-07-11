import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm calls callback function with right data given with props when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}  />)

  const titleInput = screen.getByRole('textbox', { name: 'Title' })
  const authorInput = screen.getByRole('textbox', { name: 'Author' })
  const urlInput = screen.getByRole('textbox', { name: 'Url' })

  const createButton = screen.getByText('create')

  await user.type(titleInput, 'DogBlog')
  await user.type(authorInput, 'Jaska Jokinen')
  await user.type(urlInput, 'http://dogblog.com')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('DogBlog')
  expect(createBlog.mock.calls[0][0].author).toBe('Jaska Jokinen')
  expect(createBlog.mock.calls[0][0].url).toBe('http://dogblog.com')
})