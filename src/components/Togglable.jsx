import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)
  const showWhenFormVisible = { display: visible ? '' : 'none' }
  const hideWhenFormVisible = { display: visible ? 'none' : '' }

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <button
        style={hideWhenFormVisible}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </button>
      <div style={showWhenFormVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
