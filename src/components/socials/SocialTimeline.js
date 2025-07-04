import React, { useState, useEffect } from 'react';
import { useProfile } from '../../ProfileContext';
import web2Image from '../../assets/profile.png';
import web3Image from '../../assets/web3.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { ChatBubbleIcon, HeartIcon, LoopIcon } from '@radix-ui/react-icons';

// Displays embedded timelines for social platforms
const SocialTimeline = ({ platform }) => {
  const { isWeb3 } = useProfile();
  const avatarImage = isWeb3 ? web3Image : web2Image;
  const handle = isWeb3 ? '0x1Juangunner4' : 'juangunner4';
  const { t } = useTranslation();
  // Base URL for API: use env var in production or localhost in development
  const baseUrl = process.env.REACT_APP_API_URL
    || (process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let content;

  // Prefetch tweets for both accounts to warm the cache
  useEffect(() => {
    if (platform !== 'x') return;
    const handles = ['juangunner4', '0x1Juangunner4'];
    handles.forEach((h) => {
      const cacheKey = `tweets_${h}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 60 * 1000) {
            return; // cache still valid
          }
        } catch (e) {
          console.error('Error parsing tweet cache', e);
        }
      }
      fetch(`${baseUrl}/api/twitter/${h}`, { cache: 'no-store' })
        .then((res) => res.json().then((json) => ({ ok: res.ok, json })))
        .then(({ ok, json }) => {
          if (!ok) throw new Error(json.error || 'Failed to fetch tweets');
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: json.data || [], timestamp: Date.now() })
          );
        })
        .catch((err) => console.error('Prefetch tweets error:', err));
    });
  }, [platform, baseUrl]);

  useEffect(() => {
    // Twitter caching: check localStorage for recent tweets (1 min)
    if (platform === 'x') {
      const cacheKey = `tweets_${handle}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 60 * 1000) {
            setItems(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing tweet cache', e);
        }
      }
    }
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
      .then((res) => res.json().then((json) => ({ ok: res.ok, json })))
      .then(({ ok, json }) => {
        if (!ok) throw new Error(json.error || 'Failed to load');
        setItems(json.data || json.items || []);
        // Save to cache for Twitter
        if (platform === 'x') {
          const cacheKey = `tweets_${handle}`;
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: json.data || [], timestamp: Date.now() })
          );
        }
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
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>{t('timeline.instagramTitle')}</Typography>
          <Box sx={{ bgcolor: '#fafafa', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">{t('timeline.loadingPosts')}</Typography>}
            {error && <Typography color="error" align="center">{t('timeline.errorPosts')}</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">{t('timeline.noPosts')}</Typography>
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
            {t('timeline.twitterTitle')}
          </Typography>
          <Box sx={{ bgcolor: '#f5f8fa', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">{t('timeline.loadingTweets')}</Typography>}
            {error && (
              <Typography color="error" align="center">
                {t('timeline.errorTweets')}{' '}
                <Link href={`https://twitter.com/${handle}`} target="_blank" rel="noopener">
                  {t('timeline.visitProfile')}
                </Link>
              </Typography>
            )}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">{t('timeline.noTweets')}</Typography>
            )}
            {!loading && !error && items.length > 0 &&
              items.map((tweet) => (
                <Card key={tweet.id} sx={{ mb: 2, boxShadow: 1 }}>
                  <CardHeader
                    avatar={<Avatar src={avatarImage} alt="profile" />}
                    title={handle}
                    subheader={new Date(tweet.created_at).toLocaleString()}
                  />
                  <CardContent>
                    <Typography variant="body1">{tweet.text}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton size="small" aria-label="reply"><ChatBubbleIcon /></IconButton>
                    <Typography variant="caption" sx={{ ml: 0.5, mr: 2 }}>{tweet.public_metrics?.reply_count}</Typography>
                    <IconButton size="small" aria-label="retweet"><LoopIcon /></IconButton>
                    <Typography variant="caption" sx={{ ml: 0.5, mr: 2 }}>{tweet.public_metrics?.retweet_count}</Typography>
                    <IconButton size="small" aria-label="like"><HeartIcon /></IconButton>
                    <Typography variant="caption" sx={{ ml: 0.5 }}>{tweet.public_metrics?.like_count}</Typography>
                  </CardActions>
                </Card>
              ))}
          </Box>
        </>
      );
      break;
    case 'twitch':
      content = (
        <>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>{t('timeline.twitchTitle')}</Typography>
          <Box sx={{ bgcolor: '#f4f0ff', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">{t('timeline.loadingStreams')}</Typography>}
            {error && <Typography color="error" align="center">{t('timeline.errorStreams')}</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">{t('timeline.noStreams')}</Typography>
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
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>{t('timeline.youtubeTitle')}</Typography>
          <Box sx={{ bgcolor: '#fff8f6', p: 2, borderRadius: 2 }}>
            {loading && <Typography align="center">{t('timeline.loadingVideos')}</Typography>}
            {error && <Typography color="error" align="center">{t('timeline.errorVideos')}</Typography>}
            {!loading && !error && items.length === 0 && (
              <Typography align="center">{t('timeline.noVideos')}</Typography>
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
      content = <Typography>{t('timeline.noTimeline')}</Typography>;
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