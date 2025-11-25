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

const experiences = [
  {
    title: "UPSL Soccer Player",
    company: "Alexandria Reds",
    location: "Alexandria, Virginia, United States",
    date: "Apr 2025 - Aug 2025",
    description: "Midfielder and OutsideBack of the Semi-pro Alexandria Reds team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: alexandrialogo,
  },
  {
    title: "Head Youth Soccer Coach",
    company: "Villarreal CF, SAD",
    location: "Falls Church, Virginia, United States",
    date: "Apr 2023 - Apr 2025",
    description:
      "2015, 2016, and 2017 Boys Director and Coach. Junior Academy Director and Coach.",
    skills: ["Sports Coaching", "Athletics", "Soccer"],
    logo: villarrealLogo,
  },
  {
    title: "UPSL Soccer Player",
    company: "Villarreal VA Academy",
    location: "Falls Church, Virginia, United States",
    date: "Mar 2023 - Apr 2024",
    description: "Captain Midfielder of the Semi-pro Villarreal VA Academy team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: villarrealLogo,
  },
  {
    title: "Head Soccer Coach",
    company: "Springfield/South County Youth Club",
    location: "Springfield, Virginia, United States",
    date: "Jul 2022 - Jul 2023",
    skills: ["Sports Coaching", "Sports Management", "Athletics", "Soccer"],
    logo: sycLogo,
  },
  {
    title: "UPSL Soccer Player",
    company: "Springfield/South County Youth Club",
    location: "Springfield, Virginia, United States",
    date: "Jul 2022 - Jul 2023",
    description: "OutsideBack of the Semi-pro SYC United team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: sycLogo,
  },
  {
    title: "Head JV Coach",
    company: "Waynesboro High School",
    location: "Waynesboro, Virginia, United States",
    date: "Feb 2021 - Jun 2021",
    description:
      "Coached the JV soccer team, focusing on skill development and teamwork.",
    logo: waynesboroLogo,
  },
  {
    title: "Head Soccer Coach",
    company: "SHENANDOAH VALLEY UNITED INC",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2020 - Jan 2021",
    description: "Head Coach of a U17 travel soccer team playing in the CCL.",
    logo: shenandoahLogo,
  },
  {
    title: "U23 Pro Soccer Player",
    company: "Horizons Edge Sports Campus",
    location: "Harrisonburg, Virginia, United States",
    date: "Mar 2021 - Jul 2021",
    description: "Captain Midfielder and OutsideBack of the Horizons Edge United Mens soccer team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: horizonsedgelogo,
  },
  {
    title: "D3 College Soccer Player",
    company: "Eastern Mennonite University",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2016 - Jan 2020",
    description: "OutsideBack of the EMU Mens soccer team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: emuLogo,
  },
];

const Football = () => {
  const { t } = useTranslation();

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