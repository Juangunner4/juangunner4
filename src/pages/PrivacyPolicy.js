import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/ContentPages.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{t('privacy.heading')}</h1>
        <p>{t('privacy.subheading')}</p>
      </div>

      <div className="page-section">
        <h2>{t('privacy.adsenseHeading')}</h2>
        <p>
          {t('privacy.adsenseText')}
        </p>
      </div>

      <div className="page-section">
        <h2>{t('privacy.cookiesHeading')}</h2>
        <p>
          {t('privacy.cookiesText')}
        </p>
      </div>

      <div className="page-section">
        <h2>{t('privacy.dataCollectionHeading')}</h2>
        <p>
          {t('privacy.dataCollectionText')}
        </p>
      </div>

      <div className="page-section">
        <h2>{t('privacy.partnersHeading')}</h2>
        <p>
          {t('privacy.partnersText')}
        </p>
      </div>

      <div className="page-section">
        <h2>{t('privacy.contactHeading')}</h2>
        <p>
          {t('privacy.contactText')}
          {' '}
          <a href="mailto:juanje1019@gmail.com">juanje1019@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
