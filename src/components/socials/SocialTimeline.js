import React, { useState, useEffect } from 'react';
import { useProfile } from '../../ProfileContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';

// Displays embedded timelines for social platforms
const SocialTimeline = ({ platform }) => {
  const { isWeb3 } = useProfile();
  const handle = isWeb3 ? '0x1Juangunner4' : 'juangunner4';
  // Direct API base URL in development to ensure we hit the proxy
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let content;

  useEffect(() => {
    if (platform === 'x') {
      setLoading(true);
      fetch(`${baseUrl}/api/twitter/${handle}`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((json) => {
          setTweets(json.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [platform, handle, baseUrl]);

  switch (platform) {
    case 'instagram':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Latest Instagram Posts</Typography>
          <Box sx={{ bgcolor: '#fafafa', p: 2, borderRadius: 2, minHeight: 120, display: 'flex', justifyContent: 'center' }}>
            <iframe
              src="https://www.instagram.com/juangunner4/embed"
              width="400"
              height="480"
              style={{ borderRadius: 8, border: 'none' }}
              title="Instagram Timeline"
            />
          </Box>
        </>
      );
      break;
    case 'x':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Latest X (Twitter) Posts
          </Typography>
          <Box sx={{ bgcolor: '#f5f8fa', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">Loading tweets...</Typography>}
            {error && <Typography color="error" align="center">Error loading tweets. <Link href={`https://twitter.com/${handle}`} target="_blank" rel="noopener">Visit profile</Link></Typography>}
            {!loading && !error && tweets.length === 0 && (
              <Typography align="center">No tweets to display.</Typography>
            )}
            {!loading && !error && tweets.map((t) => (
              <Box key={t.id} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                <Typography variant="body2">{t.text}</Typography>
              </Box>
            ))}
          </Box>
        </>
      );
      break;
    case 'twitch':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Latest Twitch Streams</Typography>
          <Box sx={{ bgcolor: '#f4f0ff', p: 2, borderRadius: 2, minHeight: 120, display: 'flex', justifyContent: 'center' }}>
            <iframe
              src="https://player.twitch.tv/?channel=juangunner4&parent=localhost"
              height="300"
              width="400"
              allowFullScreen
              style={{ borderRadius: 8, border: 'none' }}
              title="Twitch Timeline"
            />
          </Box>
        </>
      );
      break;
    case 'youtube':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Latest YouTube Videos</Typography>
          <Box sx={{ bgcolor: '#fff8f6', p: 2, borderRadius: 2, minHeight: 120, display: 'flex', justifyContent: 'center' }}>
            <iframe
              width="400"
              height="225"
              src="https://www.youtube.com/embed?listType=user_uploads&list=UCBR8-60-B28hp2BmDPdntcQ"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: 8, border: 'none' }}
              title="YouTube Timeline"
            />
          </Box>
        </>
      );
      break;
    default:
      content = <Typography>No timeline available.</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', sm: 600 },
        mx: 'auto',
        mt: { xs: 2, sm: 4 },
        mb: { xs: 2, sm: 4 },
        p: { xs: 1, sm: 2 },
      }}
    >
      {content}
    </Box>
  );
};
SocialTimeline.propTypes = {
  platform: PropTypes.oneOf(['instagram', 'x', 'twitch', 'youtube']).isRequired,
};

export default SocialTimeline;