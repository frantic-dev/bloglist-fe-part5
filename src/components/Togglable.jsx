import { forwardRef, useImperativeHandle, useState } from "react"

const Togglable = forwardRef(({buttonLabel, children}, refs) => {
  const [visible, setVisible] = useState(false)
  const showWhenFormVisible = { display: visible ? '' : 'none' }
  const hideWhenFormVisible = { display: visible ? 'none' : '' }

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(refs, ()=> {
    return {toggleVisibility}
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
        <button
          
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable
