import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTradingPlatformById } from '../utils/tradingPlatforms';
import { getProfileBasePath } from '../utils/profileRouting';
import { getFaviconUrl } from '../utils/favicon';
import '../styles/TradingPlatform.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const TradingPlatform = () => {
  const { platformId, profileType } = useParams();
  const isProfileWeb3 = profileType === 'web3';
  const { t } = useTranslation();
  const [showFavicon, setShowFavicon] = useState(true);

  const platform = getTradingPlatformById(platformId);

  if (!platform) {
    return <Navigate to={getProfileBasePath(isProfileWeb3)} replace />;
  }

  const expectedIsWeb3 = platform.category === 'trade';

  if (expectedIsWeb3 !== isProfileWeb3) {
    return (
      <Navigate
        to={`${getProfileBasePath(expectedIsWeb3)}/${platformId}`}
        replace
      />
    );
  }

  const platformKey = `about.trade.categories.${platform.category}.platforms.${platform.id}`;
  const platformName = t(`${platformKey}.name`);
  const platformDescription = t(`${platformKey}.description`);
  const platformLinkLabel = t(`${platformKey}.linkLabel`);
  const backLink = `${getProfileBasePath(expectedIsWeb3)}/about?category=${platform.category}`;
  const faviconUrl = getFaviconUrl(platform.link, platform.faviconDomain);

  return (
    <div className="platform-page">
      <div className="platform-page__nav">
        <div className="platform-page__nav-actions" aria-label={t('about.trade.details.backToList')}>
          <Link className="platform-page__nav-button" to={getProfileBasePath(expectedIsWeb3)}>
            <HomeIcon className="platform-page__nav-icon" fontSize="inherit" aria-hidden="true" />
            <span className="platform-page__nav-label">{t('navbar.home')}</span>
          </Link>
          <Link className="platform-page__nav-button platform-page__nav-button--secondary" to={backLink}>
            <ArrowBackIcon
              className="platform-page__nav-icon"
              fontSize="inherit"
              aria-hidden="true"
            />
            <span className="platform-page__nav-label">{t('about.trade.details.backToList')}</span>
          </Link>
        </div>
      </div>

      <header className="platform-page__header">
        <div className="platform-page__eyebrow">
          {t('about.trade.details.heading')}
        </div>
        <div className="platform-page__title">
          {showFavicon && faviconUrl ? (
            <img
              src={faviconUrl}
              alt={`${platformName} favicon`}
              className="platform-page__favicon"
              onError={() => setShowFavicon(false)}
            />
          ) : (
            <div className="platform-page__favicon platform-page__favicon--fallback" aria-hidden="true">
              {platformName.charAt(0)}
            </div>
          )}
          <h1>{platformName}</h1>
        </div>
        <p className="platform-page__description">{platformDescription}</p>
      </header>

      <section className="platform-page__content">
        {platform.tags && platform.tags.length > 0 && (
          <div className="platform-page__section">
            <h2>{t('about.trade.tagsLabel')}</h2>
            <ul className="platform-page__tags">
              {platform.tags.map((tag) => (
                <li key={tag} className="platform-page__tag">{tag}</li>
              ))}
            </ul>
          </div>
        )}

        {platform.code && (
          <div className="platform-page__section">
            <h2>{t('about.trade.referralCodeLabel')}</h2>
            <code className="platform-page__code">{platform.code}</code>
          </div>
        )}

        <div className="platform-page__actions">
          <a
            className="platform-page__cta"
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{platformLinkLabel}</span>
            <OpenInNewIcon fontSize="inherit" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default TradingPlatform;
