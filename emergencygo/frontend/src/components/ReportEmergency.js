import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import AxiosInstance from './AxiosInstance';

function ReportEmergency() {
  const [emergencyType, setEmergencyType] = useState('');
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [details, setDetails] = useState('');

  const handleSubmit = async () => {
    if (!emergencyType || !severity || !location.latitude || !location.longitude) {
      alert('Please fill all fields and allow location access.');
      return;
    }

    try {
      await AxiosInstance.post('emergency/report-emergency/', {
        emergency_type: emergencyType,
        severity: severity,
        latitude: location.latitude,
        longitude: location.longitude,
        details: details,
      });
      alert('Emergency reported successfully!');
    } catch (error) {
      console.error('Error reporting emergency:', error);
      alert('Failed to report emergency.');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('Error getting location:', err);
          alert('Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Report Emergency
      </Typography>

      <Box sx={{ my: 2 }}>
        <TextField
          select
          label="Emergency Type"
          fullWidth
          value={emergencyType}
          onChange={(e) => setEmergencyType(e.target.value)}
        >
          <MenuItem value="fire">Fire</MenuItem>
          <MenuItem value="medical">Medical Emergency</MenuItem>
          <MenuItem value="crime">Crime</MenuItem>
          <MenuItem value="accident">Accident</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ my: 2 }}>
        <TextField
          select
          label="Urgency"
          fullWidth
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i+1} value={i+1}>{i+1}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ my: 2 }}>
      <TextField
          label="Details"
          fullWidth
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" onClick={handleGetLocation}>
          Get My Location
        </Button>
        {location.latitude && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            Location captured: {location.latitude}, {location.longitude}
          </Typography>
        )}
      </Box>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" color="error" onClick={handleSubmit}>
          Submit Emergency Report
        </Button>
      </Box>
    </Box>
  );
}

export default ReportEmergency;