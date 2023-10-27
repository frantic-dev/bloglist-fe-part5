import { useState } from 'react'

const Comments = ({ comments, commentMutation, id }) => {
  const [newComment, setNewComment] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (newComment !== '')
      commentMutation.mutate({ id: id, comment: { comment: newComment } })
    setNewComment('')
  }
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newComment}
          onChange={({ target }) => {
            setNewComment(target.value)
          }}
        />
        <button>add comment</button>
      </form>
      <ul>
        {comments.map(({ comment, id }) => (
          <li key={id}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}
export default Comments
