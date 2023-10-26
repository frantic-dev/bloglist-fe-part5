import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </NotificationContextProvider>
)
