import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import TwitterCombinedFeed from './TwitterCombinedFeed';

// Displays embedded timelines for social platforms
const SocialTimeline = ({ platform }) => {
  let content;
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
              frameBorder="0"
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
          <Box
            sx={{
              bgcolor: '#f5f8fa',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TwitterCombinedFeed handles={['juangunner4', '0x1Juangunner4']} />
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
              frameBorder="0"
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
              frameBorder="0"
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