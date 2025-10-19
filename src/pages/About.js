import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import fedexLogo from '../assets/fedExLogo.png';
import villarrealLogo from '../assets/villarreallogo.png';
import alexandrialogo from '../assets/alexandrialogo.png';
import jbHuntLogo from '../assets/jbhlogo.png';
import sycLogo from '../assets/syc.jpg';
import freddieMacLogo from '../assets/freddieMac.png';
import naturalGardenLogo from '../assets/naturalGarden.jpg';
import waynesboroLogo from '../assets/waynesboro.jpg';
import shenandoahLogo from '../assets/shenandoah.png';
import mthreeLogo from '../assets/mthree.jpg';
import emuLogo from '../assets/emu.png';
import horizonsedgelogo from '../assets/horizonsedgelogo.png';
import coinbaseLogo from '../assets/coinbase.svg';
import webullLogo from '../assets/webull.svg';
import web3Placeholder from '../assets/web3.jpg';
import profilePlaceholder from '../assets/profile.png';
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
    category: "software",
  },
  {
    title: "UPSL Soccer Player",
    company: "Alexandria Reds",
    location: "Alexandria, Virginia, United States",
    date: "Apr 2025 - Aug 2025",
    description: "Midfielder and OutsideBack of the Semi-pro Alexandria Reds team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: alexandrialogo,
    category: "soccer",
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
    category: "soccer",
  },
  {
    title: "UPSL Soccer Player",
    company: "Villarreal VA Academy",
    location: "Falls Church, Virginia, United States",
    date: "Mar 2023 - Apr 2024",
    description: "Captain Midfielder of the Semi-pro Villarreal VA Academy team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: villarrealLogo,
    category: "soccer",
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
    category: "software",
  },
  {
    title: "Head Soccer Coach",
    company: "Springfield/South County Youth Club",
    location: "Springfield, Virginia, United States",
    date: "Jul 2022 - Jul 2023",
    skills: ["Sports Coaching", "Sports Management", "Athletics", "Soccer"],
    logo: sycLogo,
    category: "soccer",
  },
  {
    title: "UPSL Soccer Player",
    company: "Springfield/South County Youth Club",
    location: "Springfield, Virginia, United States",
    date: "Jul 2022 - Jul 2023",
    description: "OutsideBack of the Semi-pro SYC United team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: sycLogo,
    category: "soccer",
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
    category: "software",
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
    category: "software",
  },
  {
    title: "Head JV Coach",
    company: "Waynesboro High School",
    location: "Waynesboro, Virginia, United States",
    date: "Feb 2021 - Jun 2021",
    description:
      "Coached the JV soccer team, focusing on skill development and teamwork.",
    logo: waynesboroLogo,
    category: "soccer",
  },
  {
    title: "Head Soccer Coach",
    company: "SHENANDOAH VALLEY UNITED INC",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2020 - Jan 2021",
    description: "Head Coach of a U17 travel soccer team playing in the CCL.",
    logo: shenandoahLogo,
    category: "soccer",
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
    category: "software",
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
    category: "software",
  },
  {
    title: "Python Tutor",
    company: "Eastern Mennonite University",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2019 - Jan 2020",
    description:
      "Tutored students in Python for an introductory programming course.",
    logo: emuLogo,
    category: "software",
  },
  {
    title: "U23 Pro Soccer Player",
    company: "Horizons Edge Sports Campus",
    location: "Harrisonburg, Virginia, United States",
    date: "Mar 2021 - Jul 2021",
    description: "Captain Midfielder and OutsideBack of the Horizons Edge United Mens soccer team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: horizonsedgelogo,
    category: "soccer",
  },
  {
    title: "D3 College Soccer Player",
    company: "Eastern Mennonite University",
    location: "Harrisonburg, Virginia, United States",
    date: "Aug 2016 - Jan 2020",
    description: "OutsideBack of the EMU Mens soccer team.",
    skills: ["Football", "Leadership", "Soccer"],
    logo: emuLogo,
    category: "soccer",
  },
];

const TRADE_CATEGORIES = ['invest', 'trade'];

