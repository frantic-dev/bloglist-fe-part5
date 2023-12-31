import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
// import { hideNotification, showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    likeBlog(state, action) {
      const blog = action.payload
      return state.map(b => {
        return b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : b
      })
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog, dispatchNotification) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'success',
          message: 'a new blog has been added!',
        },
      })
    } catch (error) {
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'error',
          message: 'missing form content',
        },
      })
    }

    setTimeout(() => {
      dispatchNotification({ type: 'HIDE' })
    }, 5000)
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog, blog.id)
    dispatch(likeBlog(blog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
