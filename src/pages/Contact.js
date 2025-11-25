import React from 'react';
import '../styles/ContentPages.css';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);
  const { t } = useTranslation();

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{t('contact.heading')}</h1>
        <p>{t('contact.subheading')}</p>
      </div>

      <div className="page-section">
        <h2>{t('contact.formHeading')}</h2>
        <p>{t('contact.formDescription')}</p>
        <form className="page-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <label className="page-card" htmlFor="name">
            <span>{t('contact.nameLabel')}</span>
            <input id="name" name="name" type="text" placeholder={t('contact.namePlaceholder')} style={{ marginTop: 8, padding: 10 }} />
          </label>
          <label className="page-card" htmlFor="email">
            <span>{t('contact.emailLabel')}</span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t('contact.emailPlaceholder')}
              style={{ marginTop: 8, padding: 10 }}
            />
          </label>
          <label className="page-card" htmlFor="topic">
            <span>{t('contact.topicLabel')}</span>
            <input id="topic" name="topic" type="text" placeholder={t('contact.topicPlaceholder')} style={{ marginTop: 8, padding: 10 }} />
          </label>
        </form>
        <div style={{ marginTop: 14 }}>
          <a className="cta-button" href="mailto:juanje1019@gmail.com">
            Email juanje1019@gmail.com
          </a>
        </div>
      </div>

      <div className="page-section">
        <h2>{t('contact.socialsHeading')}</h2>
        <div className="inline-links">
          <a href="https://x.com/Juangunner4" target="_blank" rel="noopener noreferrer">
            {t('contact.xTwitter')}
          </a>
          <a href="https://www.instagram.com/juangunner4" target="_blank" rel="noopener noreferrer">
            {t('contact.instagram')}
          </a>
          <a href="https://www.youtube.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            {t('contact.youtube')}
          </a>
          <a href="https://www.tiktok.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            {t('contact.tiktok')}
          </a>
        </div>
        <p style={{ marginTop: 12 }}>
          {t('contact.callNote')}
        </p>
        <p>
          {t('contact.servicesNote')} <Link to={`${basePath}/services`}>{t('contact.servicesLink')}</Link> {t('contact.servicesNote2')}
        </p>
      </div>
    </div>
  );
};

export default Contact;
