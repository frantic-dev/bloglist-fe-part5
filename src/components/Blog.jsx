const Blog = ({ blog, updateBlogLikes, removeBlog, user }) => {
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
      {blog.comments.length !== 0 && (
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map(({ comment, id }) => (
              <li key={id}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Blog
