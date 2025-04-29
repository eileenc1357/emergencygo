import React from 'react';
import { Button } from '@mui/material';
import AxiosInstance from './AxiosInstance';

const MarkSafeButton = ({ emergencyId }) => {
  const markSafe = async () => {
    try {
      await AxiosInstance.patch(`api/emergencies/emergencies/${emergencyId}/`, { status: 'User marked as safe' });
      console.log('Marked safe successfully');
    } catch (error) {
      console.error('Error marking safe:', error);
    }
  };

  return (
    <Button onClick={markSafe} variant="contained" color="success">
      Mark Myself as Safe
    </Button>
  );
};

export default MarkSafeButton;