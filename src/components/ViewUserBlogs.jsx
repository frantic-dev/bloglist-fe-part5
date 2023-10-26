const ViewUserBlogs = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default ViewUserBlogs