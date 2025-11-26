import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentPages.css';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { useTranslation } from 'react-i18next';
import blogCover from '../assets/web3.jpg';

const Blog = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const basePath = getProfileBasePath(isWeb3);
  const latestBlog = t('blog.latest', { returnObjects: true });
  const latestSections = Array.isArray(latestBlog?.sections) ? latestBlog.sections : [];

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{isWeb3 ? t('blog.headingWeb3') : t('blog.heading')}</h1>
        <p>{isWeb3 ? t('blog.subheadingWeb3') : t('blog.subheading')}</p>
      </div>

      <div className="page-section blog-feature">
        <div className="blog-feature__media">
          <img src={blogCover} alt={latestBlog?.imageAlt} className="blog-feature__image" />
        </div>
        <div className="blog-feature__content">
          <div className="meta-row">
            <span>{latestBlog?.publishDate}</span>
            <span>•</span>
            <span>{latestBlog?.readTime}</span>
          </div>
          <h2>{latestBlog?.title}</h2>
          <p>{latestBlog?.summary}</p>
          <p className="blog-feature__note">{latestBlog?.newsletterNote}</p>
          <Link className="cta-button" to={`${basePath}/contact`} style={{ marginTop: 16 }}>
            {t('blog.ctaButton')}
          </Link>
        </div>
      </div>

      <div className="page-section">
        <h2>{t('blog.latestBodyHeading')}</h2>
        <p>{t('blog.layoutDescription')}</p>

        <article className="blog-post-body">
          {latestSections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <div className="inline-links">
            <Link to={`${basePath}/contact`}>{t('blog.ctaButton')}</Link>
            <Link to={`${basePath}/services`}>{t('blog.servicePrompt')}</Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
