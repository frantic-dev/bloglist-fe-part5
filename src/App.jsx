import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const BlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
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

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      blogService.setToken(user.token)
      setMessage('successfully logged in')
      setNotificationType('success')
    } catch (exception) {
      setMessage('Wrong credentials')
      setNotificationType('error')
    }
    setUsername('')
    setPassword('')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification
        message={message}
        type={notificationType}
      />
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const getBlogs = async () => {
    if (user) {
      const allUsers = await userService.getAll()
      const userInfo = allUsers.find(u => u.username === user.username)
      setBlogs(userInfo.blogs)
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
        <Notification
          message={message}
          type={notificationType}
        />
        {blogForm()}
      </div>
    )
  }

  const createBlog = async e => {
    e.preventDefault()
    BlogFormRef.current.toggleVisibility()
    await blogService.create(newBlog)
    setBlogs(blogs.concat(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
    setMessage('a new blog has been added!')
    setNotificationType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  function handleChangeNewBlog(target) {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const blogForm = () => (
    <Togglable
      buttonLabel='create new blog'
      ref={BlogFormRef}
    >
      <BlogForm
        newBlog={newBlog}
        handleChange={handleChangeNewBlog}
        createBlog={createBlog}
      />
    </Togglable>
  )

  const updateBlogLikes = async blog => {
    await blogService.update({ ...blog, likes: blog.likes + 1 }, blog.id)
    setBlogs(blogs =>
      blogs.map(b => (b === blog ? { ...blog, likes: blog.likes + 1 } : b))
    )
  }

  return (
    <div>
      {user === null ? loginForm() : loggedIn()}
      {user === null && <h2>blogs</h2>}
      {blogs.map(blog => {
        // console.log(blog)
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlogLikes={() => updateBlogLikes(blog)}
          />
        )
      })}
    </div>
  )
}

export default App
