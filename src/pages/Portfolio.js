import React from 'react';
import '../styles/ContentPages.css';
import { portfolioProjects } from '../utils/siteContent';

const Portfolio = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Portfolio</h1>
        <p>A snapshot of recent builds, collaborations, and experiments.</p>
      </div>

      <div className="page-grid">
        {portfolioProjects.map((project) => (
          <div key={project.title} className="page-card page-image-card">
            <img src={project.image} alt="" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
