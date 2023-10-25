import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
    const user = await loginService.login(info)
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}
export default userSlice.reducer
