import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog/>', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'top developer',
      likes: 555,
      url: 'top-dev.com',
    }

    const updateBlogLikes = jest.fn()
    const removeBlog = jest.fn()

    container = render(
      <Blog
        blog={blog}
        updateBlogLikes={updateBlogLikes}
        removeBlog={removeBlog}
      />
    ).container
  })

  test('only title is rendered', () => {
    const title = container.querySelector('.blog')
    const hiddenInfo = container.querySelector('.hidden-info')

    console.log(title)
    console.log(hiddenInfo)
    expect(title).not.toHaveStyle('display: none ')
    expect(hiddenInfo).toHaveStyle('display: none')
  })

})
