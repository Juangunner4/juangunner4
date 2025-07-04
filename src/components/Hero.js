import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';
import { useTranslation, Trans } from 'react-i18next';

const Hero = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();

  return (
    <Box className="hero-container">
      <Typography variant="h3" component="h1" gutterBottom className="hero-title">
        {t('hero.welcome')}
      </Typography>
      {isWeb3 ? (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          {t('hero.web3text')}
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          <Trans i18nKey="hero.web2text" components={{
            1: <span className="coding" />,
            3: <span className="crypto"><i className="fab fa-bitcoin" /></span>,
            5: <span className="football"><i className="fas fa-futbol" /></span>
          }} />
        </Typography>
      )}
      <Button variant="contained" href="/projects" className="project-button">
        {t('hero.viewProjects')}
      </Button>
    </Box>
  );
};

export default Hero;
