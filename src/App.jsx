/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import NotificationContext from './reducers/notificationReducer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './reducers/userReducer'
import UsersTable from './components/UsersTable'
import userService from './services/users'


const App = () => {
  const BlogFormRef = useRef()
  const dispatch = useDispatch()
  const [notification, dispatchNotification] = useContext(NotificationContext)
  const [user, dispatchUser] = useContext(UserContext)

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'success',
          message: 'a new blog has been added!',
        },
      })
    },
    onError: () => {
      dispatchNotification({
        type: 'SHOW',
        payload: {
          type: 'error',
          message: 'missing form content',
        },
      })
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: updatedBlog => blogService.update(updatedBlog, updatedBlog.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: id => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const blogs = result.data

  const queryClient = useQueryClient()

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  function sortedBlogs(blogs) {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const logout = () => {
    location.reload()
  }

  const loggedIn = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.username} logged in
          <button onClick={logout}>logout</button>
        </p>
        <Notification />
        {blogForm()}
      </div>
    )
  }
  const createBlog = async newBlog => {
    BlogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(newBlog)
  }

  const blogForm = () => (
    <Togglable
      buttonLabel='create new blog'
      ref={BlogFormRef}
    >
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const updateBlogLikes = async blog => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    likeBlogMutation.mutate(newBlog)
  }

  const removeBlog = async id => {
    deleteBlogMutation.mutate(id)
  }

  const userBlogs =
    user === null
      ? blogs
      : blogs.filter(blog => blog.user.username === user.username)

  return (
    <div>
      {user === null ? <LoginForm /> : loggedIn()}
      {user === null && <h2>blogs</h2>}
      {sortedBlogs(userBlogs).map(blog => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateBlogLikes={() => updateBlogLikes(blog)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )
      })}
      <UsersTable  />
    </div>
  )
}

export default App
