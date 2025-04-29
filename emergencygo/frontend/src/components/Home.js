import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AxiosInstance from './AxiosInstance';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const response = await AxiosInstance.get('users/');
      if (Array.isArray(response.data)) {
        setAllUsers(response.data);
      } else if (Array.isArray(response.data.users)) {
        setAllUsers(response.data.users);
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (token) {
        const response = await AxiosInstance.get('users/me/');
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllUsers();
      await fetchUserData();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Current User Info */}
      {currentUser && (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
          <div>Logged-in User ID: {currentUser.id}</div>
          <div>Logged-in User Email: {currentUser.email}</div>
        </Paper>
      )}

      {/* Admin Panel Link */}
      {currentUser?.is_staff || currentUser?.is_superuser ? (
        <Box sx={{ mt: 4 }}>
          <Link to="/admin/ban">Go to Admin Panel to Ban Users</Link>
        </Box>
      ) : null}
    </div>
  );
};

export default Home;