const tradingPlatforms = {
  invest: [
    {
      id: 'webull',
      logo: webullLogo,
      link: 'https://a.webull.com/NMixfRYZu7bzStLzxT',
      tags: ['Tag TBD'],
    },
    {
      id: 'cashapp',
      link: 'https://cash.app/app/BWSDDQZ',
      tags: ['Tag TBD'],
      logo: profilePlaceholder,
    },
    {
      id: 'sofi',
      link: 'https://www.sofi.com/invite/money?gcp=3972bc11-fd65-4573-8eca-5afb3831d790&isAliasGcp=false',
      tags: ['Tag TBD'],
      logo: profilePlaceholder,
    },
  ],
  trade: [
    {
      id: 'okx',
      link: 'https://t.co/bgPKR6NG0R',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'ourbit',
      link: 'https://t.co/bVED6Lt670',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'aster',
      link: 'https://t.co/2Vp8ELVY5W',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'coinbase',
      logo: coinbaseLogo,
      link: 'https://coinbase.onelink.me/2ysS/rx5ndund?src=ios-link',
      tags: ['Tag TBD'],
    },
    {
      id: 'axiom',
      link: 'https://axiom.trade/@0x1juan',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'backpack',
      link: 'https://backpack.exchange/refer/4tji5qyt',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'drip',
      link: 'https://drip.market/?ref=juangunner4',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'sns',
      link: 'https://www.sns.id?ref=juangunner4',
      tags: ['Tag TBD'],
      logo: web3Placeholder,
    },
    {
      id: 'footballfun',
      link: 'https://pro.football.fun/login/?referral_code=UGCIJDHWTGL',
      tags: ['Football', 'Player Cards'],
      logo: web3Placeholder,
    },
  ],
};

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState('software');
  const [copyStatus, setCopyStatus] = useState({ code: '', error: false });
  const copyTimeoutRef = useRef(null);
  const { t } = useTranslation();
  const { isWeb3, setProfile } = useProfile();
  const tradeCategoryForProfile = isWeb3 ? 'trade' : 'invest';

  useEffect(() => {
    setSelectedCategory((previousCategory) =>
      TRADE_CATEGORIES.includes(previousCategory)
        ? tradeCategoryForProfile
        : previousCategory,
    );
  }, [tradeCategoryForProfile]);

  const isTradeCategory = TRADE_CATEGORIES.includes(selectedCategory);
  const shouldShowTradeSection =
    isTradeCategory && selectedCategory === tradeCategoryForProfile;
  const filteredExperiences = shouldShowTradeSection
    ? []
    : experiences.filter((exp) => exp.category === selectedCategory);

  useEffect(() => {
    setCopyStatus({ code: '', error: false });
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    if (category === 'invest') {
      setProfile(false);
    } else if (category === 'trade') {
      setProfile(true);
    }
  };

  const handleCopyCode = (code) => {
    const markSuccess = () => {
      setCopyStatus({ code, error: false });
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(
        () => {
          setCopyStatus({ code: '', error: false });
          copyTimeoutRef.current = null;
        },
        2000,
      );
    };

    const markError = () => {
      setCopyStatus({ code, error: true });
    };

    const fallbackCopy = () => {
      try {
        if (typeof document === 'undefined') {
          throw new Error('Document not available');
        }
        const tempInput = document.createElement('input');
        tempInput.value = code;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        markSuccess();
      } catch (error) {
        markError();
      }
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(markSuccess).catch(fallbackCopy);
      return;
    }

    fallbackCopy();
  };

  const tradeSectionClass = shouldShowTradeSection
    ? `trade-section trade-section--${selectedCategory}`
    : '';

  return (
    <div className="about-page">
      <h2>{t('about.heading')}</h2>
      <div className="event-buttons">
        <button
          className={`event-btn ${selectedCategory === 'software' ? 'active' : ''
            }`}
          onClick={() => handleCategorySelect('software')}
        >
          {t('about.software')}
        </button>
        <button
          className={`event-btn ${selectedCategory === 'soccer' ? 'active' : ''
            }`}
          onClick={() => handleCategorySelect('soccer')}
        >
          {t('about.soccer')}
        </button>
        {!isWeb3 && (
          <button
            className={`event-btn ${selectedCategory === 'invest' ? 'active' : ''
              }`}
            onClick={() => handleCategorySelect('invest')}
          >
            {t('about.tradeTabs.invest')}
          </button>
        )}
        {isWeb3 && (
          <button
            className={`event-btn ${selectedCategory === 'trade' ? 'active' : ''
              }`}
            onClick={() => handleCategorySelect('trade')}
          >
            {t('about.tradeTabs.trade')}
          </button>
        )}
      </div>
      {shouldShowTradeSection ? (
        <section className={tradeSectionClass}>
          <h3>{t(`about.trade.categories.${selectedCategory}.heading`)}</h3>
          <p className="trade-description">
            {t(`about.trade.categories.${selectedCategory}.description`)}
          </p>
          <div className="referrals-grid">
            {(tradingPlatforms[selectedCategory] || []).map((platform) => {
              const isActivePlatform =
                platform.code && copyStatus.code === platform.code;
              const platformName = t(`about.trade.categories.${selectedCategory}.platforms.${platform.id}.name`);
              const platformDescription = t(`about.trade.categories.${selectedCategory}.platforms.${platform.id}.description`);
              const platformLinkLabel = t(`about.trade.categories.${selectedCategory}.platforms.${platform.id}.linkLabel`);
              const fallbackAccessibilityProps = !platform.logo
                ? { role: 'img', 'aria-label': `${platformName} placeholder icon` }
                : {};

              return (
                <article key={platform.id} className="referral-card">
                  <div
                    className={`referral-logo ${!platform.logo ? 'referral-logo--fallback' : ''}`}
                    {...fallbackAccessibilityProps}
                  >
                    {platform.logo ? (
                      <img
                        src={platform.logo}
                        alt={`${platformName} logo`}
                      />
                    ) : (
                      <span aria-hidden="true">{platformName.charAt(0)}</span>
                    )}
                  </div>
                  <h4>{platformName}</h4>
                  <p>{platformDescription}</p>
                  {platform.tags && platform.tags.length > 0 && (
                    <div className="referral-tags">
                      <span className="referral-tags__label">
                        {t('about.trade.tagsLabel')}
                      </span>
                      <ul>
                        {platform.tags.map((tag) => (
                          <li key={tag} className="referral-tag">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    className="referral-link"
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platformLinkLabel}
                  </a>
                  {platform.code && (
                    <div className="referral-code" aria-live="polite">
                      <span>{t('about.trade.referralCodeLabel')}</span>
                      <code>{platform.code}</code>
                      <button
                        type="button"
                        className="copy-button"
                        onClick={() => handleCopyCode(platform.code)}
                      >
                        {isActivePlatform && !copyStatus.error
                          ? t('about.trade.copied')
                          : t('about.trade.copyCode')}
                      </button>
                    </div>
                  )}
                  {platform.code && isActivePlatform && copyStatus.error && (
                    <p className="copy-feedback" role="status">
                      {t('about.trade.copyError')}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="timeline">
          {filteredExperiences.map((experience, index) => (
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
  );
};

export default About;
