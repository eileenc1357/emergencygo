import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';

export default function Navbar({ content, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname; 

  const logoutUser = () => {
    AxiosInstance.post('logoutall/', {}).then(() => {
      localStorage.removeItem('Token');
      navigate('/');
    });
  };

  const handleMarkSafe = () => {
    alert("You have been marked as safe. Help is on the way.");
  };

  const handleInformCivilian = () => {
    alert("Help is on the way. Please stay calm and follow instructions.");
  };
  if (user === undefined) {
    return null; // don't render anything until user is loaded
  }
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#b71c1c' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
            EmergencyGo
          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/home"
            sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/report-emergency"
            sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
          >
            Report Emergency
          </Button>
          {(user?.is_staff || user?.is_superuser) && (
            <Button
              color="inherit"
              component={NavLink}
              to="/view-emergencies"
              sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
            >
             View Emergencies
            </Button>
          )}
          <Button
            color="inherit"
            component={NavLink}
            to="/emergency-services"
            sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
          >
            Emergency Services
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/emergency-tutorials"
            sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
          >
            Tutorials
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/nearby-services"
            sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
          >
            Nearby Services
          </Button>
            {(user?.is_staff || user?.is_superuser) && (
            <Button
              color="inherit"
              component={NavLink}
              to="/admin/manage"
              sx={{ '&.active': { fontWeight: 'bold', textDecoration: 'underline' } }}
            >
             Manage Users
            </Button>
          )}
          {/* Mark Safe Button */}
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
                color: '#fff',
              }}
              onClick={handleMarkSafe}
            >
              Mark Safe
            </Button>
          </Box>
          {/* Inform Civilian Help Status Button */}
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2196f3',
                '&:hover': { backgroundColor: '#1976d2' },
                color: '#fff',
              }}
              onClick={handleInformCivilian}
            >
              Help Status
            </Button>
          </Box>
          {/* Logout Button */}
          <Box sx={{ ml: 2 }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#fff',
                color: '#fff',
                '&:hover': { borderColor: '#ddd', color: '#ddd' },
              }}
              onClick={logoutUser}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {content}
      </>
       );
}
