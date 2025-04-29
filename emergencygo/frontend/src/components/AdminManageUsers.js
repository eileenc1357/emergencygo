import React, { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { grey } from '@mui/material/colors';

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
      await AxiosInstance.post('admin-tools/ban_user/', { user_id: id });
      alert('User banned successfully!');
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error banning user:', error.response?.data || error.message);
    }
  };
  

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: '240px' }}>
        Manage Users
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Box sx={{ overflowX: 'auto', marginLeft: '240px' }}>
          <Table sx={{ minWidth: 750 }}>
            <TableHead sx={{ backgroundColor: 'grey' }}>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Photo ID</TableCell>
                <TableCell>Banned</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.email || 'No Email'}</TableCell>
                  <TableCell>
                    {user.id_photo ? (
                      <Button 
                        variant="contained" 
                        onClick={() => window.open(user.id_photo, '_blank')}
                        sx={{ backgroundColor: '#2E2E30', color: 'white', textTransform: 'none', fontSize: '0.8rem' }}
                      >
                        View
                      </Button>
                    ) : (
                      'No ID'
                    )}
                  </TableCell>
                  <TableCell>
                    {user.is_banned ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Yes</span>
                    ) : (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>No</span>
                    )}
                  </TableCell>
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
