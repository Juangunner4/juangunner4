import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentPages.css';
import BlogOutline from '../components/BlogOutline';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{isWeb3 ? t('blog.headingWeb3') : t('blog.heading')}</h1>
        <p>{isWeb3 ? t('blog.subheadingWeb3') : t('blog.subheading')}</p>
      </div>

      <div className="page-section">
        <p>{t('blog.layoutDescription')}</p>
        <BlogOutline />
        <Link className="cta-button" to={`${basePath}/contact`} style={{ marginTop: 16 }}>
          {t('blog.ctaButton')}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
