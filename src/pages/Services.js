import React from 'react';
import '../styles/ContentPages.css';
import { services } from '../utils/siteContent';
import { Link } from 'react-router-dom';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{isWeb3 ? t('services.headingWeb3') : t('services.heading')}</h1>
        <p>{isWeb3 ? t('services.subheadingWeb3') : t('services.subheading')}</p>
      </div>

      <div className="page-grid">
        {services.map((service) => (
          <div key={service.title} className="page-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="page-section">
        <h2>{t('services.ctaHeading')}</h2>
        <p>
          {t('services.ctaDescription')}
        </p>
        <Link className="cta-button" to={`${basePath}/contact`}>
          {t('services.ctaButton')}
        </Link>
      </div>
    </div>
  );
};

export default Services;
