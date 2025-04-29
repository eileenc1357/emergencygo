import React, { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'; // Material-UI imports

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get('admin-tools/users/');
      console.log('Users fetched from API:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`admin-tools/users/${id}/`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBan = async (id) => {
    try {
      await AxiosInstance.post(`admin-tools/users/${id}/ban/`);
      alert('User banned successfully!');
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: '240px' }}> {/* Added marginLeft here */}
        Manage Users
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Box sx={{ overflowX: 'auto', marginLeft: '240px' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.username !== null ? user.username : 'No Username'}</TableCell>
                  <TableCell>{user.email || 'No Email'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(user.id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)} sx={{ marginLeft: 2 }}>
                      Delete
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleBan(user.id)} sx={{ marginLeft: 2 }}>
                      Ban
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
}

export default AdminManageUsers;
