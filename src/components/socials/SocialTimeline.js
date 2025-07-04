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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let content;

  useEffect(() => {
    let endpoint = '';
    switch (platform) {
      case 'x':
        endpoint = `/api/twitter/${handle}`;
        break;
      case 'instagram':
        endpoint = '/api/instagram';
        break;
      case 'twitch':
        endpoint = '/api/twitch';
        break;
      case 'youtube':
        endpoint = '/api/youtube';
        break;
      default:
        return;
    }

    setLoading(true);
    fetch(`${baseUrl}${endpoint}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data || json.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [platform, handle, baseUrl]);

  switch (platform) {
    case 'instagram':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Latest Instagram Posts</Typography>
          <Box sx={{ bgcolor: '#fafafa', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">Loading posts...</Typography>}
            {error && <Typography color="error" align="center">Error loading posts.</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">No posts to display.</Typography>
            )}
            {!loading && !error &&
              items.map((p) => (
                <Box key={p.id} sx={{ mb: 2 }}>
                  <a href={p.permalink} target="_blank" rel="noopener noreferrer">
                    <img src={p.media_url} alt={p.caption || ''} style={{ width: '100%', borderRadius: 8 }} />
                  </a>
                </Box>
              ))}
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
            {error && (
              <Typography color="error" align="center">
                Error loading tweets.{' '}
                <Link href={`https://twitter.com/${handle}`} target="_blank" rel="noopener">
                  Visit profile
                </Link>
              </Typography>
            )}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">No tweets to display.</Typography>
            )}
            {!loading && !error &&
              items.map((t) => (
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
          <Box sx={{ bgcolor: '#f4f0ff', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">Loading streams...</Typography>}
            {error && <Typography color="error" align="center">Error loading streams.</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">No streams to display.</Typography>
            )}
            {!loading && !error &&
              items.map((s) => (
                <Box key={s.id} sx={{ mb: 2 }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={s.thumbnail_url.replace('%{width}', '320').replace('%{height}', '180')}
                      alt={s.title}
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </a>
                </Box>
              ))}
          </Box>
        </>
      );
      break;
    case 'youtube':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Latest YouTube Videos</Typography>
          <Box sx={{ bgcolor: '#fff8f6', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">Loading videos...</Typography>}
            {error && <Typography color="error" align="center">Error loading videos.</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">No videos to display.</Typography>
            )}
            {!loading && !error &&
              items.map((v) => (
                <Box key={v.id.videoId || v.id} sx={{ mb: 2 }}>
                  <iframe
                    width="400"
                    height="225"
                    src={`https://www.youtube.com/embed/${v.id.videoId || v.id}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ borderRadius: 8, border: 'none' }}
                    title={v.snippet?.title || 'YouTube video'}
                  />
                </Box>
              ))}
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