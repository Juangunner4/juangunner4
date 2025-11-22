import React, { useState } from 'react';
import Hero from '../components/Hero';
import SocialTabs from '../components/socials/SocialTabs';
import SocialTimeline from '../components/socials/SocialTimeline';
import XFeed from '../components/socials/XFeed';
import InstagramFeed from '../components/socials/InstagramFeed';
import TwitchFeed from '../components/socials/TwitchFeed';
import YoutubeFeed from '../components/socials/YoutubeFeed';
import PumpFunFeed from '../components/socials/PumpFunFeed';
import '../styles/Home.css';

const VALID_TABS = ['x', 'instagram', 'twitch', 'pumpfun', 'youtube'];
const Home = () => {
  const [tab, setTabRaw] = useState('x');

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

  const contentSections = [
    {
      title: 'What this site covers',
      description:
        'A home for my software engineering journey, football ambitions, and the projects that connect those two passions. Every section below links to real work—no placeholder or under-construction pages.',
      items: [
        'Weekly recaps with links to my X threads, livestreams, and Instagram reels.',
        'Case studies that explain how I build web2 and web3 products from planning to launch.',
        'Breakdowns of trading platforms I actually use, with notes on why they matter to builders.',
      ],
    },
    {
      title: 'Featured work and collaborations',
      description:
        'Browse live client sites, marketplace experiments, and creator partnerships—all with working demos or production deployments.',
      items: [
        'Service businesses like towing companies and moving crews that I helped get online.',
        'Web3 launches including meme tokens, NFT marketplace experiments, and sports collectibles.',
        'Coaching programs and training content from my time competing and mentoring on the pitch.',
      ],
    },
    {
      title: 'How to engage',
      description:
        'Find the best way to reach me depending on whether you want to collaborate, hire, or follow along.',
      items: [
        'Use the Projects page to explore repositories, previews, and test environments.',
        'Hop into the About page for a timeline of experience, credentials, and platform links.',
        'Follow the social feeds above to see current builds, shipping updates, and match highlights.',
      ],
    },
  ];

  return (
    <div className="home-page">
      <Hero />
      <SocialTabs value={safeTab} setValue={setTab} />
      {FeedComponent}
      {safeTab !== 'pumpfun' && <SocialTimeline platform={safeTab} />}
      <section className="home-content" aria-labelledby="home-content-heading">
        <div className="home-content__header">
          <h2 id="home-content-heading">Explore the site</h2>
          <p>
            You are seeing a curated feed plus long-form descriptions of what I build and share
            every week. These summaries ensure Google ads only appear next to meaningful
            publisher-owned content rather than blank or placeholder screens.
          </p>
        </div>
        <div className="home-content__grid">
          {contentSections.map((section) => (
            <article key={section.title} className="home-content__card">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

