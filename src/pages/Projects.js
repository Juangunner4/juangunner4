import React from 'react';
import '../styles/Projects.css';
import * as Tabs from '@radix-ui/react-tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsList from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
    devUrl: 'https://primos-marketplace.vercel.app/',
    testUrl: 'https://primos-marketplace.onrender.com/',
  },
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
      <h2>In Development</h2>
      <div className="dev-projects-container">
        {devProjectData.map((project, index) => (
          <Card key={index} className="dev-project-card" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {project.name}
              </Typography>
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
                  <Button variant="outlined" href={project.devUrl} target="_blank" rel="noopener noreferrer">
                    Visit Dev
                  </Button>
                </Tabs.Content>
                <Tabs.Content value="test">
                  <Button variant="outlined" href={project.testUrl} target="_blank" rel="noopener noreferrer">
                    Visit Test
                  </Button>
                </Tabs.Content>
              </Tabs.Root>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
