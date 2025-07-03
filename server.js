const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const app = express();

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function fetchTweetsByHandle(handle) {
  const user = await twitterClient.v2.userByUsername(handle);
  const userId = user.data.id;
  const { data } = await twitterClient.v2.userTimeline(userId, {
    exclude: 'replies',
    'tweet.fields': 'created_at',
    max_results: 5,
  });
  return data || [];
}

app.get('/api/twitter', async (req, res) => {
  const handles = req.query.handles
    ? req.query.handles.split(',')
    : ['juangunner4', '0x1Juangunner4'];
  try {
    let tweets = [];
    for (const h of handles) {
      const userTweets = await fetchTweetsByHandle(h.trim());
      tweets = tweets.concat(userTweets);
    }
    tweets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

app.get('/api/twitter/:handle', async (req, res) => {
  try {
    const tweets = await fetchTweetsByHandle(req.params.handle);
    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
