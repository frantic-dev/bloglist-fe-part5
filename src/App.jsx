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

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    getBlogs()
  }, [user])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
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
      console.log(allUsers)
      console.log(userInfo)
      setBlogs(userInfo.blogs)
    }
  }

  const loggedInUser = () => {
    return (
      <p>
        <h2>blogs</h2>
        {user.username} logged in
      </p>
    )
  }
  

  return (
    <div>
      {user === null ? loginForm() : loggedInUser()}
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
