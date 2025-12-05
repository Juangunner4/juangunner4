import React, { useState } from 'react';
import '../styles/Projects.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';
import web3Placeholder from '../assets/web3.jpg';

const projectData = [
  { domain: 'angelstowinghva.com', tags: ['web2', 'service'] },
  { domain: 'dosamigosmoving.com', tags: ['web2', 'business', 'landing page', 'backend'] },
  { domain: 'goshenretirementhomes.com', tags: ['web2', 'business', 'landing page'] },
  { domain: 'perionsol.xyz', tags: ['web3', 'meme', 'landing page'] },
  {
    domain: 'Sleepagotchi (Solana Mobile)',
    url: 'https://mcpst.app.link/7s1pISJjCYb',
    logo: web3Placeholder,
    tags: ['web3', 'mobile', 'wellness'],
  },
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
  {
    name: 'footballcoin.fun',
    logo: 'https://footballcoin.fun/favicon.ico',
    tags: ['web3'],
    environments: {
      dev: 'https://website-07c113b9.ehn.vdj.temporary.site/',
      test: 'https://footballcoin.fun',
    },
  },
  {
    name: 'Photographer Portfolio',
    logo: 'https://website-47f9b91f.ehn.vdj.temporary.site/favicon.ico',
    tags: ['web2', 'portfolio'],
    environments: {
      dev: 'https://website-47f9b91f.ehn.vdj.temporary.site/',
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
                href={project.url ? project.url : `https://${project.domain}`}
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
              {Object.entries(filteredDevProjectData[openProject].environments || {}).map(
                ([environment, url]) => {
                  const iconMap = {
                    dev: { className: 'fas fa-wrench', label: 'Dev' },
                    test: { className: 'fas fa-vial', label: 'Test' },
                    staging: { className: 'fas fa-layer-group', label: 'Staging' },
                    preview: { className: 'fas fa-eye', label: 'Preview' },
                    production: { className: 'fas fa-rocket', label: 'Production' },
                  };

                  const { className, label } = iconMap[environment] || {
                    className: 'fas fa-link',
                    label: environment.charAt(0).toUpperCase() + environment.slice(1),
                  };

                  return (
                    <a
                      key={environment}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="env-icon"
                    >
                      <i className={className} /> {label}
                    </a>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Projects;
