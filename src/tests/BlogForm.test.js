import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('blog form receives the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createBtn = screen.getByText('create')

  await user.type(titleInput, 'a title')
  await user.type(authorInput, 'an author')
  await user.type(urlInput, 'an url')
  await user.click(createBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'a title',
    author: 'an author',
    url: 'an url',
  })
})
