import React, { useState } from 'react';
import '../styles/Projects.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';

const projectData = [
  { domain: 'angelstowinghva.com', tags: ['web2', 'service'] },
  { domain: 'dosamigosmoving.com', tags: ['web2', 'business', 'landing page', 'backend'] },
  { domain: 'eaglevisionsoccertraining.com', tags: ['web2', 'sports', 'service', 'landing page'] },
  { domain: 'goshenretirementhomes.com', tags: ['web2', 'business', 'landing page'] },
  { domain: 'perionsol.xyz', tags: ['web3', 'meme', 'landing page'] },
  { domain: 'dogwif.hair', tags: ['web3', 'meme', 'openai', 'landing page'] },
];

const devProjectData = [
  {
    name: 'Primos NFT Marketplace',
    logo: 'https://primos-marketplace.vercel.app/favicon.ico',
    tags: ['web3', 'frontend', 'backend'],
    environments: {
      dev: 'https://primos-marketplace.vercel.app/',
      test: 'https://primos-marketplace.onrender.com/',
    },
  },
];

const Projects = () => {
  const [view, setView] = useState('production');
  const [openProject, setOpenProject] = useState(null);
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();

  const filteredProjectData = projectData.filter((p) =>
    isWeb3 ? p.tags.includes('web3') : p.tags.includes('web2')
  );

  const filteredDevProjectData = devProjectData.filter((p) =>
    isWeb3 ? p.tags.includes('web3') : p.tags.includes('web2')
  );

  return (
    <div className="projects-page">
      <h2>{t('projects.heading')}</h2>
      <div className="event-buttons">
        <button
          className={`event-btn ${view === 'production' ? 'active' : ''}`}
          onClick={() => setView('production')}
        >
          {t('projects.production')}
        </button>
        <button
          className={`event-btn ${view === 'development' ? 'active' : ''}`}
          onClick={() => setView('development')}
        >
          {t('projects.development')}
        </button>
      </div>
      {view === 'production' && (
        <div className="projects-container">
          {filteredProjectData.map((project, index) => (
            <div key={index} className="project-card">
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
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
      )}

      {view === 'development' && (
        <div className="projects-container">
          {filteredDevProjectData.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() => setOpenProject(index)}
            >
              <div className="project-link">
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  className="project-favicon"
                />
                <h3>{project.name}</h3>
              </div>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {openProject !== null && view === 'development' && (
        <>
          <div className="side-panel-overlay" onClick={() => setOpenProject(null)} />
          <div className="side-panel">
            <button className="close-btn" onClick={() => setOpenProject(null)}>
              &times;
            </button>
            <h3>{filteredDevProjectData[openProject].name}</h3>
            <div className="env-icons">
              <a
                href={filteredDevProjectData[openProject].environments.dev}
                target="_blank"
                rel="noopener noreferrer"
                className="env-icon"
              >
                <i className="fas fa-wrench" /> Dev
              </a>
              <a
                href={filteredDevProjectData[openProject].environments.test}
                target="_blank"
                rel="noopener noreferrer"
                className="env-icon"
              >
                <i className="fas fa-vial" /> Test
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
