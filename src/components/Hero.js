import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';

const Hero = () => {
  const { isWeb3 } = useProfile();

  return (
    <Box className="hero-container">
      <Typography variant="h3" component="h1" gutterBottom className="hero-title">
        Welcome
      </Typography>
      {isWeb3 ? (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          I enjoy memes and trolling.
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          My name is Juan I enjoy{' '}
          <span className="coding">programming</span>,{' '}
          <span className="crypto"><i className="fab fa-bitcoin" /> crypto</span>, and{' '}
          <span className="football"><i className="fas fa-futbol" /> football</span>.
        </Typography>
      )}
      <Button variant="contained" href="/projects" className="project-button">
        View Projects
      </Button>
    </Box>
  );
};

export default Hero;
