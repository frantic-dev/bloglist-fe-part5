import { useContext, useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import UserContext, { login } from '../reducers/userReducer'
import NotificationContext from '../reducers/notificationReducer'

const LoginForm = ({ mutate }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [user, dispatchUser] = useContext(UserContext)
  const handleLogin = e => {
    e.preventDefault()
    dispatch(login({ username, password }, dispatchNotification, dispatchUser))
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
