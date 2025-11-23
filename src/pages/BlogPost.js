import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentPages.css';
import BlogOutline from '../components/BlogOutline';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const BlogPost = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="blog-post-container">
      <div className="page-section">
        <h2>Blog post outline</h2>
        <p>
          Full articles will be added after the editorial plan is finalized. The template below shows the structure each entry
          will follow.
        </p>
        <Link className="cta-button" to={`${basePath}/blog`}>
          Return to Blog
        </Link>
      </div>

      <BlogOutline />
    </div>
  );
};

export default BlogPost;
