import React, { useState } from 'react';
import Hero from '../components/Hero';
import SocialTabs from '../components/socials/SocialTabs';
import SocialTimeline from '../components/socials/SocialTimeline';
import XFeed from '../components/socials/XFeed';
import InstagramFeed from '../components/socials/InstagramFeed';
import TwitchFeed from '../components/socials/TwitchFeed';
import YoutubeFeed from '../components/socials/YoutubeFeed';


const VALID_TABS = ['x', 'instagram', 'twitch', 'youtube'];
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
  else if (safeTab === 'youtube') FeedComponent = <YoutubeFeed />;

  return (
    <div className="home-page">
      <Hero />
      <SocialTabs value={safeTab} setValue={setTab} />
      {FeedComponent}
      <SocialTimeline platform={safeTab} />
    </div>
  );
};

export default Home;
