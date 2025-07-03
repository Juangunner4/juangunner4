require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 4000;

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
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

app.listen(port, () => {
  console.log(`Twitter proxy server running on http://localhost:${port}`);
});
