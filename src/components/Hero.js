import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getProfileBasePath } from '../utils/profileRouting';

const Hero = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);

  const linkItems = [
    {
      key: 'x',
      label: t(isWeb3 ? 'hero.links.xWeb3' : 'hero.links.xWeb2'),
      icon: 'fa-brands fa-x-twitter',
      external: true,
      href: isWeb3 ? 'https://x.com/0x1JuanGunner4' : 'https://x.com/Juangunner4',
      ariaLabel: t(isWeb3 ? 'hero.links.xWeb3' : 'hero.links.xWeb2'),
    },
    {
      key: 'instagram',
      label: t(isWeb3 ? 'hero.links.instagramWeb3' : 'hero.links.instagramWeb2'),
      icon: 'fa-brands fa-instagram',
      external: true,
      href: isWeb3
        ? 'https://www.instagram.com/0x1juangunner4'
        : 'https://www.instagram.com/juangunner4/',
      ariaLabel: t(isWeb3 ? 'hero.links.instagramWeb3' : 'hero.links.instagramWeb2'),
    },
    {
      key: 'tiktok',
      label: t('hero.links.tiktok'),
      icon: 'fa-brands fa-tiktok',
      external: true,
      href: 'https://www.tiktok.com/@0x1juangunner4?',
      ariaLabel: t('hero.links.tiktok'),
    },
    {
      key: 'projects',
      label: t('hero.links.projects'),
      icon: 'fa-solid fa-diagram-project',
      external: false,
      to: `${basePath}/projects`,
      ariaLabel: t('hero.links.projects'),
    },
    {
      key: 'about',
      label: t('hero.links.about'),
      icon: 'fa-solid fa-user',
      external: false,
      to: `${basePath}/about`,
      ariaLabel: t('hero.links.about'),
    },
  ];

  return (
    <Box className="hero-container">
      <Typography variant="h3" component="h1" gutterBottom className="hero-title">
        {t('hero.welcome')}
      </Typography>
      <Typography variant="subtitle1" className="hero-description">
        {t(isWeb3 ? 'hero.description.web3' : 'hero.description.web2')}
      </Typography>
      <Typography variant="h6" className="hero-linktree-heading">
        {t('hero.linktreeHeading')}
      </Typography>
      <Box className="hero-linktree">
        {linkItems.map((item) => {
          const buttonProps = item.external
            ? {
                component: 'a',
                href: item.href,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {
                component: Link,
                to: item.to,
              };

          return (
            <Button
              key={item.key}
              variant="contained"
              className="hero-linktree-button"
              aria-label={item.ariaLabel}
              {...buttonProps}
            >
              <span className="hero-linktree-icon">
                <i className={item.icon} aria-hidden="true" />
              </span>
              <span className="hero-linktree-label">{item.label}</span>
              {item.external && (
                <span className="hero-linktree-external" aria-hidden="true">
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </span>
              )}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Hero;
