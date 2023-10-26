import { createContext, useReducer } from 'react'

const initialState = { type: null, message: null }

export const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.payload
  case 'HIDE':
    return initialState
  default:
    return initialState
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
