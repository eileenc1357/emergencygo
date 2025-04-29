import React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const tutorials = [
  {
    category: "First Aid",
    videos: [
      { title: "How to Perform CPR", url: "https://www.youtube.com/watch?v=-NodDRTsV88" },
      { title: "How to Stop Bleeding", url: "https://www.youtube.com/watch?v=6B_y7e1SKfw" },
    ]
  },
  {
    category: "Fire Safety",
    videos: [
      { title: "How to Use a Fire Extinguisher", url: "https://www.youtube.com/watch?v=GVBamXXVD30" },
      { title: "General Fire Safety", url: "https://www.youtube.com/watch?v=WiIGMWRKfQI" },
    ]
  },
  {
    category: "Roadside Emergencies",
    videos: [
      { title: "How to Change a Flat Tire", url: "https://www.youtube.com/watch?v=joBmbh0AGSQ" },
      { title: "How to Jump Start a Car", url: "https://www.youtube.com/watch?v=iI1o2hNy2hE" },
    ]
  }
];

function EmergencyTutorials() {
  return (
    <Box sx={{ 
      padding: 4, 
      maxWidth: 900, 
      margin: '40px auto', 
      backgroundColor: '#fff', 
      borderRadius: 2, 
      boxShadow: 2 
    }}>
      <Typography 
        variant="h4" 
        sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#b71c1c' }}
      >
        Emergency Procedure Tutorials
      </Typography>
      {tutorials.map((section, index) => (
        <Accordion 
          key={index} 
          sx={{ 
            mb: 2, 
            borderRadius: 2, 
            '&:before': { display: 'none' } // Remove default divider line
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
            sx={{ 
              backgroundColor: '#b71c1c', 
              color: '#fff', 
              borderRadius: 2, 
              padding: '0 16px',
              minHeight: '56px',
              '& .MuiAccordionSummary-content': { margin: '12px 0' }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
              {section.category}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ 
            backgroundColor: '#f7f7f7', 
            borderRadius: '0 0 8px 8px', 
            padding: 2 
          }}>
            <Paper elevation={0} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <List>
                {section.videos.map((video, idx) => (
                  <ListItem key={idx} sx={{ pl: 0, display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PlayCircleOutlineIcon sx={{ color: '#1976d2', mr: 1 }} />
                    <Link 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ color: '#1976d2', fontWeight: 500, fontSize: '1rem' }}
                    >
                      {video.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default EmergencyTutorials;