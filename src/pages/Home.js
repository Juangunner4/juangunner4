import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SocialTabs from '../components/socials/SocialTabs';
import SocialTimeline from '../components/socials/SocialTimeline';
import XFeed from '../components/socials/XFeed';
import InstagramFeed from '../components/socials/InstagramFeed';
import TwitchFeed from '../components/socials/TwitchFeed';
import YoutubeFeed from '../components/socials/YoutubeFeed';
import PumpFunFeed from '../components/socials/PumpFunFeed';
import '../styles/Home.css';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { useTranslation } from 'react-i18next';

const VALID_TABS = ['x', 'instagram', 'twitch', 'pumpfun', 'youtube'];
const Home = () => {
  const [tab, setTabRaw] = useState('x');
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);
  const { t } = useTranslation();

  const introParagraphs = [
    isWeb3 ? t('home.intro1Web3') : t('home.intro1'),
    isWeb3 ? t('home.intro2Web3') : t('home.intro2'),
    isWeb3 ? t('home.intro3Web3') : t('home.intro3'),
  ];

  const previewProjects = [
    {
      title: isWeb3 ? t('home.project1TitleWeb3') : t('home.project1Title'),
      detail: isWeb3 ? t('home.project1DetailWeb3') : t('home.project1Detail'),
    },
    {
      title: isWeb3 ? t('home.project2TitleWeb3') : t('home.project2Title'),
      detail: isWeb3 ? t('home.project2DetailWeb3') : t('home.project2Detail'),
    },
    {
      title: isWeb3 ? t('home.project3TitleWeb3') : t('home.project3Title'),
      detail: isWeb3 ? t('home.project3DetailWeb3') : t('home.project3Detail'),
    },
  ];

  // Only allow valid tab values
  const setTab = (newTab) => {
    if (VALID_TABS.includes(newTab)) setTabRaw(newTab);
    else setTabRaw('x');
  };

  // Fallback to 'x' if tab is ever invalid
  const safeTab = VALID_TABS.includes(tab) ? tab : 'x';

  let FeedComponent = null;
  if (safeTab === 'x') FeedComponent = <XFeed />;
  else if (safeTab === 'instagram') FeedComponent = <InstagramFeed />;
  else if (safeTab === 'twitch') FeedComponent = <TwitchFeed />;
  else if (safeTab === 'pumpfun') FeedComponent = <PumpFunFeed />;
  else if (safeTab === 'youtube') FeedComponent = <YoutubeFeed />;

  return (
    <div className="home-page">
      <Hero />
      <SocialTabs value={safeTab} setValue={setTab} />
      {FeedComponent}
      {safeTab !== 'pumpfun' && <SocialTimeline platform={safeTab} />}
      <div className="home-content">
        <section className="home-headline">
          <h1>{isWeb3 ? t('home.headlineWeb3') : t('home.headline')}</h1>
          {introParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>{isWeb3 ? t('home.projectsHeadingWeb3') : t('home.projectsHeading')}</h2>
            <p>{isWeb3 ? t('home.projectsDescriptionWeb3') : t('home.projectsDescription')}</p>
          </div>
          <div className="home-content__grid">
            {previewProjects.map((project) => (
              <div key={project.title} className="home-content__card">
                <h3>{project.title}</h3>
                <p>{project.detail}</p>
              </div>
            ))}
          </div>
          <Link className="home-link" to={`${basePath}/projects`}>
            {t('home.projectsLink')}
          </Link>
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>{isWeb3 ? t('home.blogHeadingWeb3') : t('home.blogHeading')}</h2>
            <p>{isWeb3 ? t('home.blogDescriptionWeb3') : t('home.blogDescription')}</p>
          </div>
          <div className="home-content__grid">
            <div className="home-content__card">
              <div className="home-card-meta">
                <span>Author name</span>
                <span>•</span>
                <span>Publish date</span>
              </div>
              <h3>Blog post title</h3>
              <div className="blog-outline__placeholder-line" />
              <div className="blog-outline__placeholder-line" />
              <div className="blog-outline__placeholder-line" />
              <Link className="home-link" to={`${basePath}/blog`}>
                {t('home.blogLink')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

