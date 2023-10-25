import { createSlice } from '@reduxjs/toolkit'

const initialState = { type: null, message: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return { type: null, message: null }
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
