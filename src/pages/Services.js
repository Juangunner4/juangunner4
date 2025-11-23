import React from 'react';
import '../styles/ContentPages.css';
import { services } from '../utils/siteContent';
import { Link } from 'react-router-dom';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const Services = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Services</h1>
        <p>Hands-on support for builders, teams, and creators who need momentum.</p>
      </div>

      <div className="page-grid">
        {services.map((service) => (
          <div key={service.title} className="page-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className="page-section">
        <h2>Ready to collaborate?</h2>
        <p>
          Tell me about your project scope, timeline, and goals. I will reply with a short plan and next steps within 48 hours.
        </p>
        <Link className="cta-button" to={`${basePath}/contact`}>
          Contact me
        </Link>
      </div>
    </div>
  );
};

export default Services;
