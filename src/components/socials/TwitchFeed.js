import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { SportsEsports } from '@mui/icons-material';

const TwitchFeed = () => {
  const baseUrl =
    process.env.REACT_APP_API_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/twitch`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json.data)) {
          setVideos(json.data);
        }
      })
      .catch((err) => console.error('Error loading Twitch videos', err));
  }, [baseUrl]);

  if (videos.length === 0) {
    return (
      <Card sx={{ my: 2, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <SportsEsports sx={{ fontSize: 40, color: '#ff0000' }} />
          <Typography variant="h6">Watch me on Twitch</Typography>
          <Link
            href="https://twitch.tv/juangunner4"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#d32f2f', fontWeight: 600 }}
            underline="none"
          >
            twitch.tv/juangunner4
          </Link>
        </CardContent>
      </Card>
    );
  }

  const [latest, ...previous] = videos;

  return (
    <>
      <Card sx={{ my: 2, width: '100%' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Latest Twitch Stream</Typography>
          <Box sx={{ position: 'relative', pt: '56.25%' }}>
            <iframe
              title={latest.title}
              src={`https://player.twitch.tv/?video=${latest.id}&parent=${window.location.hostname}`}
              allowFullScreen
              frameBorder="0"
              style={{
                borderRadius: 8,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            />
          </Box>
        </CardContent>
      </Card>
      {previous.length > 0 && (
        <Card sx={{ my: 2, width: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Previous Streams
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 1 }}>
              {previous.map((v) => (
                <Link
                  key={v.id}
                  href={`https://www.twitch.tv/videos/${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ lineHeight: 0 }}
                >
                  <img
                    src={v.thumbnail_url.replace('%{width}', '320').replace('%{height}', '180')}
                    alt={v.title}
                    width="160"
                    height="90"
                    style={{ borderRadius: 4 }}
                  />
                </Link>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TwitchFeed;

