import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Hero.css';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getProfileBasePath } from '../utils/profileRouting';
import { getRandomTradingPlatformForProfile } from '../utils/tradingPlatforms';
import { getFaviconUrl } from '../utils/favicon';

const Hero = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);

  const introText = isWeb3 ? t('hero.intro.web3') : t('hero.intro.web2');

  const randomPlatform = useMemo(
    () => getRandomTradingPlatformForProfile(isWeb3),
    [isWeb3],
  );

  const randomTradeLinkItem = randomPlatform
    ? (() => {
        const { id, link, faviconDomain, category } = randomPlatform;
        const translationBase = `about.trade.categories.${category}.platforms.${id}`;
        const platformName = t(`${translationBase}.name`);
        const primaryLabel = t(`${translationBase}.linkLabel`);
        const ariaLabel = t('hero.randomTrade.ariaLabel', {
          platform: platformName,
        });
        const faviconUrl = getFaviconUrl(link, faviconDomain);

        return {
          key: `trade-${id}`,
          primaryLabel,
          secondaryLabel: platformName,
          external: true,
          href: link,
          ariaLabel,
          faviconUrl,
          icon: 'fa-solid fa-chart-line',
          isRandomTrade: true,
        };
      })()
    : null;

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
    ...(randomTradeLinkItem ? [randomTradeLinkItem] : []),
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
      scrollTo: '.home-content',
      ariaLabel: t('hero.links.about'),
    },
  ];

  return (
    <Box className="hero-container">
      <Typography variant="h4" component="h1" gutterBottom className="hero-title">
        {introText}
      </Typography>
      <Box className="hero-linktree">
        {linkItems.map((item) => {
          const buttonProps = item.scrollTo
            ? {
                component: 'button',
                onClick: () => {
                  const element = document.querySelector(item.scrollTo);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                },
              }
            : item.external
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

          const labelClassName = item.isRandomTrade
            ? 'hero-linktree-label hero-random-trade-label'
            : 'hero-linktree-label';

          const labelContent = item.isRandomTrade ? (
            <>
              <span className="hero-random-trade-primary">{item.primaryLabel}</span>
              <span className="hero-random-trade-platform">{item.secondaryLabel}</span>
            </>
          ) : (
            item.label
          );

          const iconContent = item.isRandomTrade ? (
            item.faviconUrl ? (
              <img
                src={item.faviconUrl}
                alt=""
                className="hero-linktree-favicon"
                aria-hidden="true"
              />
            ) : (
              <i className={item.icon} aria-hidden="true" />
            )
          ) : (
            <i className={item.icon} aria-hidden="true" />
          );

          return (
            <Button
              key={item.key}
              variant="contained"
              className="hero-linktree-button"
              aria-label={item.ariaLabel}
              {...buttonProps}
            >
              <span className="hero-linktree-icon">
                {iconContent}
              </span>
              <span className={labelClassName}>{labelContent}</span>
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
