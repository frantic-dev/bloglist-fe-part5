import { useContext, useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import UserContext, { login } from '../reducers/userReducer'
import NotificationContext from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

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
        <TextField
          sx={{ my: 1 }}
          label='username'
          value={username}
          id='username'
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          sx={{ my: 1 }}
          label='password'
          type='password'
          value={password}
          id='password'
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        variant='contained'
        color='primary'
        type='submit'
      >
        login
      </Button>
    </form>
  )
}

export default LoginForm
