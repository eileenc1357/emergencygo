import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import AxiosInstance from './AxiosInstance';
import MarkSafeButton from './MarkSafeButton';

const Dashboard = () => {
  const [emergency, setEmergency] = useState(null);

  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        const response = await AxiosInstance.get('api/emergencies/current_emergency/');
        setEmergency(response.data);
      } catch (error) {
        console.error('Error fetching emergency details:', error);
      }
    };

    fetchEmergency();
  }, []);

  if (!emergency) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">{emergency.title}</Typography>
      <Typography variant="body1">{emergency.description}</Typography>
      {/* The MarkSafeButton appears here */}
      <MarkSafeButton emergencyId={emergency.id} />
    </Box>
  );
};

export default Dashboard;