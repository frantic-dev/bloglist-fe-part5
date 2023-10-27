import loginService from '../services/login'
import blogService from '../services/blogs'
import { createContext, useReducer } from 'react'

const initialState = null

export const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.payload
  default:
    return initialState
  }
}

const UserContext = createContext()

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, initialState)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext

export const login = (info, dispatchNotification, dispatchUser) => {
  return async () => {
    try {
      const user = await loginService.login(info)
      dispatchUser({ type: 'SET_USER', payload: user })
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
