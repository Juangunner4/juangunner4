import React from 'react';
import '../styles/ContentPages.css';
import fedexLogo from '../assets/fedExLogo.png';
import jbHuntLogo from '../assets/jbhlogo.png';
import freddieMacLogo from '../assets/freddieMac.png';
import naturalGardenLogo from '../assets/naturalGarden.jpg';
import mthreeLogo from '../assets/mthree.jpg';
import emuLogo from '../assets/emu.png';
import optionCareLogo from '../assets/OptionCare.jpg';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';

const getExperiences = (t) => [
  {
    title: t('career.experiences.optionCare.title'),
    company: t('career.experiences.optionCare.company'),
    location: t('career.experiences.optionCare.location'),
    date: t('career.experiences.optionCare.date'),
    description: t('career.experiences.optionCare.description'),
    logo: optionCareLogo,
  },
  {
    title: t('career.experiences.fedex.title'),
    company: t('career.experiences.fedex.company'),
    location: t('career.experiences.fedex.location'),
    date: t('career.experiences.fedex.date'),
    description: t('career.experiences.fedex.description'),
    logo: fedexLogo,
  },
  {
    title: t('career.experiences.jbhunt.title'),
    company: t('career.experiences.jbhunt.company'),
    location: t('career.experiences.jbhunt.location'),
    date: t('career.experiences.jbhunt.date'),
    description: t('career.experiences.jbhunt.description'),
    responsibilities: [
      t('career.experiences.jbhunt.responsibilities.0'),
      t('career.experiences.jbhunt.responsibilities.1'),
      t('career.experiences.jbhunt.responsibilities.2'),
      t('career.experiences.jbhunt.responsibilities.3'),
    ],
    logo: jbHuntLogo,
  },
  {
    title: t('career.experiences.freddieMac.title'),
    company: t('career.experiences.freddieMac.company'),
    location: t('career.experiences.freddieMac.location'),
    date: t('career.experiences.freddieMac.date'),
    description: t('career.experiences.freddieMac.description'),
    responsibilities: [
      t('career.experiences.freddieMac.responsibilities.0'),
      t('career.experiences.freddieMac.responsibilities.1'),
      t('career.experiences.freddieMac.responsibilities.2'),
    ],
    logo: freddieMacLogo,
  },
  {
    title: t('career.experiences.naturalGarden.title'),
    company: t('career.experiences.naturalGarden.company'),
    location: t('career.experiences.naturalGarden.location'),
    date: t('career.experiences.naturalGarden.date'),
    description: t('career.experiences.naturalGarden.description'),
    responsibilities: [
      t('career.experiences.naturalGarden.responsibilities.0'),
      t('career.experiences.naturalGarden.responsibilities.1'),
    ],
    logo: naturalGardenLogo,
  },
  {
    title: t('career.experiences.mthree.title'),
    company: t('career.experiences.mthree.company'),
    location: t('career.experiences.mthree.location'),
    date: t('career.experiences.mthree.date'),
    skills: [
      t('career.experiences.mthree.skills.0'),
      t('career.experiences.mthree.skills.1'),
      t('career.experiences.mthree.skills.2'),
      t('career.experiences.mthree.skills.3'),
      t('career.experiences.mthree.skills.4'),
    ],
    logo: mthreeLogo,
  },
  {
    title: t('career.experiences.emu.title'),
    company: t('career.experiences.emu.company'),
    location: t('career.experiences.emu.location'),
    date: t('career.experiences.emu.date'),
    responsibilities: [
      t('career.experiences.emu.responsibilities.0'),
      t('career.experiences.emu.responsibilities.1'),
      t('career.experiences.emu.responsibilities.2'),
    ],
    logo: emuLogo,
  },
  {
    title: t('career.experiences.emuTutor.title'),
    company: t('career.experiences.emuTutor.company'),
    location: t('career.experiences.emuTutor.location'),
    date: t('career.experiences.emuTutor.date'),
    description: t('career.experiences.emuTutor.description'),
    logo: emuLogo,
  },
];

const Career = () => {
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const experiences = getExperiences(t);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>{t('career.heading')}</h1>
        <p>{t('career.subheading')}</p>
      </div>

      <div className="page-section">
        {isWeb3 ? (
          <div className="timeline-empty">
            <p>{t('career.web3Placeholder')}</p>
          </div>
        ) : (
          <div className="timeline">
            {experiences.map((experience, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="company-logo">
                    <img
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                    />
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
        )}
      </div>
    </div>
  );
};

export default Career;
