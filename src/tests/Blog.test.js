import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/>', () => {
  let container
  let updateBlogLikes
  let removeBlog

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'top developer',
      likes: 555,
      url: 'top-dev.com',
    }

    updateBlogLikes = jest.fn()
    removeBlog = jest.fn()

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

  test('everything is rendered', async () => {
    const title = container.querySelector('.blog')
    const hiddenInfo = container.querySelector('.hidden-info')
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    console.log(title)
    console.log(hiddenInfo)
    expect(title).not.toHaveStyle('display: none ')
    expect(hiddenInfo).not.toHaveStyle('display: none')
  })

  test('like button is clicked twice', async () => {
    const likeBtn = container.querySelector('.like-btn')
    const user = userEvent.setup()

    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(updateBlogLikes.mock.calls).toHaveLength(2)
  })
})
