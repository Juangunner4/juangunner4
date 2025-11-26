# Authentication System Setup Guide

## Overview

This authentication system provides:
- ✅ User registration with email/password
- ✅ Secure login with JWT tokens
- ✅ Cloudflare Turnstile bot protection
- ✅ Password encryption with bcrypt
- ✅ Email verification (placeholder)
- ✅ Password reset functionality
- ✅ User profiles with avatars
- ✅ MongoDB database storage

## Prerequisites

1. **MongoDB** - Install locally or use MongoDB Atlas
2. **Node.js** - v16 or higher
3. **Cloudflare Turnstile** - Get free keys at https://www.cloudflare.com/products/turnstile/

## Installation Steps

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB service
# Windows: Start MongoDB service from Services
# Mac/Linux: brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `<password>` with your database password

### 3. Get Cloudflare Turnstile Keys

1. Go to https://dash.cloudflare.com/
2. Select your site or create one
3. Go to "Turnstile"
4. Create a new widget
5. Copy your Site Key and Secret Key

### 4. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and fill in your values:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/juangunner4
# OR Atlas: mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT (Generate a random string)
JWT_SECRET=your-random-secret-key-here-change-this
JWT_EXPIRE=7d

# Cloudflare Turnstile
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
CLOUDFLARE_TURNSTILE_SITE_KEY=your-site-key

PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 5. Create Upload Directory

```bash
# From server directory
mkdir -p public/uploads/avatars
```

### 6. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "turnstileToken": "cloudflare-turnstile-response-token"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "turnstileToken": "cloudflare-turnstile-response-token"
}
```

**Verify Email**
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification-token-from-email"
}
```

**Forgot Password**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Reset Password**
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

### User Profile (Requires Authentication)

All user endpoints require the `Authorization` header:
```
Authorization: Bearer your-jwt-token-here
```

**Get Profile**
```http
GET /api/user/profile
Authorization: Bearer <token>
```

**Update Profile**
```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "bio": "My bio",
  "location": "New York",
  "website": "https://example.com",
  "newsletter": true,
  "profileType": "web3"
}
```

**Upload Profile Picture**
```http
POST /api/user/profile-picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

profilePicture: <image-file>
```

**Change Password**
```http
PUT /api/user/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!",
  "confirmPassword": "NewPass123!"
}
```

**Delete Account**
```http
DELETE /api/user/account
Authorization: Bearer <token>
Content-Type: application/json

{
  "password": "SecurePass123!"
}
```

## Database Schema

### User Model

```javascript
{
  username: String (unique, 3-30 chars, alphanumeric + underscore),
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  profilePicture: String (URL to uploaded image),
  isVerified: Boolean (default: false),
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  profile: {
    bio: String (max 500 chars),
    location: String (max 100 chars),
    website: String (max 200 chars)
  },
  preferences: {
    newsletter: Boolean,
    profileType: String (enum: 'web2', 'web3')
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed with bcrypt (12 rounds)
2. **JWT Tokens**: Secure authentication with JSON Web Tokens
3. **Bot Protection**: Cloudflare Turnstile verification on registration/login
4. **Input Validation**: All inputs are validated and sanitized
5. **Rate Limiting**: Can be added with express-rate-limit
6. **CORS Protection**: Configured allowed origins
7. **Helmet Security**: HTTP headers protection

## Testing with Postman/Thunder Client

1. **Register a new user** - Copy the returned token
2. **Use the token** in subsequent requests:
   - Add header: `Authorization: Bearer <your-token>`
3. **Test profile endpoints** with authentication
4. **Upload avatar** using multipart/form-data

## Next Steps

### Email Integration (Optional)
To send actual verification and reset emails:
1. Install nodemailer: `npm install nodemailer`
2. Configure SMTP settings in `.env`
3. Implement email sending functions
4. Update auth routes to send emails

### Frontend Integration
1. Install axios in React: `npm install axios`
2. Create auth context/hooks
3. Implement login/register forms
4. Add Cloudflare Turnstile widget
5. Store JWT in localStorage/cookies
6. Protected routes with auth check

## Troubleshooting

**MongoDB Connection Error**
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall settings

**Turnstile Verification Fails**
- Verify secret key is correct
- Check site key is used in frontend
- Ensure requests include turnstileToken

**JWT Token Invalid**
- Check JWT_SECRET matches between requests
- Token may have expired (check JWT_EXPIRE)
- Verify Authorization header format

## Security Recommendations

1. **Change JWT_SECRET** - Use a long random string
2. **Use HTTPS** in production
3. **Enable rate limiting** to prevent brute force
4. **Add email verification** before allowing login
5. **Implement 2FA** for sensitive accounts
6. **Regular security audits**
7. **Keep dependencies updated**

## Support

For issues or questions, contact: juanje1019@gmail.com
