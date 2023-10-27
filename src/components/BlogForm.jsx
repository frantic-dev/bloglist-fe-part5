import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { spacing } from '@mui/system'

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
      <TextField
        sx={{ my: 1 }}
        label='title'
        value={newBlog.title}
        id='title'
        name='title'
        onChange={({ target }) => handleChange(target)}
      />
      <br />
      <TextField
        sx={{ my: 1 }}
        label='username'
        id='author'
        name='author'
        value={newBlog.author}
        onChange={({ target }) => handleChange(target)}
      />
      <br />
      <TextField
        sx={{ my: 1 }}
        label='url'
        id='url'
        name='url'
        value={newBlog.url}
        onChange={({ target }) => handleChange(target)}
      />
      <br />
      <Button
        sx={{ my: 1 }}
        variant='contained'
        color='primary'
        type='submit'
      >
        create
      </Button>
    </form>
  )
}

export default BlogForm
