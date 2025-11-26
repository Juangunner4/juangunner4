# JuanGunner4 - Personal Portfolio & Trading Platform

A modern, full-stack web application featuring dual web2/web3 profiles, authentication, trading platform integrations, and social media feeds.

## 🌟 Features

### Dual Profile System
- **Web2 Profile**: Traditional career, football, and investment focus
- **Web3 Profile**: Content creator, crypto trading, and blockchain integration
- Dynamic content switching based on user preference

### Authentication System
- **Email/Password Authentication**: Traditional registration and login
- **Solana Wallet Integration**: Login with Phantom, Solflare, or Torus wallets
- **Bot Protection**: Cloudflare Turnstile integration
- **Secure**: JWT tokens, bcrypt password hashing, rate limiting

### User Features
- Profile management (bio, location, website)
- Profile picture upload
- Password change
- Account deletion
- Newsletter subscription
- Email verification (ready for SMTP integration)

### Content & Integrations
- Social media feeds (Twitter, Twitch, YouTube)
- Trading platform referrals with tracking
- Project showcase
- Blog system (ready for implementation)
- Multi-language support (English/Spanish)
- Contact forms with Calendly integration

### Security & Performance
- Rate limiting (API: 100 req/15min, Auth: 5 req/15min)
- Input sanitization (XSS, NoSQL injection)
- CORS with whitelist
- Error boundaries
- Global error handling
- File upload validation
- Production-ready configurations

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **React Router 6** - Navigation
- **Solana Wallet Adapter** - Web3 wallet integration
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Material-UI** - UI components
- **Turnstile** - Bot protection

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File uploads
- **Helmet** - Security headers
- **Express Rate Limit** - DDoS protection
- **Morgan** - Request logging

### Security
- XSS protection (xss-clean)
- NoSQL injection protection (express-mongo-sanitize)
- CORS with whitelist
- Rate limiting
- Input validation
- Secure password hashing (12 salt rounds)
- Cloudflare Turnstile

## 📋 Prerequisites

- Node.js 18.x or higher
- MongoDB 5.x or higher (local or Atlas)
- npm or yarn
- Cloudflare account (for Turnstile)
- Social media API keys (optional)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Juangunner4/juangunner4.git
cd juangunner4
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration

Create `.env` files in both root and server directories (use .env.example as template):

#### Root `.env` (Frontend)
```env
# Social Media API Keys
TWITTER_BEARER_TOKEN=your_twitter_token
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_ACCESS_TOKEN=your_twitch_token
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Cloudflare Turnstile (use test key for development)
REACT_APP_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Solana Network
REACT_APP_SOLANA_NETWORK=mainnet-beta
```

#### Server `.env` (Backend)
```env
# Database (REQUIRED)
MONGODB_URI=mongodb://localhost:27017/juangunner4

# JWT Configuration (REQUIRED)
JWT_SECRET=generate_a_strong_random_secret_here
JWT_EXPIRE=7d

# Cloudflare Turnstile (REQUIRED)
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Server
PORT=4000
NODE_ENV=development

# See server/.env.example for complete configuration options
```

### 4. Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

### 5. Start MongoDB

```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, ensure your connection string is in .env
```

### 6. Start the application

```bash
# Development mode (runs both frontend and backend)
npm start

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## 📦 Build for Production

```bash
# Build frontend
npm run build

# Test production build locally
npm install -g serve
serve -s build

# The build folder is ready to be deployed
```

## 🔐 Security Features

### Authentication
- JWT tokens with 7-day expiration
- bcrypt password hashing (12 salt rounds)
- Wallet signature verification (5-minute expiry)
- Cloudflare Turnstile bot protection

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes

### Input Protection
- XSS attack prevention
- NoSQL injection protection
- File upload validation (5MB limit, images only)

### Headers & CORS
- Helmet.js security headers
- CORS with origin whitelist
- Credentials support

## 📁 Project Structure

```
juangunner4/
├── public/                 # Static files
├── server/                 # Backend application
│   ├── config/            # Database config
│   ├── middleware/        # Auth, Turnstile, etc.
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── public/uploads/    # User uploads (generated)
│   └── index.js           # Server entry point
├── src/                   # Frontend application
│   ├── assets/            # Images, icons
│   ├── components/        # React components
│   │   ├── auth/         # Login/Register modals
│   │   └── socials/      # Social media feeds
│   ├── contexts/          # React contexts (Auth)
│   ├── locales/           # Translations (en, es)
│   ├── pages/             # Route pages
│   ├── styles/            # CSS files
│   ├── utils/             # Helper functions
│   ├── App.js             # Main app component
│   └── index.js           # React entry point
├── .env.example           # Frontend env template
├── config-overrides.js    # Webpack customization
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## 🌐 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Key Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/wallet-login` - Solana wallet login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/profile-picture` - Upload avatar

## 🚀 Deployment

See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for comprehensive deployment guide.

### Quick Steps

1. Set `NODE_ENV=production` and configure production environment variables
2. Build frontend: `npm run build`
3. Deploy backend to VPS/cloud service
4. Deploy build folder to static hosting (Vercel, Netlify, etc.)
5. Configure DNS and SSL certificate

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Check for vulnerabilities
npm audit
cd server && npm audit
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access (Atlas IP whitelist)

### Wallet Authentication Not Working
- Check Solana network matches (mainnet-beta)
- Ensure wallet adapter versions are compatible
- Verify wallet extension is installed

### Rate Limiting Too Strict
- Adjust limits in `server/index.js`
- Consider different limits for different endpoints

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Juan Rodriguez (JuanGunner4)**
- Website: [juangunner4.com](https://juangunner4.com)
- GitHub: [@Juangunner4](https://github.com/Juangunner4)

## 📞 Support

- Documentation: See API_DOCUMENTATION.md and PRODUCTION_CHECKLIST.md
- Issues: [GitHub Issues](https://github.com/Juangunner4/juangunner4/issues)

---

**Version**: 1.0.0  
**Status**: Production Ready ✅
