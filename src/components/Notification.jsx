import { useDispatch, useSelector } from 'react-redux'
import '../../notification.css'

const Notification = ({ notification }) => {
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
