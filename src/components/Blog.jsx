import { useState } from 'react'

const Blog = ({ blog , updateBlogLikes}) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'
  const display = visible ? '' : 'none'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  function toggleVisibility() {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle}>
      Title: <span style={{ color: 'blue' }}> {blog.title}</span>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={{ display: display }}>
        url: {blog.url}
        <br />
        likes: {blog.likes || 0}
        <button onClick={updateBlogLikes}>like</button>
        <br />
        Author: <span style={{ color: 'red' }}>{blog.author} </span>
      </div>
    </div>
  )
}

export default Blog
