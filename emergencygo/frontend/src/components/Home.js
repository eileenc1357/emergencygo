import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/featured/?emergency,help)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 1120, // increased from 800 (40% larger)
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: 2,
          boxShadow: 3,
          p: 4, // increased padding for a roomier layout
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: '#b71c1c',
              fontWeight: 'bold',
              textAlign: 'center',
              // Increase font size by about 40% (adjust values as needed)
              fontSize: { xs: '2.8rem', sm: '3.9rem', md: '5.6rem' },
            }}
          >
            Welcome to EmergencyGo
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 3,
              // Increase description font size similarly
              fontSize: { xs: '1.12rem', sm: '1.68rem', md: '2.24rem' },
            }}
          >
            Your trusted companion in times of crisis. Stay informed, stay safe, and get help when you need it.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#b71c1c',
                  '&:hover': { backgroundColor: '#7f0000' },
                  color: '#fff',
                  px: 3, // increased horizontal padding
                  py: 1.5, // increased vertical padding
                  fontSize: '1.2rem',
                }}
                onClick={() => navigate('/emergency-services')}
              >
                Emergency Services
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#b71c1c',
                  color: '#b71c1c',
                  '&:hover': { borderColor: '#7f0000', color: '#7f0000' },
                  px: 3,
                  py: 1.5,
                  fontSize: '1.2rem',
                }}
                onClick={() => navigate('/emergency-tutorials')}
              >
                Tutorials
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#b71c1c',
                  color: '#b71c1c',
                  '&:hover': { borderColor: '#7f0000', color: '#7f0000' },
                  px: 3,
                  py: 1.5,
                  fontSize: '1.2rem',
                }}
                onClick={() => navigate('/nearby-services')}
              >
                Nearby Services
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#b71c1c',
                  color: '#b71c1c',
                  '&:hover': { borderColor: '#7f0000', color: '#7f0000' },
                  px: 3,
                  py: 1.5,
                  fontSize: '1.2rem',
                }}
                onClick={() => navigate('/logout')}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home;