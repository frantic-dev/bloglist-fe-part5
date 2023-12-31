import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogsReducer from './reducers/blogsReducer'
import userReducer, { UserContextProvider } from './reducers/userReducer'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './reducers/notificationReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import '../styles.css'

const store = configureStore({
  reducer: {},
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
)
