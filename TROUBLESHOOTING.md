# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Error - 500 Error on Registration

**Problem**: POST to `/api/auth/register` returns 500 error

**Causes and Solutions**:

#### MongoDB Not Running:
```bash
# Windows: Check if MongoDB service is running
Get-Service MongoDB

# If not running, start it:
net start MongoDB

# Or start mongod directly:
mongod
```

#### MongoDB Connection String Issues:
- Check `server/.env` file has correct `MONGODB_URI`
- Default for local: `mongodb://localhost:27017/juangunner4`
- Ensure port 27017 is available

#### Test MongoDB Connection:
```bash
# In a new terminal, test MongoDB connection
mongo
# or
mongosh

# You should see a connection prompt
```

---

### 2. Turnstile Token Validation Fails - 403 Forbidden

**Problem**: Registration fails with "Turnstile verification failed"

**Causes**:
- Using test Turnstile keys in production
- Invalid or expired Turnstile token
- Cloudflare can't reach the API endpoint

**Solutions**:

#### For Development with Test Keys:
Modify `server/middleware/turnstile.js` to skip validation in development:

```javascript
const turnstileMiddleware = async (req, res, next) => {
  // Skip validation in development with test keys
  if (process.env.NODE_ENV === 'development' && process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY.includes('0000')) {
    console.log('Skipping Turnstile validation in development mode');
    return next();
  }

  // ... rest of validation code
};
```

#### Or Use Valid Test Keys:
1. Go to https://dash.cloudflare.com/
2. Create a Turnstile site in Test mode
3. Copy the Site Key and Secret Key
4. Update `.env` files with production keys

---

### 3. Frontend Port 3000 Already in Use

**Problem**: `Port 3000 is already in use`

**Solution**:
```bash
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm start
```

---

### 4. Backend Port 4000 Already in Use

**Problem**: `Port 4000 is already in use`

**Solution**:
```bash
# Update PORT in server/.env
# Change: PORT=4000
# To: PORT=4001

# Then restart the server
cd server && npm start
```

---

### 5. Node Modules Not Installed

**Problem**: `Cannot find module 'express'` or similar

**Solution**:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---

### 6. CORS Errors in Browser Console

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
The server is already configured for CORS. Make sure:
1. Backend is running on http://localhost:4000
2. Frontend is running on http://localhost:3000
3. `frontend package.json` has `"proxy": "http://localhost:4000"`

Check `server/index.js` for allowed origins:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000'
];
```

---

### 7. Environment Variables Not Loaded

**Problem**: `process.env.MONGODB_URI is undefined`

**Solution**:
```bash
# For backend, check server/.env exists and has correct format:
MONGODB_URI=mongodb://localhost:27017/juangunner4

# For frontend, all vars must start with REACT_APP_:
REACT_APP_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Restart both servers after .env changes
```

---

### 8. Turnstile Token Verification Takes Too Long

**Problem**: Registration requests timeout

**Causes**:
- Cloudflare API endpoint unreachable
- Network connectivity issue
- Rate limiting

**Solutions**:
```bash
# Test Cloudflare connectivity
curl https://challenges.cloudflare.com/turnstile/v0/siteverify

# Check network in browser DevTools
# Look for slow requests to Cloudflare endpoints

# Increase request timeout in server/middleware/turnstile.js:
axios.post(url, data, {
  timeout: 10000, // 10 second timeout
  headers: {...}
})
```

---

### 9. User Already Registered Error

**Problem**: Can't register with same email twice

**Solution**:
This is intentional. Either:
- Use a different email address
- Clear MongoDB database

```bash
# Connect to MongoDB and clear users
mongo
use juangunner4
db.users.deleteMany({})
exit
```

---

### 10. Password Validation Errors

**Problem**: "Password must be at least 8 characters"

**Solution**:
Password requirements:
- Minimum 8 characters
- Can contain letters, numbers, and special characters
- Example: `password123` ✓

---

## Server Debug Logging

### Enable Detailed Logging

Edit `server/index.js` and add before routes:
```javascript
// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});
```

### Check Server Console

The server terminal should show:
```
Server running on port 4000 in development mode
Mongoose connected to MongoDB
MongoDB Connected: localhost
Database: juangunner4
```

If you see errors, check:
1. MONGODB_URI is correct
2. MongoDB service is running
3. Required npm packages are installed

---

## Testing Registration Endpoint

### Using curl:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "turnstileToken": "test-token"
  }'
```

### Using Postman:
1. Create new POST request to `http://localhost:4000/api/auth/register`
2. Set Body → raw → JSON
3. Paste:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "turnstileToken": "test-token"
}
```
4. Click Send

---

## Additional Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Cloudflare Turnstile**: https://developers.cloudflare.com/turnstile/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/

---

## Still Having Issues?

1. **Check all error messages** in browser console and server terminal
2. **Verify all .env variables** are set correctly
3. **Ensure services are running**: MongoDB, Backend Server, Frontend
4. **Clear browser cache**: Ctrl+Shift+Delete
5. **Restart servers**: Kill and restart both backend and frontend
6. **Check port availability**: Make sure ports 3000, 4000 are free
