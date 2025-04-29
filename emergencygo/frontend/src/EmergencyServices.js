import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button
} from '@mui/material';

function EmergencyServices() {
  const services = [
    {
      id: 1,
      service_name: 'Police Department, Fire Department, Ambulance, Emergencies',
      contact_method: 'Call the number below',
      contact_number: '911',
    },
    {
      id: 2,
      service_name: 'Suicide and Crisis Lifeline',
      contact_method: 'Call for immediate mental health support.',
      contact_number: '988',
    },
    {
      id: 3,
      service_name: 'Poison Control',
      contact_method: 'Call immediately if exposed to poisonous substances.',
      contact_number: '1-800-222-1222',
    },
    {
      id: 4,
      service_name: 'National Domestic Violence Hotline',
      contact_method: '24/7 confidential support for victims.',
      contact_number: '1-800-799-7233',
    },
    {
      id: 5,
      service_name: 'National Sexual Assault Hotline',
      contact_method: 'Confidential support for survivors.',
      contact_number: '1-800-656-4673',
    },
    {
      id: 6,
      service_name: 'National Human Trafficking Hotline',
      contact_method: 'Report human trafficking or seek help.',
      contact_number: '1-888-373-7888',
    },
    {
      id: 7,
      service_name: 'Veterans Crisis Line',
      contact_method: 'Support for veterans in crisis.',
      contact_number: '988',
    },
    {
      id: 8,
      service_name: 'SAMHSA',
      contact_method: '24/7 help for mental health and substance use.',
      contact_number: '1-800-662-4357',
    },
    {
      id: 9,
      service_name: 'Roadside Assistance (AAA)',
      contact_method: 'Call if you have a vehicle breakdown.',
      contact_number: '1-800-222-4357',
    },
    {
      id: 10,
      service_name: 'Non-Emergencies',
      contact_method: 'Call for supportive services',
      contact_number: '311',
    },
    {
      id: 11,
      service_name: 'EmergencyGo Helper Agent',
      contact_method: 'Call for an AI agent to help',
      contact_number: '323-814-7213',
    },
  ];
  
  return (
    <Box sx={{ padding: 2, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: '#b71c1c',
          fontWeight: 'bold',
          fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
          textAlign: 'center',
        }}
      >
        Emergency Services
      </Typography>
      {/* Organized Grid Container */}
      <Grid container spacing={3} justifyContent="center">
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                border: '2px solid #b71c1c',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                backgroundColor: '#fff',
                p: 2,
              }}
            >
              <CardActionArea component="a" href={`tel:${service.contact_number}`}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ 
                      color: '#b71c1c',
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                    }}
                  >
                    {service.service_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                    color="text.secondary"
                  >
                    {service.contact_method}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: '#b71c1c',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#7f0000' },
                      fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
                      px: 2,
                      py: 1,
                    }}
                    href={`tel:${service.contact_number}`}
                  >
                    Call {service.contact_number}
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EmergencyServices;