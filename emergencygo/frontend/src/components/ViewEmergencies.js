import React, { useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ViewEmergencies() {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const response = await AxiosInstance.get('emergency/list-emergencies/');
        setEmergencies(response.data);
      } catch (error) {
        console.error('Failed to fetch emergencies:', error);
      }
    };

    fetchEmergencies();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Emergency Reports
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Severity</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Urgency</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Details</TableCell>
                <TableCell sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emergencies.map((emergency) => (
              <TableRow key={emergency.id}>
                <TableCell>{emergency.user}</TableCell>
                <TableCell>{emergency.emergency_type}</TableCell>
                <TableCell>{emergency.severity}</TableCell>
                <TableCell>{emergency.latitude}, {emergency.longitude}</TableCell>
                <TableCell>{emergency.details}</TableCell>
                <TableCell>{new Date(emergency.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewEmergencies;