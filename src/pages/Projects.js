import React, { useState } from 'react';
import '../styles/Projects.css';
import * as Tabs from '@radix-ui/react-tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsList from '@mui/material/Tabs';
import Button from '@mui/material/Button';

const projectData = [
  { domain: 'angelstowinghva.com', tags: ['web2', 'service'] },
  { domain: 'dosamigosmoving.com', tags: ['web2', 'business', 'landing page', 'backend'] },
  { domain: 'eaglevisionsoccertraining.com', tags: ['web2', 'sports', 'service', 'landing page'] },
  { domain: 'goshenretirementhomes.com', tags: ['web2', 'business', 'landing page'] },
  { domain: 'perionsol.xyz', tags: ['web3', 'meme', 'landing page'] },
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

  return (
    <div className="projects-page">
      <h2>Projects</h2>
      <div className="event-buttons">
        <button
          className={`event-btn ${view === 'production' ? 'active' : ''}`}
          onClick={() => setView('production')}
        >
          Production
        </button>
        <button
          className={`event-btn ${view === 'development' ? 'active' : ''}`}
          onClick={() => setView('development')}
        >
          In Development
        </button>
      </div>
      {view === 'production' && (
        <div className="projects-container">
          {projectData.map((project, index) => (
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
          {devProjectData.map((project, index) => (
            <div
              key={index}
              className="project-card"
              onClick={() =>
                setOpenProject(openProject === index ? null : index)
              }
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
              {openProject === index && (
                <div className="dev-env-tabs">
                  <Tabs.Root defaultValue="dev">
                    <Tabs.List asChild>
                      <TabsList component={Box} sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                        <Tabs.Trigger value="dev" asChild>
                          <Tab label="Dev" />
                        </Tabs.Trigger>
                        <Tabs.Trigger value="test" asChild>
                          <Tab label="Test" />
                        </Tabs.Trigger>
                      </TabsList>
                    </Tabs.List>
                    <Tabs.Content value="dev">
                      <Button
                        variant="outlined"
                        href={project.environments.dev}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Dev
                      </Button>
                    </Tabs.Content>
                    <Tabs.Content value="test">
                      <Button
                        variant="outlined"
                        href={project.environments.test}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Test
                      </Button>
                    </Tabs.Content>
                  </Tabs.Root>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
