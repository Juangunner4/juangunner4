# 🚀 Quick Start Guide - Production Deployment

## ⚡ Fast Track (5 Steps)

### 1. Environment Setup (15 min)
```bash
# Backend
cd server
cp .env.example .env
nano .env  # Edit these REQUIRED variables:
```
Required:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `CLOUDFLARE_TURNSTILE_SECRET_KEY` - Get from https://dash.cloudflare.com/
- `NODE_ENV=production`

```bash
# Frontend
cd ..
cp .env.example .env
nano .env  # Edit:
```
Required:
- `REACT_APP_TURNSTILE_SITE_KEY` - Match backend Turnstile key

### 2. Install & Build (5 min)
```bash
# Install all dependencies
npm install
cd server && npm install && cd ..

# Build frontend
npm run build
```

### 3. Test Locally (5 min)
```bash
# Start server
npm run server

# In another terminal, serve built files
npm install -g serve
serve -s build -p 3000

# Test at http://localhost:3000
```

### 4. Deploy (30 min)
**Option A: VPS (DigitalOcean, Linode, etc.)**
```bash
# On your server
git clone your-repo
cd juangunner4
npm install && cd server && npm install && cd ..
npm run build

# Start with PM2
npm install -g pm2
cd server
pm2 start index.js --name juangunner4-api
pm2 save && pm2 startup

# Serve frontend
cd ../build
pm2 serve . 3000 --spa --name juangunner4-web
```

**Option B: Platform as a Service**
- **Frontend**: Deploy to Vercel/Netlify (connect GitHub, auto-deploy)
- **Backend**: Deploy to Render/Railway (set env vars, deploy)

### 5. Verify (10 min)
- [ ] Site loads
- [ ] Can register user
- [ ] Can login
- [ ] Profile updates work
- [ ] SSL certificate valid

## 🔐 Critical Security Settings

### Must Configure
1. **JWT_SECRET**: Never use default! Generate new one
2. **MONGODB_URI**: Use strong password
3. **CORS_ORIGIN**: Set to your domain (e.g., `https://juangunner4.com`)
4. **NODE_ENV**: Set to `production`
5. **Turnstile Keys**: Use production keys, not test keys

### MongoDB Atlas Setup
```
1. Create account at mongodb.com/atlas
2. Create cluster (free tier OK)
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (or specific server IP)
5. Get connection string
6. Replace <password> in connection string
```

## 📊 Quick Health Check

After deployment, verify:
```bash
# API health
curl https://your-domain.com/api/health

# Should return: 200 OK

# Test registration (with Turnstile token)
curl -X POST https://your-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"testpass123","confirmPassword":"testpass123","turnstileToken":"test-token"}'
```

## 🐛 Common Issues

### "MongoDB connection failed"
- Check MONGODB_URI format
- Verify IP whitelist (Atlas)
- Test connection: `mongosh "your-connection-string"`

### "CORS error"
- Set CORS_ORIGIN in backend .env
- Must match frontend domain exactly

### "Rate limit exceeded"
- Normal if testing repeatedly
- Wait 15 minutes or adjust limits in server/index.js

### "Turnstile verification failed"
- Using test keys? They only work in development
- Get production keys from Cloudflare

## 📝 Environment Variables Quick Reference

### Backend (server/.env)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/juangunner4
JWT_SECRET=your-32-char-or-longer-secret-here
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)
```env
REACT_APP_TURNSTILE_SITE_KEY=your-site-key
REACT_APP_API_URL=https://api.yourdomain.com
```

## 🎯 Performance Tips

1. **Enable gzip** on your server (nginx/apache)
2. **Use CDN** for static assets (Cloudflare)
3. **Monitor** with UptimeRobot or Pingdom
4. **Backup** database daily (Atlas has auto-backup)
5. **Update** dependencies monthly

## 📞 Get Help

- **Documentation**: See PRODUCTION_CHECKLIST.md
- **API Reference**: See API_DOCUMENTATION.md
- **Full Report**: See PRODUCTION_READINESS_REPORT.md

## ✅ Deployment Checklist

- [ ] Environment variables set
- [ ] MongoDB accessible
- [ ] Build succeeds
- [ ] Local testing passed
- [ ] Deployed to hosting
- [ ] DNS configured
- [ ] SSL installed
- [ ] Production testing passed
- [ ] Monitoring set up

## 🎉 You're Live!

Your app is production-ready. Just:
1. Set environment variables
2. Build and deploy
3. Test everything
4. Go live! 🚀

---

**Time to Production**: ~1 hour  
**Difficulty**: Intermediate  
**Cost**: Free tier possible (Atlas, Vercel, Railway)
