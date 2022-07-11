import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

    const { container } = render(<Blog blog={blog}/>)

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
})