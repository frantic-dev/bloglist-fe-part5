const Blog = ({ blog }) => (
  <div>
    <span style={{ color: 'blue' }}> {blog.title}</span>{' '}
    <span style={{ color: 'red' }}>{blog.author} </span>
  </div>
)

export default Blog
