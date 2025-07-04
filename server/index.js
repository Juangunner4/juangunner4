require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 4000;

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!BEARER_TOKEN) {
  console.error('TWITTER_BEARER_TOKEN not set in environment');
  process.exit(1);
}

// CORS setup (if front-end served on different port)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy endpoint for Twitter timeline
app.get('/api/twitter/:username', async (req, res) => {
  const username = req.params.username;
  try {
    // Get user ID by username
    const userResp = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    });
    const userJson = await userResp.json();
    if (!userResp.ok) return res.status(userResp.status).json(userJson);
    const userId = userJson.data.id;

    // Get recent tweets
    const tweetsResp = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );
    const tweetsJson = await tweetsResp.json();
    if (!tweetsResp.ok) return res.status(tweetsResp.status).json(tweetsJson);

    res.json(tweetsJson);
  } catch (err) {
    console.error('Error fetching Twitter data:', err);
    res.status(500).json({ error: 'Error fetching Twitter data' });
  }
});

// Proxy endpoint for Instagram posts
app.get('/api/instagram', async (req, res) => {
  if (!INSTAGRAM_USER_ID || !INSTAGRAM_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Instagram credentials not configured' });
  }
  try {
    const igResp = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=5`
    );
    const igJson = await igResp.json();
    if (!igResp.ok) return res.status(igResp.status).json(igJson);
    res.json(igJson);
  } catch (err) {
    console.error('Error fetching Instagram data:', err);
    res.status(500).json({ error: 'Error fetching Instagram data' });
  }
});

// Proxy endpoint for Twitch streams
app.get('/api/twitch', async (req, res) => {
  if (!TWITCH_CLIENT_ID || !TWITCH_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Twitch credentials not configured' });
  }
  const user = req.query.user || 'juangunner4';
  try {
    const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${user}`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    });
    const userJson = await userResp.json();
    if (!userResp.ok) return res.status(userResp.status).json(userJson);
    const userId = userJson.data[0].id;

    const videosResp = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=5`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    });
    const videosJson = await videosResp.json();
    if (!videosResp.ok) return res.status(videosResp.status).json(videosJson);
    res.json(videosJson);
  } catch (err) {
    console.error('Error fetching Twitch data:', err);
    res.status(500).json({ error: 'Error fetching Twitch data' });
  }
});

// Proxy endpoint for YouTube videos
app.get('/api/youtube', async (req, res) => {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return res.status(500).json({ error: 'YouTube credentials not configured' });
  }
  try {
    const ytResp = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`
    );
    const ytJson = await ytResp.json();
    if (!ytResp.ok) return res.status(ytResp.status).json(ytJson);
    res.json(ytJson);
  } catch (err) {
    console.error('Error fetching YouTube data:', err);
    res.status(500).json({ error: 'Error fetching YouTube data' });
  }
});

app.listen(port, () => {
  console.log(`Twitter proxy server running on http://localhost:${port}`);
});
