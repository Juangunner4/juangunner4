# JuanGunner4 Portfolio

A full-stack React application with Express backend, MongoDB database, and Web3 integrations.

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## Local Development Setup

### 1. Install MongoDB

#### Windows (using MongoDB Community Server):
```bash
# Download and install MongoDB from https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb
# Start MongoDB service
net start MongoDB
```

#### macOS (using Homebrew):
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd juangunner4

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend Environment (.env)
Copy the example environment file:
```bash
cp .env.example .env
```

The `.env` file should contain:
```env
# Frontend environment variables
REACT_APP_TURNSTILE_SITE_KEY=1x00000000000000000000AA
REACT_APP_TWITTER_BEARER_TOKEN=your-twitter-bearer-token
REACT_APP_TWITCH_CLIENT_ID=your-twitch-client-id
REACT_APP_TWITCH_ACCESS_TOKEN=your-twitch-access-token
REACT_APP_YOUTUBE_API_KEY=your-youtube-api-key
REACT_APP_YOUTUBE_CHANNEL_ID=your-youtube-channel-id
REACT_APP_SOLANA_NETWORK=mainnet-beta
```

#### Backend Environment (server/.env)
The server environment file should contain:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/juangunner4

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=7d

# Cloudflare Turnstile
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Social Media APIs
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
TWITCH_CLIENT_ID=your-twitch-client-id
TWITCH_ACCESS_TOKEN=your-twitch-access-token
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=your-youtube-channel-id

# Server Configuration
PORT=4000
NODE_ENV=development

# Optional: Email configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Start the Application

#### Development Mode (with hot reload):
```bash
# Start both frontend and backend concurrently
npm run dev
```

#### Manual Startup:
```bash
# Terminal 1: Start the backend server
cd server
npm start

# Terminal 2: Start the frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## API Integration

An Express server in `server/index.js` proxies requests to X (formerly Twitter), Twitch and YouTube APIs.

### Required Environment Variables:

- `TWITTER_BEARER_TOKEN` - Twitter API Bearer Token
- `TWITCH_CLIENT_ID` - Twitch API Client ID
- `TWITCH_ACCESS_TOKEN` - Twitch API Access Token
- `YOUTUBE_API_KEY` - YouTube Data API Key
- `YOUTUBE_CHANNEL_ID` - Your YouTube Channel ID

### API Endpoints

#### X (Twitter) API:
- `GET /api/twitter/:username` – Latest tweets from a user
- `GET /api/twitter/tweet/:id/metrics` – Tweet metrics
- `GET /api/twitter/tweet/:id/replies` – Tweet replies

#### Twitch API:
- `GET /api/twitch` – Latest videos (up to 5)
- `GET /api/twitch/latest` – Most recent stream

#### YouTube API:
- `GET /api/youtube/videos` – Latest videos
- `GET /api/youtube/channel` – Channel information

## Database

The application uses MongoDB for data persistence. The default connection string is:
```
mongodb://localhost:27017/juangunner4
```

## Available Scripts

### Frontend Scripts:
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Backend Scripts:
```bash
cd server
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

## Project Structure

```
juangunner4/
├── public/                 # Static assets
├── src/                    # Frontend React application
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── locales/           # Translation files
│   ├── utils/             # Utility functions
│   └── styles/            # CSS styles
├── server/                 # Backend Express server
│   ├── index.js           # Main server file
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── config/            # Server configuration
├── .env                    # Frontend environment variables
├── .env.example           # Environment template
└── server/.env           # Backend environment variables
```

## Deployment

For production deployment, make sure to:

1. Set `NODE_ENV=production` in server/.env
2. Use production MongoDB connection string
3. Set secure JWT secrets
4. Configure production Cloudflare Turnstile keys
5. Set up proper CORS origins

## Troubleshooting

### MongoDB Connection Issues:
- Ensure MongoDB is running: `sudo systemctl status mongodb` (Linux) or `net start MongoDB` (Windows)
- Check connection string in server/.env
- Verify MongoDB is listening on port 27017

### API Key Issues:
- Verify all required API keys are set in both .env files
- Check API key permissions and quotas
- Ensure API keys are not expired

### Port Conflicts:
- Default ports: Frontend (3000), Backend (4000)
- Change ports in .env files if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
