const axios = require('axios');

const verifyTurnstileToken = async (token, remoteip) => {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  
  if (!secretKey) {
    console.error('Cloudflare Turnstile secret key not configured');
    return false;
  }

  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        secret: secretKey,
        response: token,
        remoteip: remoteip
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error.message);
    return false;
  }
};

const turnstileMiddleware = async (req, res, next) => {
  const turnstileToken = req.body.turnstileToken || req.body['cf-turnstile-response'];
  
  if (!turnstileToken) {
    return res.status(400).json({ error: 'Turnstile token is required' });
  }

  const clientIp = req.ip || req.connection.remoteAddress;
  const isValid = await verifyTurnstileToken(turnstileToken, clientIp);

  if (!isValid) {
    return res.status(403).json({ error: 'Turnstile verification failed. Please try again.' });
  }

  next();
};

module.exports = {
  verifyTurnstileToken,
  turnstileMiddleware
};
