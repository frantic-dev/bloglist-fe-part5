import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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
      noteService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
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
      // console.log(allUsers)
      // console.log(userInfo)
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
        {createNewBlogForm()}
      </div>
    )
  }

  const createNewBlog = async (e) => {
    e.preventDefault()
    await blogService.create(newBlog)
    setBlogs(blogs.concat(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
  }

  function handleChangeNewBlog(target) {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const createNewBlogForm = () => (
    <form onSubmit={(e) => createNewBlog(e)}>
      <h2>create new</h2>
      <label htmlFor='title'>
        {' '}
        title
        <input
          type='text'
          name='title'
          id='title'
          value={newBlog.title}
          onChange={({target})=>handleChangeNewBlog(target)}
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
          onChange={({target})=>handleChangeNewBlog(target)}
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
          onChange={({target})=>handleChangeNewBlog(target)}
        />
      </label>
      <br />
      <button>create</button>
    </form>
  )

  return (
    <div>
      {user === null ? loginForm() : loggedIn()}
      {user === null && <h2>blogs</h2>}
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

export default App
