import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTradingPlatformById } from '../utils/tradingPlatforms';
import { getProfileBasePath } from '../utils/profileRouting';
import '../styles/TradingPlatform.css';

const TradingPlatform = () => {
  const { platformId, profileType } = useParams();
  const isProfileWeb3 = profileType === 'web3';
  const { t } = useTranslation();

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

  return (
    <div className="platform-page">
      <div className="platform-page__breadcrumbs">
        <Link to={getProfileBasePath(expectedIsWeb3)}>{t('navbar.home')}</Link>
        <span aria-hidden="true">/</span>
        <Link to={backLink}>{t('about.trade.details.backToList')}</Link>
        <span aria-hidden="true">/</span>
        <span className="platform-page__breadcrumb-current">{platformName}</span>
      </div>

      <header className="platform-page__header">
        <div className="platform-page__eyebrow">
          {t('about.trade.details.heading')}
        </div>
        <h1>{platformName}</h1>
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
            {platformLinkLabel}
          </a>
          <Link className="platform-page__secondary" to={backLink}>
            {t('about.trade.details.backToList')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TradingPlatform;
