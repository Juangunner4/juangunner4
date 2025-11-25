import React from 'react';
import '../styles/ContentPages.css';
import fedexLogo from '../assets/fedExLogo.png';
import jbHuntLogo from '../assets/jbhlogo.png';
import freddieMacLogo from '../assets/freddieMac.png';
import naturalGardenLogo from '../assets/naturalGarden.jpg';
import mthreeLogo from '../assets/mthree.jpg';
import emuLogo from '../assets/emu.png';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';

const experiences = [
  {
    title: "Software Engineer",
    company: "FedEx Dataworks",
    location: "Remote",
    date: "Jun 2024 - Present",
    description:
      "Working on developing data-driven solutions and backend services for logistics and supply chain optimization.",
    logo: fedexLogo,
  },
  {
    title: "Software Engineer II",
    company: "J.B. Hunt Transport Services, Inc.",
    location: "Lowell, Arkansas, United States",
    date: "Aug 2022 - Jun 2024",
    description:
      "Developed and maintained APIs using Quarkus and Spring Boot. Deployed microservices on Azure using Kubernetes Lens.",
    responsibilities: [
      "Developed and updated APIs using Quarkus and Spring Boot.",
      "Used Azure and Kubernetes Lens for deployment.",
      "Practiced modern coding standards with JUnit testing.",
      "Completed frontend development training in Angular.",
    ],
    logo: jbHuntLogo,
  },
  {
    title: "Agile Developer, Associate II",
    company: "Freddie Mac",
    location: "McLean, Virginia, United States",
    date: "Nov 2020 - Aug 2022",
    description:
      "Developed and modernized applications using TDD with Spring Boot and Jenkins.",
    responsibilities: [
      "Used Spring Boot Java Framework to develop and update APIs.",
      "Practiced Test Driven Development (TDD).",
      "Deployed applications using Jenkins and OpenShift.",
    ],
    logo: freddieMacLogo,
  },
  {
    title: "Tech Consultant",
    company: "The Natural Garden, Inc.",
    location: "Harrisonburg, Virginia, United States",
    date: "May 2019 - Jan 2022",
    description:
      "Handled technical issues and implemented network upgrades for productivity.",
    responsibilities: [
      "Resolved issues related to macOS, Windows, Google Admin, and network administration.",
      "Upgraded WiFi network and staff computers.",
    ],
    logo: naturalGardenLogo,
  },
  {
    title: "Alumni Associate",
    company: "mthree",
    location: "Remote",
    date: "May 2020 - Nov 2020",
    skills: [
      "Production Support",
      "Disaster Recovery",
      "SQL",
      "Linux",
      "DevOps Fundamentals",
    ],
    logo: mthreeLogo,
  },
  {
    title: "Endpoint Technician",
    company: "Eastern Mennonite University",
    location: "Harrisonburg, Virginia, United States",
    date: "Jun 2019 - May 2020",
    responsibilities: [
      "Managed Apple and Windows environments through Jamf Pro and Fog.",
      "Provided setup, testing, installation, and maintenance services.",
      "Managed 3D printer, using Autodesk Inventor for part design.",
    ],
    logo: emuLogo,
  },
  {
    title: "Python Tutor",
    company: "Eastern Mennonite University",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2019 - Jan 2020",
    description:
      "Tutored students in Python for an introductory programming course.",
    logo: emuLogo,
  },
];

const Career = () => {
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();

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
