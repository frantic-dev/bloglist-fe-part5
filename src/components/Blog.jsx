import Comments from './Comments'

const Blog = ({ blog, updateBlogLikes, removeBlog, user, commentMutation }) => {
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
      <Comments
        comments={blog.comments}
        commentMutation={commentMutation}
        id={blog.id}
      />
    </div>
  )
}

export default Blog
