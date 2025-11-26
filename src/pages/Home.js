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

  const introParagraphs = t('home.overviewParagraphs', { returnObjects: true });
  const highlights = t('home.findList', { returnObjects: true });
  const safeIntroParagraphs = Array.isArray(introParagraphs)
    ? introParagraphs
    : [introParagraphs];
  const safeHighlights = Array.isArray(highlights) ? highlights : [highlights];

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
          <h1>{t('home.title')}</h1>
          <p className="home-lead">{t('home.welcome')}</p>
        </section>

        <section className="home-section home-section--stacked">
          <div className="home-article">
            {safeIntroParagraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </section>

        <section className="home-section home-section--accent">
          <div className="home-section__header">
            <h2>{t('home.projectsTitle')}</h2>
            <p>{t('home.projectsSummary')}</p>
          </div>
          <Link className="home-link" to={`${basePath}/projects`}>
            {t('home.projectsLink')}
          </Link>
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>{t('home.findTitle')}</h2>
            <p>{t('home.findIntro')}</p>
          </div>
          <div className="home-content__grid">
            {safeHighlights.map((item) => (
              <div className="home-content__card home-content__card--list" key={item}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

