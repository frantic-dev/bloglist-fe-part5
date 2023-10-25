/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {
  hideNotification,
  showNotification,
} from './reducers/notificationReducer'
import {
  addBlog,
  deleteBlog,
  initializeBlogs,
  setBlogs,
  updateBlog,
} from './reducers/blogsReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const BlogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      blogService.setToken(user.token)
      dispatch(
        showNotification({ type: 'success', message: 'successfully logged in' })
      )
    } catch (exception) {
      dispatch(
        showNotification({ type: 'error', message: 'Wrong credentials' })
      )
    }
    setUsername('')
    setPassword('')
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <div>
        username
        <input
          type='text'
          value={username}
          id='username'
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          id='password'
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        type='submit'
        id='login-btn'
      >
        login
      </button>
    </form>
  )

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
        <Notification notification={notification} />
        {blogForm()}
      </div>
    )
  }

  const createBlog = async newBlog => {
    BlogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog))
    dispatch(
      showNotification({
        type: 'success',
        message: 'a new blog has been added!',
      })
    )
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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
      {user === null ? loginForm() : loggedIn()}
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
