import React from 'react';
import '../styles/ContentPages.css';
import web3Placeholder from '../assets/web3.jpg';
import { useTranslation } from 'react-i18next';

const getExperiences = (t) => [
  {
    title: t('contentCreator.experiences.sns.title'),
    company: t('contentCreator.experiences.sns.company'),
    location: t('contentCreator.experiences.sns.location'),
    date: t('contentCreator.experiences.sns.date'),
    description: t('contentCreator.experiences.sns.description'),
    logo: web3Placeholder,
    faviconUrl: 'https://www.sns.id/',
  },
  {
    title: t('contentCreator.experiences.devFun.title'),
    company: t('contentCreator.experiences.devFun.company'),
    location: t('contentCreator.experiences.devFun.location'),
    date: t('contentCreator.experiences.devFun.date'),
    description: t('contentCreator.experiences.devFun.description'),
    logo: web3Placeholder,
    faviconUrl: 'https://dev.fun/',
  },
];

const ContentCreator = () => {
  const { t } = useTranslation();
  const contentCreatorExperiences = getExperiences(t);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{t('football.headingWeb3')}</h1>
        <p>{t('football.subheadingWeb3')}</p>
      </div>

      <div className="page-section">
        <div className="timeline">
          {contentCreatorExperiences.map((experience, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="company-logo">
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                  />
                  {experience.faviconUrl && (
                    <img
                      src={experience.faviconUrl}
                      alt={`${experience.company} favicon`}
                      className="company-favicon"
                      style={{
                        width: '16px',
                        height: '16px',
                        marginLeft: '8px',
                        borderRadius: '50%',
                        border: '2px solid white',
                        backgroundColor: 'white',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <h3>{experience.title}</h3>
                <h4>{experience.company}</h4>
                <p className="timeline-location">{experience.location}</p>
                <p className="timeline-date">{experience.date}</p>
                {experience.description && <p>{experience.description}</p>}
                {experience.responsibilities && (
                  <ul>
                    {experience.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}
                {experience.skills && (
                  <p className="timeline-skills">
                    <strong>Skills:</strong> {experience.skills.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
