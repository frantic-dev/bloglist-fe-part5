import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

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

export const login = (info, dispatchNotification) => {
  return async dispatch => {
    try {
      const user = await loginService.login(info)
      console.log(user)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'success',
          message: 'successfully logged in',
        },
      })
    } catch (error) {
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'error',
          message: 'wrong credentials',
        },
      })
    }
    setTimeout(() => {
      dispatchNotification({ type: 'HIDE' })
    }, 2000)
  }
}
export default userSlice.reducer
