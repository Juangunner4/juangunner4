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

  // Define Web3-specific service
  const web3Services = [
    {
      title: t('services.web3Services.incubation.title'),
      description: (
        <>
          <p><strong>{t('services.web3Services.incubation.description1')}</strong></p>
          <p>{t('services.web3Services.incubation.description2')}</p>
          <p><em>{t('services.web3Services.incubation.description3')}</em></p>
          <p>{t('services.web3Services.incubation.description4')}</p>
        </>
      ),
    },
    {
      title: t('services.web3Services.development.title'),
      description: (
        <>
          <p><strong>{t('services.web3Services.development.description1')}</strong></p>
          <p>{t('services.web3Services.development.description2')}</p>
          <p>{t('services.web3Services.development.description3')}</p>
          <p><em>{t('services.web3Services.development.description4')}</em></p>
        </>
      ),
    },
    {
      title: t('services.web3Services.streaming.title'),
      description: (
        <>
          <p><strong>{t('services.web3Services.streaming.description1')}</strong></p>
          <p>{t('services.web3Services.streaming.description2')}</p>
          <p>{t('services.web3Services.streaming.description3')}</p>
          <p><em>{t('services.web3Services.streaming.description4')}</em></p>
        </>
      ),
    },
  ];

  const displayServices = isWeb3 ? web3Services : services;

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{isWeb3 ? t('services.headingWeb3') : t('services.heading')}</h1>
        <p>{isWeb3 ? t('services.subheadingWeb3') : t('services.subheading')}</p>
      </div>

      <div className="page-grid">
        {displayServices.map((service) => (
          <div key={service.title} className="page-card">
            <h3>{service.title}</h3>
            <div>{service.description}</div>
          </div>
        ))}
      </div>

      <div className="page-section">
        <h2>Get in touch for any of these services</h2>
        <p>
          Interested in any of the services above? Let's discuss how we can work together.
        </p>
        <Link className="cta-button" to={`${basePath}/contact`}>
          Contact me
        </Link>
      </div>
    </div>
  );
};

export default Services;
