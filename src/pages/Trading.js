import React, { useEffect, useRef, useState } from 'react';
import '../styles/ContentPages.css';
import '../styles/About.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { getFaviconUrl } from '../utils/favicon';
import tradingPlatforms, { TRADE_CATEGORIES } from '../utils/tradingPlatforms';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Trading = () => {
  const [selectedCategory, setSelectedCategory] = useState('trade');
  const [copyStatus, setCopyStatus] = useState({ code: '', error: false });
  const copyTimeoutRef = useRef(null);
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  // Set category based on profile
  const tradeCategoryForProfile = isWeb3 ? 'trade' : 'invest';

  useEffect(() => {
    setSelectedCategory(tradeCategoryForProfile);
  }, [tradeCategoryForProfile]);

  const isTradeCategory = TRADE_CATEGORIES.includes(selectedCategory);
  const shouldShowTradeSection = isTradeCategory;
  const isInvestCategory = selectedCategory === 'invest';

  useEffect(() => {
    setCopyStatus({ code: '', error: false });
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, [selectedCategory]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedCategory = params.get('category');

    if (requestedCategory && TRADE_CATEGORIES.includes(requestedCategory)) {
      setSelectedCategory(requestedCategory);
    }
  }, [location.search]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigateToPlatform = (platformId) => {
    const basePath = getProfileBasePath(isWeb3);
    navigate(`${basePath}/${platformId}`);
  };

  const handleCopyCode = (code) => {
    const markSuccess = () => {
      setCopyStatus({ code, error: false });
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(
        () => {
          setCopyStatus({ code: '', error: false });
          copyTimeoutRef.current = null;
        },
        2000,
      );
    };

    const markError = () => {
      setCopyStatus({ code, error: true });
    };

    const fallbackCopy = () => {
      try {
        if (typeof document === 'undefined') {
          throw new Error('Document not available');
        }
        const tempInput = document.createElement('input');
        tempInput.value = code;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        markSuccess();
      } catch (error) {
        markError();
      }
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(markSuccess).catch(fallbackCopy);
      return;
    }

    fallbackCopy();
  };

  const tradeSectionClass = shouldShowTradeSection
    ? `trade-section trade-section--${selectedCategory}`
    : '';

  const categoryPlatforms = tradingPlatforms[selectedCategory] || [];
  const platformsBySection = categoryPlatforms.reduce((acc, platform) => {
    const sectionKey = isInvestCategory ? platform.section || 'investing' : 'default';
    if (!acc[sectionKey]) {
      acc[sectionKey] = [];
    }
    acc[sectionKey].push(platform);
    return acc;
  }, {});

  const orderedSections = isInvestCategory ? ['investing', 'trading'] : ['default'];

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{isWeb3 ? t('trading.headingWeb3') : t('trading.heading')}</h1>
        <p>{isWeb3 ? t('trading.subheadingWeb3') : t('trading.subheading')}</p>
      </div>

      <div className="page-section">
        {shouldShowTradeSection && (
          <section className={tradeSectionClass}>
            <h3>{t(`about.trade.categories.${selectedCategory}.heading`)}</h3>
            <p className="trade-description">
              {t(`about.trade.categories.${selectedCategory}.description`)}
            </p>
            {isInvestCategory && (
              <div className="trade-section__header">
                <h4>{t('about.trade.categories.invest.sectionHeading')}</h4>
                <p className="trade-section__subheading">
                  {t('about.trade.categories.invest.sectionDescription')}
                </p>
              </div>
            )}
            {orderedSections.map((sectionKey) => {
              const platforms = platformsBySection[sectionKey] || [];

              if (!platforms.length) {
                return null;
              }

              const sectionTitle = isInvestCategory
                ? t(`about.trade.categories.invest.sections.${sectionKey}.title`)
                : null;
              const sectionDescription = isInvestCategory
                ? t(`about.trade.categories.invest.sections.${sectionKey}.description`)
                : null;

              return (
                <div key={sectionKey} className="trade-section__group">
                  {isInvestCategory && (
                    <div className="trade-section__group-header">
                      <h4 className="trade-section__group-title">{sectionTitle}</h4>
                      <p className="trade-section__group-description">{sectionDescription}</p>
                    </div>
                  )}
                  <div className="referrals-grid">
                    {platforms.map((platform) => {
                      const isActivePlatform =
                        platform.code && copyStatus.code === platform.code;
                      const platformName = t(
                        `about.trade.categories.${selectedCategory}.platforms.${platform.id}.name`,
                      );
                      const platformDescription = t(
                        `about.trade.categories.${selectedCategory}.platforms.${platform.id}.description`,
                      );
                      const platformLinkLabel = t(
                        `about.trade.categories.${selectedCategory}.platforms.${platform.id}.linkLabel`,
                      );
                      const faviconUrl =
                        platform.faviconUrl || getFaviconUrl(platform.link, platform.faviconDomain);

                      return (
                        <article
                          key={platform.id}
                          className="referral-card"
                          tabIndex={0}
                          role="button"
                          onClick={() => handleNavigateToPlatform(platform.id)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              handleNavigateToPlatform(platform.id);
                            }
                          }}
                        >
                          <div className="referral-logo">
                            {faviconUrl && (
                              <img
                                src={faviconUrl}
                                alt={`${platformName} favicon`}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  const fallback = e.target.parentNode.querySelector('.referral-logo--fallback');
                                  if (fallback) {
                                    fallback.style.display = 'flex';
                                  }
                                }}
                                onLoad={(e) => {
                                  const fallback = e.target.parentNode.querySelector('.referral-logo--fallback');
                                  if (fallback) {
                                    fallback.style.display = 'none';
                                  }
                                }}
                              />
                            )}
                            <div
                              className="referral-logo--fallback"
                              style={{ display: 'flex' }}
                              role="img"
                              aria-label={`${platformName} placeholder icon`}
                            >
                              <span aria-hidden="true">{platformName.charAt(0)}</span>
                            </div>
                          </div>
                          <h4>{platformName}</h4>
                          <p>{platformDescription}</p>
                          {platform.tags && platform.tags.length > 0 && (
                            <div className="referral-tags">
                              <span className="referral-tags__label">
                                {t('about.trade.tagsLabel')}
                              </span>
                              <ul>
                                {platform.tags.map((tag) => (
                                  <li key={tag} className="referral-tag">
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <a
                            className="referral-link"
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <span className="referral-link__label">{platformLinkLabel}</span>
                            <OpenInNewIcon
                              className="referral-link__icon"
                              fontSize="inherit"
                              aria-hidden="true"
                            />
                          </a>
                          {platform.code && (
                            <div className="referral-code" aria-live="polite">
                              <span>{t('about.trade.referralCodeLabel')}</span>
                              <code>{platform.code}</code>
                              <button
                                type="button"
                                className="copy-button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleCopyCode(platform.code);
                                }}
                              >
                                {isActivePlatform && !copyStatus.error
                                  ? t('about.trade.copied')
                                  : t('about.trade.copyCode')}
                              </button>
                              {isActivePlatform && copyStatus.error && (
                                <p className="copy-error" role="alert">
                                  {t('about.trade.copyError')}
                                </p>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default Trading;
