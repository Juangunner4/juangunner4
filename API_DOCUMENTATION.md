# API Documentation

## Base URL
- Development: `http://localhost:4000/api`
- Production: `https://your-domain.com/api` or `https://api.your-domain.com`

## Rate Limiting
- General API endpoints: 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes per IP

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

Tokens are also accepted via cookies:
```
Cookie: token=<token>
```

---

## Authentication Endpoints

### POST /api/auth/register
Register a new user with email and password.

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "username": "string (3-30 chars, alphanumeric + underscore)",
  "email": "string (valid email format)",
  "password": "string (minimum 8 characters)",
  "confirmPassword": "string (must match password)",
  "turnstileToken": "string (Cloudflare Turnstile token)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "profilePicture": "/default-avatar.png",
    "isVerified": false,
    "preferences": {
      "newsletter": false,
      "profileType": "web2"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, weak password, etc.)
- `403` - Turnstile verification failed
- `500` - Server error

---

### POST /api/auth/login
Login with email and password.

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "turnstileToken": "string (Cloudflare Turnstile token)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    // same as register response
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Turnstile verification failed
- `500` - Server error

---

### POST /api/auth/wallet-login
Login with Solana wallet signature.

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "walletAddress": "string (Solana public key)",
  "signature": "string (base58 encoded signature)",
  "message": "string (signed message with timestamp)"
}
```

**Message Format:**
```
Sign this message to authenticate with JuanGunner4: {timestamp}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Wallet authentication successful",
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "username": "auto_generated_or_existing",
    "email": "walletAddress@wallet.placeholder or actual_email",
    "walletAddress": "wallet_address",
    // ... other user fields
  }
}
```

**Error Responses:**
- `400` - Missing required fields or invalid signature
- `401` - Signature expired (5 minute limit)
- `500` - Server error

---

### POST /api/auth/verify-email
Verify user email with token.

**Request Body:**
```json
{
  "token": "string (verification token from email)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Responses:**
- `400` - Invalid or expired token
- `500` - Server error

---

### POST /api/auth/forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "string"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

**Error Responses:**
- `400` - Missing email
- `404` - User not found
- `500` - Server error

---

### POST /api/auth/reset-password
Reset password with token from email.

**Request Body:**
```json
{
  "token": "string (reset token from email)",
  "password": "string (minimum 8 characters)",
  "confirmPassword": "string (must match password)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**
- `400` - Validation error or passwords don't match
- `404` - Invalid or expired token
- `500` - Server error

---

## User Profile Endpoints

All user endpoints require authentication.

### GET /api/user/profile
Get current user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "walletAddress": "optional_wallet_address",
    "profilePicture": "/uploads/avatars/avatar-123.jpg",
    "isVerified": true,
    "profile": {
      "bio": "User bio",
      "location": "Location",
      "website": "https://example.com"
    },
    "preferences": {
      "newsletter": true,
      "profileType": "web3"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Not authorized
- `500` - Server error

---

### PUT /api/user/profile
Update user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (all fields optional):**
```json
{
  "username": "string (3-30 chars)",
  "bio": "string (max 500 chars)",
  "location": "string (max 100 chars)",
  "website": "string (max 200 chars)",
  "newsletter": "boolean",
  "profileType": "string ('web2' or 'web3')"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    // updated user object
  }
}
```

**Error Responses:**
- `400` - Validation error or username taken
- `401` - Not authorized
- `404` - User not found
- `500` - Server error

---

### POST /api/user/profile-picture
Upload profile picture.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
profilePicture: <file> (jpeg, jpg, png, gif, webp, max 5MB)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile picture updated successfully",
  "profilePicture": "/uploads/avatars/avatar-123456.jpg"
}
```

**Error Responses:**
- `400` - Invalid file type or size
- `401` - Not authorized
- `404` - User not found
- `500` - Server error

---

### PUT /api/user/change-password
Change user password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string (minimum 8 characters)",
  "confirmPassword": "string (must match newPassword)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400` - Validation error or passwords don't match
- `401` - Current password incorrect or not authorized
- `404` - User not found
- `500` - Server error

---

### DELETE /api/user/account
Delete user account (irreversible).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "password": "string"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Error Responses:**
- `400` - Missing password
- `401` - Incorrect password or not authorized
- `404` - User not found
- `500` - Server error

---

## Social Media Proxy Endpoints

These endpoints proxy requests to external APIs to avoid CORS issues and protect API keys.

