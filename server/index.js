require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 4000;

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
// In-memory caches to reduce Twitter API calls
const twitterUserCache = new Map();
const twitterTweetsCache = new Map();
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!BEARER_TOKEN) {
  console.error('TWITTER_BEARER_TOKEN not set in environment');
  process.exit(1);
}

// Security and logging middleware
app.use(helmet());
// Enable CORS for allowed origins
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
// Parse JSON bodies
app.use(express.json());
// HTTP request logging
app.use(morgan('combined'));

// Proxy endpoint for Twitter timeline
app.get('/api/twitter/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const now = Date.now();
    // Cache user ID (valid for 1 hour)
    let userCache = twitterUserCache.get(username);
    let userId;
    if (userCache && now - userCache.timestamp < 60 * 60 * 1000) {
      userId = userCache.id;
    } else {
      const userResp = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'User-Agent': 'juangunner4-server'
        },
      });
      const userJson = await userResp.json();
      if (!userResp.ok) return res.status(userResp.status).json(userJson);
      userId = userJson.data.id;
      twitterUserCache.set(username, { id: userId, timestamp: now });
    }

    // Cache tweets (valid for 1 minute)
    let tweetsCache = twitterTweetsCache.get(username);
    if (tweetsCache && now - tweetsCache.timestamp < 60 * 1000) {
      return res.json(tweetsCache.data);
    }
    const tweetsResp = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'User-Agent': 'juangunner4-server'
        },
      }
    );
    const tweetsJson = await tweetsResp.json();
    if (!tweetsResp.ok) {
      // On rate limit, return last cached tweets if available, otherwise empty list
      if (tweetsResp.status === 429) {
        if (tweetsCache) {
          return res.json(tweetsCache.data);
        }
        // first-time rate limit: return empty data
        return res.json({ data: [] });
      }
      return res.status(tweetsResp.status).json(tweetsJson);
    }
    // Cache fresh tweets
    twitterTweetsCache.set(username, { data: tweetsJson, timestamp: now });
    res.json(tweetsJson);
  } catch (err) {
    console.error('Error fetching Twitter data:', err);
    res.status(500).json({ error: 'Error fetching Twitter data' });
  }
});


// Proxy endpoint for Twitch streams
app.get('/api/twitch', async (req, res) => {
  if (!TWITCH_CLIENT_ID || !TWITCH_ACCESS_TOKEN) {
    console.warn('Twitch credentials not configured, returning empty data');
    return res.json({ data: [] });
  }
  // Determine Twitch user parameter, defaulting to 'juangunner4'
  const twitchUser = typeof req.query.user === 'string' ? req.query.user : 'juangunner4';
  try {
    const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${twitchUser}`, {
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

// Endpoint for the latest Twitch stream video
app.get('/api/twitch/latest', async (req, res) => {
  if (!TWITCH_CLIENT_ID || !TWITCH_ACCESS_TOKEN) {
    console.warn('Twitch credentials not configured, returning empty data');
    return res.json({ data: [] });
  }
  const twitchUser = typeof req.query.user === 'string' ? req.query.user : 'juangunner4';
  try {
    const userResp = await fetch(`https://api.twitch.tv/helix/users?login=${twitchUser}`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    });
    const userJson = await userResp.json();
    if (!userResp.ok) return res.status(userResp.status).json(userJson);
    const userId = userJson.data[0].id;

    const videosResp = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=1`, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    });
    const videosJson = await videosResp.json();
    if (!videosResp.ok) return res.status(videosResp.status).json(videosJson);
    const latest = videosJson.data && videosJson.data.length > 0 ? videosJson.data[0] : null;
    res.json({ data: latest ? [latest] : [] });
  } catch (err) {
    console.error('Error fetching Twitch data:', err);
    res.status(500).json({ error: 'Error fetching Twitch data' });
  }
});

// Proxy endpoint for YouTube videos
app.get('/api/youtube', async (req, res) => {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube credentials not configured, returning empty items');
    return res.json({ items: [] });
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

// Endpoint for tweet metrics (likes, retweets, replies)
app.get('/api/twitter/tweet/:id/metrics', async (req, res) => {
  const tweetId = req.params.id;
  try {
    const resp = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'User-Agent': 'juangunner4-server'
        },
      }
    );
    const json = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(json);
    res.json(json);
  } catch (err) {
    console.error('Error fetching tweet metrics:', err);
    res.status(500).json({ error: 'Error fetching tweet metrics' });
  }
});

// Endpoint for tweet replies
app.get('/api/twitter/tweet/:id/replies', async (req, res) => {
  const tweetId = req.params.id;
  try {
    const resp = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetId}&tweet.fields=author_id,created_at&max_results=100`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'User-Agent': 'juangunner4-server'
        },
      }
    );
    const json = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(json);
    res.json(json);
  } catch (err) {
    console.error('Error fetching tweet replies:', err);
    res.status(500).json({ error: 'Error fetching tweet replies' });
  }
});

// Healthcheck endpoint
app.get('/health', (req, res) => res.sendStatus(200));

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
