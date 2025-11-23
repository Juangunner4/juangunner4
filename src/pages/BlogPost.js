import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/ContentPages.css';
import { blogPosts } from '../utils/siteContent';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="page-section">
          <h2>Post not found</h2>
          <p>The article you are looking for has moved. Check the latest entries below.</p>
          <Link className="cta-button" to={`${basePath}/blog`}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((entry) => entry.slug !== slug).slice(0, 2);

  return (
    <div className="blog-post-container">
      <article className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="meta-row">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <img className="blog-post-image" src={post.image} alt="" />
      </article>

      <div className="blog-post-body">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        ))}

        <div className="inline-links">
          <Link to={`${basePath}/services`}>View services</Link>
          <Link to={`${basePath}/portfolio`}>Explore the portfolio</Link>
          <Link to={`${basePath}/contact`}>Contact</Link>
        </div>
      </div>

      <div className="page-section" style={{ marginTop: 18 }}>
        <h2>Keep reading</h2>
        <div className="page-grid">
          {relatedPosts.map((entry) => (
            <div key={entry.slug} className="page-card">
              <h3>{entry.title}</h3>
              <p>{entry.excerpt}</p>
              <Link to={`${basePath}/blog/${entry.slug}`} className="cta-button" style={{ width: 'fit-content' }}>
                Read this next
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
