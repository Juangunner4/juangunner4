import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Tweet } from 'react-twitter-embed';

const TwitterCombinedFeed = ({ handles }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTweets() {
      try {
        const params = new URLSearchParams({ handles: handles.join(',') });
        const res = await fetch(`/api/twitter?${params.toString()}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setTweets(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTweets();
  }, [handles]);

  if (loading) return <Typography>Loading tweets...</Typography>;
  if (error) return <Typography color="error">Failed to load tweets</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {tweets.map((t) => (
        <Tweet key={t.id} tweetId={t.id} options={{ conversation: 'none' }} />
      ))}
    </Box>
  );
};

TwitterCombinedFeed.propTypes = {
  handles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TwitterCombinedFeed;
