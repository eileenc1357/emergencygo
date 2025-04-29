import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AxiosInstance from './AxiosInstance';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const drawerWidth = 240;

export default function Navbar(props) {
  const { content, user } = props; // Receive user prop
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const logoutUser = () => {
    AxiosInstance.post('logoutall/', {}).then(() => {
      localStorage.removeItem('Token');
      navigate('/');
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EmergencyGo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          
              <ListItem key={'home'} disablePadding>
                <ListItemButton component={Link} to="/home" selected={"/home" === path}>
                  <ListItemIcon>
                        <HomeIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem key={2} disablePadding>
              <ListItemButton component={Link} to="/about" selected={"/about" === path}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItemButton>
            </ListItem>

            {/* Conditionally render "Ban User" link for admin users */}
            {user?.is_staff || user?.is_superuser ? (
              <ListItem key={4} disablePadding>
                <ListItemButton component={Link} to="/admin/ban" selected={"/admin/ban" === path}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Ban User"} />
                </ListItemButton>
              </ListItem>
            ) : null}

              <ListItem key="nearby-emergency" disablePadding>
                <ListItemButton component={Link} to="/nearby-services" selected={"/nearby-services" === path}>
                  <ListItemIcon><PlaceIcon /></ListItemIcon>
                  <ListItemText primary="Nearby Emergency Services" />
                </ListItemButton>
              </ListItem>

              <ListItem key="emergency-services" disablePadding>
                <ListItemButton component={Link} to="/emergency-services" selected={"/emergency-services" === path}>
                  <ListItemIcon><PhoneInTalkIcon /></ListItemIcon> 
                  <ListItemText primary="Emergency Services" />
                </ListItemButton>
              </ListItem>

              <ListItem key="emergency-tutorials" disablePadding>
                <ListItemButton component={Link} to="/emergency-tutorials" selected={"/emergency-tutorials" === path}>
                  <ListItemIcon><VideoLibraryIcon /></ListItemIcon>
                  <ListItemText primary="Emergency Tutorials" />
                </ListItemButton>
              </ListItem>

              <ListItem key={'logout'} disablePadding>
              <ListItemButton onClick={logoutUser}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        {content}
      </Box>
    </Box>
  );
}
