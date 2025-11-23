import React from 'react';
import '../styles/ContentPages.css';

const sectionPlaceholders = [
  {
    heading: 'Section heading',
    lines: 3,
  },
  {
    heading: 'Another section heading',
    lines: 2,
  },
  {
    heading: 'Closing thoughts',
    lines: 2,
  },
];

const BlogOutline = () => (
  <div className="blog-post-container blog-outline">
    <article className="blog-post-header">
      <h1>Blog post title</h1>
      <div className="meta-row">
        <span>Author name</span>
        <span>•</span>
        <span>Publish date</span>
        <span>•</span>
        <span>Estimated read time</span>
      </div>
      <div className="blog-post-image blog-outline__image" aria-hidden="true" />
    </article>

    <div className="blog-post-body">
      {sectionPlaceholders.map((section) => (
        <section key={section.heading} className="blog-outline__section">
          <h2>{section.heading}</h2>
          <div className="blog-outline__placeholder-group">
            {Array.from({ length: section.lines }).map((_, index) => (
              <div key={index} className="blog-outline__placeholder-line" />
            ))}
          </div>
        </section>
      ))}

      <div className="inline-links">
        <span className="blog-outline__placeholder-link" />
        <span className="blog-outline__placeholder-link" />
        <span className="blog-outline__placeholder-link" />
      </div>
    </div>
  </div>
);

export default BlogOutline;
