import { useContext, useState } from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import NotificationContext from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const handleLogin = e => {
    e.preventDefault()
    dispatch(login({ username, password }, dispatchNotification))
    setUsername('')
    setPassword('')
  }

  return (
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
}

export default LoginForm
