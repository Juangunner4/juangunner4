import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentPages.css';
import BlogOutline from '../components/BlogOutline';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const Blog = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Blog</h1>
        <p>Long-form articles will be published here after the writing schedule is finalized.</p>
      </div>

      <div className="page-section">
        <p>The layout below shows how each entry will be structured once drafts are ready.</p>
        <BlogOutline />
        <Link className="cta-button" to={`${basePath}/contact`} style={{ marginTop: 16 }}>
          Connect about future articles
        </Link>
      </div>
    </div>
  );
};

export default Blog;
