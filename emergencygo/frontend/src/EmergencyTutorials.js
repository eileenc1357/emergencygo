import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Emergency Procedure Tutorials</h1>
      {tutorials.map((section, index) => (
        <Accordion key={index} sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{section.category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-disc pl-5 space-y-2">
              {section.videos.map((video, idx) => (
                <li key={idx}>
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {video.title}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default EmergencyTutorials;