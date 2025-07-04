import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useProfile } from '../../ProfileContext';
import { ChatBubbleIcon, HeartIcon, LoopIcon } from '@radix-ui/react-icons';

const TwitterCombinedFeed = () => {
  const { isWeb3 } = useProfile();
  const handle = isWeb3 ? '0x1Juangunner4' : 'juangunner4';
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Base URL for API: use env var or localhost dev server
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const cacheKey = `tweets_${handle}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 60 * 1000) {
          setTweets(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing tweet cache', e);
      }
    }
    async function fetchTweets() {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/twitter/${handle}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        const data = json.data || [];
        setTweets(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTweets();
  }, [handle, baseUrl]);

  if (loading) return <Typography>Loading tweets...</Typography>;
  if (error) return <Typography color="error">Failed to load tweets</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {tweets.map((t) => (
        <Box key={t.id}>
          <TwitterTweetEmbed tweetId={t.id} options={{ conversation: 'none' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, ml: 1 }}>
            <ChatBubbleIcon />
            <Typography variant="caption" sx={{ ml: 0.5, mr: 2 }}>
              {t.public_metrics?.reply_count}
            </Typography>
            <LoopIcon />
            <Typography variant="caption" sx={{ ml: 0.5, mr: 2 }}>
              {t.public_metrics?.retweet_count}
            </Typography>
            <HeartIcon />
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {t.public_metrics?.like_count}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TwitterCombinedFeed;
