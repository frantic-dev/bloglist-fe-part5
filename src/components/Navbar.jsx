import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <Button color='inherit'>
          <Link to='/'>blogs</Link>
        </Button>
        <Button color='inherit'>
          <Link to='/users'>users</Link>
        </Button>
        <Button color='inherit'>
          {user ? (
            <em>{user.name} logged in</em>
          ) : (
            <Link to='/login'>login</Link>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
