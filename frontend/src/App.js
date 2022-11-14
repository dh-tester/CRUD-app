import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TableContainer, Table, TableBody, TableRow, TableCell, TextField } from '@mui/material';
import {useState} from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const fetchUsers = async () =>{
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }
  //fetchUsers()
  const fetchUser = async (id) =>{
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }
  const createOrEditUser = async () =>{
    if(user.id){
      await axios.put(`http://localhost:8000/${user.id}`, user)
    }else{
      await axios.post('http://localhost:8000/', user)
    }
    await fetchUsers()
    await setUser({id: 0, name: '', email: '', password: ''})
  }
  const deleteUser = async (id) =>{
    await axios.delete(`http://localhost:8000/${id}`)
    await fetchUsers()
  }  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DANI'S USER LIST
            </Typography>
          </Toolbar>
        </AppBar>
        <Box m={10}>
          <TableContainer>
            <TextField value={user.id} type="hidden" />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                      <TableCell>
                        <TextField value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} id="standard-basic" label="Name" variant="standard" />
                      </TableCell>
                      <TableCell>
                        <TextField value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} id="standard-basic" label="Email" variant="standard" />
                      </TableCell>
                      <TableCell>
                        <TextField value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} id="standard-basic" label="Password" variant="standard" />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => createOrEditUser()} variant="contained" color="primary">
                          Submit
                        </Button>
                      </TableCell>
                </TableRow>
                <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Password</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                  </TableRow>
                {users.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.password}</TableCell>
                    <TableCell>
                      <Button onClick={() => fetchUser(row.id)} variant="contained" color="primary">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => deleteUser(row.id)} variant="contained" color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}

export default App;
