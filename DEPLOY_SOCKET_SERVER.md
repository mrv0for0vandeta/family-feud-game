# 🚀 Deploy Socket.IO Server for Cross-Network Play

To play Family Feud across **different WiFi networks** (e.g., one player at home, another at a cafe), you need to deploy the Socket.IO server online.

## Option 1: Deploy to Render (Free, Recommended)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (free)

### Step 2: Deploy Socket Server
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `mrv0for0vandeta/family-feud-game`
3. Configure:
   - **Name**: `family-feud-socket`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: `Free`
4. Click "Create Web Service"

### Step 3: Get Your Server URL
After deployment (takes ~5 minutes), you'll get a URL like:
```
https://family-feud-socket.onrender.com
```

### Step 4: Update Vercel Environment Variable
1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add:
   - **Name**: `VITE_SOCKET_URL`
   - **Value**: `https://family-feud-socket.onrender.com` (your Render URL)
4. Redeploy your Vercel app

### Step 5: Test
1. **Host**: Open `https://family-feud-game-three.vercel.app`
2. Click "HOST" - should show "Connected" (green)
3. **Participant** (different network): Open same URL
4. Click "DISPLAY" and enter party code
5. Both should sync in real-time! 🎉

---

## Option 2: Deploy to Railway (Free)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Click "New Project" → "Deploy from GitHub repo"
2. Select `family-feud-game`
3. Add environment variable:
   - `NODE_ENV` = `production`
4. Railway will auto-detect and deploy

### Step 3: Get URL
Copy the generated URL (e.g., `https://family-feud-socket.up.railway.app`)

### Step 4: Update Vercel
Same as Option 1, Step 4

---

## Option 3: Deploy to Heroku (Free Tier Ended)

Heroku no longer offers free tier, but if you have a paid account:

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create family-feud-socket

# Deploy
git push heroku main

# Get URL
heroku open
```

---

## Testing Your Deployment

### Test Socket Connection
Open: `https://your-vercel-url.vercel.app/test-socket.html`

You should see:
- ✅ Connected to server
- Socket ID displayed
- Able to join party and send updates

### Troubleshooting

**"Disconnected" status:**
- Check if Socket.IO server is running (visit the Render/Railway URL)
- Verify `VITE_SOCKET_URL` environment variable in Vercel
- Check browser console for CORS errors

**CORS errors:**
- Socket server already configured for CORS
- Make sure you're using HTTPS URLs (not HTTP)

**Connection timeout:**
- Free tier services may sleep after inactivity
- First connection might take 30-60 seconds to wake up
- Subsequent connections will be instant

---

## Current Setup

- **Frontend**: Deployed on Vercel
- **Socket Server**: Needs to be deployed (follow steps above)
- **Local Development**: Use `npm run dev` + `npm run server`

## Cost

- **Render Free Tier**: 750 hours/month (enough for your game)
- **Railway Free Tier**: $5 credit/month
- **Vercel**: Free for frontend

Both are completely free for your use case! 🎉
