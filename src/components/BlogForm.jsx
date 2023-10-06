const BlogForm = ({ newBlog, handleChange, createBlog }) => {

  return(
    <form onSubmit={e => createBlog(e)}>
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
  // <div>shit</div>
  )}

export default BlogForm