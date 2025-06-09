import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Hero = () => (
  <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#ff0000', color: 'white' }}>
    <Typography variant="h3" component="h1" gutterBottom>
      Welcome to Juangunner4
    </Typography>
    <Typography variant="h6" gutterBottom>
      Follow my journey as a software engineer and footballer
    </Typography>
    <Button
      variant="contained"
      href="/projects"
      sx={{ backgroundColor: '#ff0000', '&:hover': { backgroundColor: '#cc0000' } }}
    >
      View Projects
    </Button>
  </Box>
);

export default Hero;
