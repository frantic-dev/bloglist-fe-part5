const Blog = ({ blog }) => (
  <div>
    Title: <span style={{ color: 'blue' }}> {blog.title}</span> Author:{' '}
    <span style={{ color: 'red' }}>{blog.author} </span>
  </div>
)

export default Blog
