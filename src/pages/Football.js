import React from 'react';
import '../styles/ContentPages.css';
import villarrealLogo from '../assets/villarreallogo.png';
import alexandrialogo from '../assets/alexandrialogo.png';
import sycLogo from '../assets/syc.jpg';
import waynesboroLogo from '../assets/waynesboro.jpg';
import shenandoahLogo from '../assets/shenandoah.png';
import emuLogo from '../assets/emu.png';
import horizonsedgelogo from '../assets/horizonsedgelogo.png';
import { useTranslation } from 'react-i18next';

const getExperiences = (t) => [
  {
    title: t('football.experiences.alexandriaReds.title'),
    company: t('football.experiences.alexandriaReds.company'),
    location: t('football.experiences.alexandriaReds.location'),
    date: t('football.experiences.alexandriaReds.date'),
    description: t('football.experiences.alexandriaReds.description'),
    skills: t('football.experiences.alexandriaReds.skills', { returnObjects: true }),
    logo: alexandrialogo,
  },
  {
    title: t('football.experiences.villarreal.title'),
    company: t('football.experiences.villarreal.company'),
    location: t('football.experiences.villarreal.location'),
    date: t('football.experiences.villarreal.date'),
    description: t('football.experiences.villarreal.description'),
    skills: t('football.experiences.villarreal.skills', { returnObjects: true }),
    logo: villarrealLogo,
  },
  {
    title: t('football.experiences.villarealPlayer.title'),
    company: t('football.experiences.villarealPlayer.company'),
    location: t('football.experiences.villarealPlayer.location'),
    date: t('football.experiences.villarealPlayer.date'),
    description: t('football.experiences.villarealPlayer.description'),
    skills: t('football.experiences.villarealPlayer.skills', { returnObjects: true }),
    logo: villarrealLogo,
  },
  {
    title: t('football.experiences.sycCoach.title'),
    company: t('football.experiences.sycCoach.company'),
    location: t('football.experiences.sycCoach.location'),
    date: t('football.experiences.sycCoach.date'),
    skills: t('football.experiences.sycCoach.skills', { returnObjects: true }),
    logo: sycLogo,
  },
  {
    title: t('football.experiences.sycPlayer.title'),
    company: t('football.experiences.sycPlayer.company'),
    location: t('football.experiences.sycPlayer.location'),
    date: t('football.experiences.sycPlayer.date'),
    description: t('football.experiences.sycPlayer.description'),
    skills: t('football.experiences.sycPlayer.skills', { returnObjects: true }),
    logo: sycLogo,
  },
  {
    title: t('football.experiences.waynesboro.title'),
    company: t('football.experiences.waynesboro.company'),
    location: t('football.experiences.waynesboro.location'),
    date: t('football.experiences.waynesboro.date'),
    description: t('football.experiences.waynesboro.description'),
    logo: waynesboroLogo,
  },
  {
    title: t('football.experiences.shenandoah.title'),
    company: t('football.experiences.shenandoah.company'),
    location: t('football.experiences.shenandoah.location'),
    date: t('football.experiences.shenandoah.date'),
    description: t('football.experiences.shenandoah.description'),
    logo: shenandoahLogo,
  },
  {
    title: t('football.experiences.horizonsEdge.title'),
    company: t('football.experiences.horizonsEdge.company'),
    location: t('football.experiences.horizonsEdge.location'),
    date: t('football.experiences.horizonsEdge.date'),
    description: t('football.experiences.horizonsEdge.description'),
    skills: t('football.experiences.horizonsEdge.skills', { returnObjects: true }),
    logo: horizonsedgelogo,
  },
  {
    title: t('football.experiences.emu.title'),
    company: t('football.experiences.emu.company'),
    location: t('football.experiences.emu.location'),
    date: t('football.experiences.emu.date'),
    description: t('football.experiences.emu.description'),
    skills: t('football.experiences.emu.skills', { returnObjects: true }),
    logo: emuLogo,
  },
];

const Football = () => {
  const { t } = useTranslation();
  const experiences = getExperiences(t);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{t('football.heading')}</h1>
        <p>{t('football.subheading')}</p>
      </div>

      <div className="page-section">
        <div className="timeline">
          {experiences.map((experience, index) => (
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

export default Football;