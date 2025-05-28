import React from 'react';
import '../styles/Projects.css';

const projectData = [
  { domain: 'angelstowinghva.com', tags: ['web2', 'service'] },
  { domain: 'dosamigosmoving.com', tags: ['web2', 'business', 'landing page', 'backend'] },
  { domain: 'eaglevisionsoccertraining.com', tags: ['web2', 'sports', 'service', 'landing page'] },
  { domain: 'goshenretirementhomes.com', tags: ['web2', 'business', 'landing page'] },
  { domain: 'perionsol.xyz', tags: ['web3', 'meme', 'landing page'] },
];

const Projects = () => {
  return (
    <div className="projects-page">
      <h2>Projects</h2>
      <div className="projects-container">
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
            <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer" className="project-link">
              <img
                src={project.logo ? project.logo : `https://${project.domain}/favicon.ico`}
                alt={`${project.domain} favicon`}
                className="project-favicon"
              />
              <h3>{project.domain}</h3>
            </a>
            <div className="tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
