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
import { blogPosts } from '../utils/siteContent';

const VALID_TABS = ['x', 'instagram', 'twitch', 'pumpfun', 'youtube'];
const Home = () => {
  const [tab, setTabRaw] = useState('x');
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  const introParagraphs = [
    'Welcome to my corner of the internet where football, software engineering, and community building collide.',
    'I split my time between writing production-grade code, coaching athletes, and experimenting with on-chain culture. This site shares the latest projects, trading experiments, and long-form notes from the journey.',
    'Whether you found me through a pitch, a repo, or a meme, I am glad you are here.',
  ];

  const previewProjects = [
    {
      title: 'Creator Commerce Microsites',
      detail: 'Launch-ready landing pages that ship fast and convert audiences into communities.',
    },
    {
      title: 'Match Analysis Dashboard',
      detail: 'Interactive visuals that blend player tracking, tactics, and training notes.',
    },
    {
      title: 'Community Analytics Toolkit',
      detail: 'Signal-focused dashboards that track engagement across social and on-chain events.',
    },
  ];

  const latestPosts = blogPosts.slice(0, 3);

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
          <h1>Building culture at the intersection of code and sport</h1>
          {introParagraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>About me</h2>
            <p>
              Software engineer, footballer, and community builder obsessed with systems that help teams move faster. I share
              behind-the-scenes notes on what is shipping next.
            </p>
          </div>
          <Link className="home-link" to={`${basePath}/about`}>
            Read the full bio
          </Link>
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>Projects</h2>
            <p>Recent builds that blend product strategy, design, and technical execution.</p>
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
            View the full project list
          </Link>
        </section>

        <section className="home-section">
          <div className="home-section__header">
            <h2>Latest blog posts</h2>
            <p>Long-form breakdowns of builds, experiments, and lessons from the field.</p>
          </div>
          <div className="home-content__grid">
            {latestPosts.map((post) => (
              <div key={post.slug} className="home-content__card">
                <div className="home-card-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link className="home-link" to={`${basePath}/blog/${post.slug}`}>
                  Read more
                </Link>
              </div>
            ))}
          </div>
          <Link className="home-link" to={`${basePath}/blog`}>
            Browse all posts
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;

