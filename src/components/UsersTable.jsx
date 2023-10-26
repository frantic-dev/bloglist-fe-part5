import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const UsersTable = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })
  const users = result.data
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  return (
    <div>
      <h2>Users</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default UsersTable
