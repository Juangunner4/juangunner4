import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentPages.css';
import { blogPosts } from '../utils/siteContent';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const Blog = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Blog</h1>
        <p>Notes on building products, collaborating with teams, and growing community online.</p>
      </div>

      <div className="page-grid">
        {blogPosts.map((post) => (
          <article key={post.slug} className="page-card page-image-card">
            <img src={post.image} alt="" />
            <div className="meta-row">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="blog-card-actions">
              <span>{post.author}</span>
              <Link to={`${basePath}/blog/${post.slug}`}>Read more</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
