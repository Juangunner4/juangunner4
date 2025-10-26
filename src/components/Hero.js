import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getProfileBasePath } from '../utils/profileRouting';

const Hero = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <Box className="hero-container">
      <Typography variant="h3" component="h1" gutterBottom className="hero-title">
        {t('hero.welcome')}
      </Typography>
      {isWeb3 ? (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          <Trans
            i18nKey="hero.web3text"
            components={{
              x: (
                <a
                  href="https://x.com/0x1JuanGunner4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  aria-label={t('hero.links.web3X')}
                />
              )
            }}
          />
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom className="hero-subtitle">
          <Trans
            i18nKey="hero.web2text"
            components={{
              x: (
                <a
                  href="https://x.com/Juangunner4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  aria-label={t('hero.links.web2X')}
                />
              ),
              ig: (
                <a
                  href="https://www.instagram.com/juangunner4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  aria-label={t('hero.links.instagram')}
                />
              )
            }}
          />
        </Typography>
      )}
      <Button
        variant="contained"
        component={Link}
        to={`${basePath}/projects`}
        className="project-button"
      >
        {t('hero.viewProjects')}
      </Button>
    </Box>
  );
};

export default Hero;
