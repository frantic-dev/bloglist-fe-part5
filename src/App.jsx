/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  addBlog,
  deleteBlog,
  initializeBlogs,
  setBlogs,
  updateBlog,
} from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import NotificationContext, { NotificationContextProvider } from './reducers/notificationReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const BlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      getBlogs()
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    getBlogs()
  }, [user])

  function sortedBlogs(blogs) {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  }

  const getBlogs = async () => {
    if (user) {
      const allUsers = await userService.getAll()
      const userInfo = allUsers.find(u => u.username === user.username)
      dispatch(setBlogs(userInfo.blogs))
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    location.reload()
  }

  const loggedIn = () => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))

    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.username} logged in
          <button onClick={logout}>logout</button>
        </p>
        <Notification />
        {blogForm()}
      </div>
    )
  }
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const createBlog = async newBlog => {
    BlogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog, dispatchNotification))
  }

  const blogForm = () => (
    <Togglable
      buttonLabel='create new blog'
      ref={BlogFormRef}
    >
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const updateBlogLikes = async blog => {
    dispatch(updateBlog(blog))
  }

  const removeBlog = async id => {
    dispatch(deleteBlog(id))
  }

  return (
    <div>
      {user === null ? <LoginForm /> : loggedIn()}
      {user === null && <h2>blogs</h2>}
      {sortedBlogs(blogs).map(blog => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlogLikes={() => updateBlogLikes(blog)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )
      })}
    </div>
  )
}

export default App