### GET /api/twitter/:username
Get recent tweets for a Twitter username.

**Parameters:**
- `username` - Twitter handle (without @)

**Success Response (200):**
```json
{
  "data": [
    {
      "id": "tweet_id",
      "text": "Tweet content",
      "created_at": "2024-01-01T00:00:00.000Z",
      "public_metrics": {
        "like_count": 100,
        "retweet_count": 50,
        "reply_count": 25
      }
    }
  ]
}
```

**Cache:** 1 minute for tweets, 1 hour for user ID

---

### GET /api/twitch?user=username
Get recent Twitch videos for a channel.

**Query Parameters:**
- `user` - Twitch username (default: juangunner4)

**Success Response (200):**
```json
{
  "data": [
    {
      "id": "video_id",
      "title": "Video title",
      "url": "https://twitch.tv/videos/123",
      "thumbnail_url": "https://...",
      "created_at": "2024-01-01T00:00:00Z",
      "duration": "1h23m45s"
    }
  ]
}
```

---

### GET /api/youtube
Get recent YouTube videos.

**Success Response (200):**
```json
{
  "items": [
    {
      "id": {
        "videoId": "video_id"
      },
      "snippet": {
        "title": "Video title",
        "description": "Description",
        "thumbnails": {...},
        "publishedAt": "2024-01-01T00:00:00Z"
      }
    }
  ]
}
```

---

### GET /health
Health check endpoint.

**Success Response (200):**
```
OK
```

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

In development mode, additional debug information may be included:
```json
{
  "error": "Error message",
  "stack": "Error stack trace"
}
```

---

## Security Features

### Rate Limiting
- General API: 100 requests / 15 minutes
- Auth endpoints: 5 requests / 15 minutes
- Returns `429 Too Many Requests` when exceeded

### Input Sanitization
- XSS protection (xss-clean)
- NoSQL injection protection (express-mongo-sanitize)
- File upload validation (type and size)

### Security Headers
- Helmet.js for security headers
- CORS with whitelist
- Credentials support for cookies

### Data Protection
- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens expire in 7 days
- Wallet signatures expire in 5 minutes

---

## Cloudflare Turnstile Integration

All public authentication endpoints require a Turnstile token to prevent bots.

**How to get a token (frontend):**
```javascript
import { Turnstile } from '@marsidev/react-turnstile';

<Turnstile
  siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
  onSuccess={(token) => {
    // Use token in API request
    // Add as 'turnstileToken' field in request body
  }}
/>
```

**Test Keys (always pass):**
- Site Key: `1x00000000000000000000AA`
- Secret Key: `1x0000000000000000000000000000000AA`

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (httpOnly cookies or secure localStorage)
3. **Implement token refresh** before expiration
4. **Handle rate limit responses** gracefully
5. **Validate input** on both client and server
6. **Use environment variables** for sensitive data
7. **Monitor API usage** and errors
8. **Implement retry logic** for failed requests
9. **Cache responses** where appropriate
10. **Log errors** for debugging

---

## Example Usage (JavaScript/Axios)

### Register
```javascript
import axios from 'axios';

const register = async (userData, turnstileToken) => {
  try {
    const response = await axios.post('/api/auth/register', {
      ...userData,
      turnstileToken
    });
    
    // Store token
    localStorage.setItem('token', response.data.token);
    
    // Set default header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Registration failed';
  }
};
```

### Get Profile
```javascript
const getProfile = async () => {
  try {
    const response = await axios.get('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    return response.data.user;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch profile';
  }
};
```

### Wallet Login
```javascript
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const walletLogin = async () => {
  const { publicKey, signMessage } = useWallet();
  
  if (!publicKey || !signMessage) {
    throw new Error('Wallet not connected');
  }
  
  const timestamp = Date.now();
  const message = `Sign this message to authenticate with JuanGunner4: ${timestamp}`;
  const encodedMessage = new TextEncoder().encode(message);
  const signature = await signMessage(encodedMessage);
  
  const response = await axios.post('/api/auth/wallet-login', {
    walletAddress: publicKey.toString(),
    signature: bs58.encode(signature),
    message
  });
  
  localStorage.setItem('token', response.data.token);
  return response.data;
};
```

---

## Support

For API issues or questions:
- GitHub Issues: [repository-url]/issues
- Email: support@juangunner4.com
- Documentation: [documentation-url]

---

**API Version:** 1.0.0  
**Last Updated:** 2024
