import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabsList from '@mui/material/Tabs';
import XFeed from './XFeed';
import InstagramFeed from './InstagramFeed';
import TwitchFeed from './TwitchFeed';
import YoutubeFeed from './YoutubeFeed';

const SocialTabs = () => (
  <Tabs.Root defaultValue="x">
    <Tabs.List asChild>
      <TabsList component={Box} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs.Trigger value="x" asChild>
          <Tab label="X" />
        </Tabs.Trigger>
        <Tabs.Trigger value="instagram" asChild>
          <Tab label="Instagram" />
        </Tabs.Trigger>
        <Tabs.Trigger value="twitch" asChild>
          <Tab label="Twitch" />
        </Tabs.Trigger>
        <Tabs.Trigger value="youtube" asChild>
          <Tab label="YouTube" />
        </Tabs.Trigger>
      </TabsList>
    </Tabs.List>
    <Tabs.Content value="x">
      <XFeed />
    </Tabs.Content>
    <Tabs.Content value="instagram">
      <InstagramFeed />
    </Tabs.Content>
    <Tabs.Content value="twitch">
      <TwitchFeed />
    </Tabs.Content>
    <Tabs.Content value="youtube">
      <YoutubeFeed />
    </Tabs.Content>
  </Tabs.Root>
);

export default SocialTabs;
