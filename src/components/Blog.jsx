import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, updateBlogLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'
  const display = visible ? '' : 'none'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  function toggleVisibility() {
    setVisible(!visible)
  }
  console.log(blog)
  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <div>
        <a
          href={blog.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {blog.url}
        </a>
      </div>
      <div>
        likes: {blog.likes}
        <button onClick={() => updateBlogLikes(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default Blog
