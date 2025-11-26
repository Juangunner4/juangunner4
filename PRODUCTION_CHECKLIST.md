# 🚀 Production Deployment Checklist

## Pre-Deployment Requirements

### 1. Environment Configuration

#### Backend (.env in /server)
- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI (MongoDB Atlas recommended)
- [ ] Generate strong JWT_SECRET (minimum 32 characters)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Set production Cloudflare Turnstile keys
- [ ] Configure CORS_ORIGIN with your production domain
- [ ] Set up SMTP credentials for email (optional but recommended)
- [ ] Set APP_URL to your production domain

#### Frontend (.env in root)
- [ ] Set production REACT_APP_TURNSTILE_SITE_KEY
- [ ] Configure REACT_APP_API_URL for production API
- [ ] Verify REACT_APP_SOLANA_NETWORK (mainnet-beta for production)

### 2. Database Setup

- [ ] MongoDB database created (juangunner4)
- [ ] Database user created with appropriate permissions
- [ ] IP whitelist configured (MongoDB Atlas)
- [ ] Database indexes created (automatic with Mongoose)
- [ ] Backup strategy implemented

### 3. Security Audit

- [ ] All .env files are in .gitignore
- [ ] Strong JWT_SECRET generated and set
- [ ] CORS configured with specific origins (no wildcards)
- [ ] Rate limiting tested and configured
- [ ] Helmet security headers verified
- [ ] Input sanitization active (XSS, NoSQL injection)
- [ ] File upload limits configured (5MB)
- [ ] HTTPS/SSL certificate installed

### 4. Code Quality

- [ ] Run `npm audit` in both root and server directories
- [ ] Fix all high/critical vulnerabilities
- [ ] Review and address ESLint warnings
- [ ] Remove console.logs in production code (except errors)
- [ ] Test all API endpoints
- [ ] Test authentication flows (email + wallet)
- [ ] Test file uploads

### 5. Build & Optimization

#### Frontend Build
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] Check build size (should be under 2MB)
- [ ] Test built files locally
- [ ] Verify all static assets load

#### Backend
- [ ] All dependencies installed (`npm install --production`)
- [ ] Upload directories exist (created automatically by server)
- [ ] Static file serving configured

### 6. Testing Checklist

- [ ] Registration with email works
- [ ] Email login works
- [ ] Solana wallet login works (Phantom, Solflare, Torus)
- [ ] Token persistence works (refresh page)
- [ ] Protected routes work
- [ ] Profile update works
- [ ] Password change works
- [ ] File upload works
- [ ] Rate limiting works (test with multiple requests)
- [ ] Error pages display correctly
- [ ] 404 page works
- [ ] Mobile responsive on all pages

### 7. Monitoring & Logging

- [ ] Set up error logging service (Sentry, LogRocket, etc.)
- [ ] Configure server monitoring (PM2, Forever, etc.)
- [ ] Set up database monitoring
- [ ] Configure uptime monitoring
- [ ] Set up alerts for critical errors

### 8. Performance

- [ ] Enable gzip compression (nginx/server)
- [ ] Configure CDN for static assets (optional)
- [ ] Optimize images
- [ ] Enable browser caching
- [ ] Test page load times
- [ ] Run Lighthouse audit (aim for 90+ scores)

### 9. Deployment

#### Option A: Traditional VPS/Cloud Server
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone repository
git clone https://github.com/yourusername/juangunner4.git
cd juangunner4

# Install dependencies
npm install
cd server && npm install && cd ..

# Set up environment variables
nano server/.env  # Add all production values
nano .env         # Add all production values

# Build frontend
npm run build

# Start server with PM2
cd server
pm2 start index.js --name "juangunner4-api"
pm2 save
pm2 startup

# Serve built frontend with nginx or serve package
npm install -g serve
cd ../build
serve -s . -p 3000
```

#### Option B: Docker Deployment
```bash
# Build Docker images
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f
```

#### Option C: Platform-as-a-Service

**Vercel (Frontend)**
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy main branch

**Render/Railway (Backend)**
- Connect GitHub repository
- Set environment variables
- Configure build command: `cd server && npm install`
- Configure start command: `node server/index.js`

### 10. Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test authentication flows
- [ ] Check API endpoints respond correctly
- [ ] Monitor server logs for errors
- [ ] Test from different devices/browsers
- [ ] Verify SSL certificate is valid
- [ ] Check DNS configuration
- [ ] Test email functionality (if configured)
- [ ] Monitor database connections
- [ ] Set up regular backups

### 11. DNS Configuration

- [ ] A record: `yourdomain.com` → Server IP
- [ ] A record: `www.yourdomain.com` → Server IP
- [ ] A record: `api.yourdomain.com` → API Server IP (optional)
- [ ] SSL certificate installed and auto-renewal configured

### 12. Maintenance Plan

- [ ] Schedule regular dependency updates
- [ ] Set up automated backups
- [ ] Create rollback plan
- [ ] Document deployment process
- [ ] Set up staging environment
- [ ] Create incident response plan

## Common Issues & Solutions

### MongoDB Connection Fails
- Check MONGODB_URI format
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### CORS Errors
- Verify CORS_ORIGIN in backend .env
- Check frontend is making requests to correct API URL
- Ensure credentials: true is set in CORS config

### Rate Limiting Too Strict
- Adjust limits in server/index.js
- Consider different limits for different endpoints
- Monitor legitimate user impact

### File Uploads Fail
- Check upload directory permissions
- Verify multer configuration
- Check file size limits
- Ensure sufficient disk space

### Wallet Authentication Issues
- Verify Solana network matches (mainnet-beta)
- Check wallet adapter versions
- Test with different wallets (Phantom, Solflare)

## Production Environment Variables Summary

### Critical (Must Set)
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - Authentication security
- `NODE_ENV=production` - Environment mode
- `CLOUDFLARE_TURNSTILE_SECRET_KEY` - Bot protection
- `CORS_ORIGIN` - Security configuration

### Optional (Recommended)
- `SMTP_*` - Email functionality
- `APP_URL` - Correct links in emails
- Social media API keys (Twitter, Twitch, YouTube)

## Security Best Practices

1. **Never commit .env files** - Already in .gitignore
2. **Use strong passwords** - Minimum 12 characters
3. **Regular updates** - Keep dependencies current
4. **Monitor logs** - Watch for suspicious activity
5. **Backup regularly** - Automated daily backups
6. **Use HTTPS only** - No plain HTTP in production
7. **Rate limiting** - Already configured
8. **Input validation** - Already implemented
9. **Error messages** - Don't expose sensitive info
10. **Authentication** - JWT tokens expire in 7 days

## Performance Benchmarks

Target metrics for production:
- **API Response Time**: < 200ms average
- **Page Load Time**: < 3 seconds
- **Lighthouse Performance**: > 90
- **Lighthouse Accessibility**: > 95
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

## Support & Maintenance

- Monitor server health daily
- Check error logs weekly
- Update dependencies monthly
- Review security advisories weekly
- Backup verification monthly
- Performance audit quarterly

---

## Quick Start Commands

```bash
# Development
npm start

# Build for production
npm run build

# Run production server
cd server && NODE_ENV=production node index.js

# Run tests
npm test

# Check for vulnerabilities
npm audit
cd server && npm audit

# Update dependencies
npm update
cd server && npm update
```

## Emergency Contacts

- MongoDB Support: https://support.mongodb.com
- Cloudflare Support: https://support.cloudflare.com
- Vercel Support: https://vercel.com/support

---

**Last Updated**: Check this list before every deployment!
