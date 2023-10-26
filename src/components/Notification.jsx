import { useDispatch, useSelector } from 'react-redux'
import '../../notification.css'
import { useContext } from 'react'
import NotificationContext from '../reducers/notificationReducer.jsX'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  if (notification.message === null) {
    return null
  }

  return (
    <div className={`${notification.type} notification`}>
      {notification.message}
    </div>
  )
}

export default Notification
