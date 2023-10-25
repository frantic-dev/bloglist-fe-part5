import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { hideNotification, showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const login = info => {
  return async dispatch => {
    try {
      const user = await loginService.login(info)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(
        showNotification({ type: 'success', message: 'successfully logged in' })
      )
    } catch (error) {
      dispatch(
        showNotification({ type: 'error', message: 'Wrong credentials' })
      )
    }
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}
export default userSlice.reducer
