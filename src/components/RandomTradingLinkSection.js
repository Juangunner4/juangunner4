import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';
import { getRandomTradingPlatformForProfile } from '../utils/tradingPlatforms';
import { getFaviconUrl } from '../utils/favicon';

const RandomTradingLinkSection = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();

  const randomPlatform = useMemo(
    () => getRandomTradingPlatformForProfile(isWeb3),
    [isWeb3],
  );

  if (!randomPlatform) {
    return null;
  }

  const { id, link, faviconDomain, category } = randomPlatform;
  const translationBase = `about.trade.categories.${category}.platforms.${id}`;
  const platformName = t(`${translationBase}.name`);
  const linkLabel = t(`${translationBase}.linkLabel`);
  const ariaLabel = t('hero.randomTrade.ariaLabel', { platform: platformName });
  const faviconUrl = getFaviconUrl(link, faviconDomain);
  const heading = isWeb3
    ? t('hero.randomTrade.headingWeb3')
    : t('hero.randomTrade.headingWeb2');

  return (
    <section className="hero-random-trade-section">
      <Box className="hero-linktree">
        <Typography variant="h5" component="h2" className="hero-random-trade-heading">
          {heading}
        </Typography>
        <Button
          component="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          className="hero-linktree-button"
          aria-label={ariaLabel}
        >
          <span className="hero-linktree-icon">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt=""
                className="hero-linktree-favicon"
                aria-hidden="true"
              />
            ) : (
              <i className="fa-solid fa-chart-line" aria-hidden="true" />
            )}
          </span>
          <span className="hero-linktree-label hero-random-trade-label">
            <span className="hero-random-trade-primary">{linkLabel}</span>
            <span className="hero-random-trade-platform">{platformName}</span>
          </span>
          <span className="hero-linktree-external" aria-hidden="true">
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </span>
        </Button>
      </Box>
    </section>
  );
};

export default RandomTradingLinkSection;
