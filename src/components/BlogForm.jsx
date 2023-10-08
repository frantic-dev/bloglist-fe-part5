import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  function handleChange(target) {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h2>create new</h2>
      <label htmlFor='title'>
        {' '}
        title
        <input
          type='text'
          name='title'
          id='title'
          value={newBlog.title}
          onChange={({ target }) => handleChange(target)}
        />
      </label>
      <br />
      <label htmlFor='author'>
        {' '}
        author
        <input
          type='text'
          name='author'
          id='author'
          value={newBlog.author}
          onChange={({ target }) => handleChange(target)}
        />
      </label>
      <br />
      <label htmlFor='url'>
        {' '}
        url
        <input
          type='text'
          name='url'
          id='url'
          value={newBlog.url}
          onChange={({ target }) => handleChange(target)}
        />
      </label>
      <br />
      <button>create</button>
    </form>
  )
}

export default BlogForm
