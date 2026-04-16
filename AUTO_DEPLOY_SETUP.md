# 🚀 Automatic Deployment Setup

This guide will set up automatic deployment so everything builds and deploys automatically when you push to GitHub.

## What Gets Auto-Deployed

- ✅ **Frontend (Vercel)**: Automatically deploys on every push to `main`
- ✅ **Socket.IO Server (Render)**: Automatically deploys on every push to `main`

---

## Setup Instructions

### 1. Vercel Auto-Deploy (Already Configured!)

Vercel is already connected to your GitHub repo and auto-deploys! ✅

**How it works:**
- Every push to `main` branch triggers automatic deployment
- Vercel builds and deploys the frontend
- Takes ~2 minutes

**To verify:**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Git**
4. Make sure "Production Branch" is set to `main`

---

### 2. Render Auto-Deploy Setup

#### Step 1: Connect GitHub to Render
1. Go to: https://render.com/dashboard
2. Click your **Socket.IO service** (if already created)
3. Go to **Settings** tab
4. Scroll to **Build & Deploy** section
5. Make sure **Auto-Deploy** is set to **Yes**
6. Make sure **Branch** is set to `main`

#### Step 2: Enable Auto-Deploy (If Creating New Service)
When creating the service:
1. In the **Git** section, select your repo
2. **Branch**: `main`
3. **Auto-Deploy**: `Yes` (this is default)
4. Render will automatically deploy on every push!

---

## How It Works

### When You Push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**What happens automatically:**

1. **GitHub** receives your push
2. **Vercel** detects the push and:
   - Installs dependencies
   - Runs `npm run build`
   - Deploys to production
   - Updates `https://family-feud-game-three.vercel.app`
   - Takes ~2 minutes

3. **Render** detects the push and:
   - Installs dependencies
   - Runs `npm run server`
   - Deploys Socket.IO server
   - Updates your socket server URL
   - Takes ~3-5 minutes

---

## Monitoring Deployments

### Vercel Deployments
1. Go to: https://vercel.com/dashboard
2. Click your project
3. See **Deployments** tab for status
4. Green checkmark = deployed successfully ✅

### Render Deployments
1. Go to: https://render.com/dashboard
2. Click your service
3. See **Events** tab for deployment logs
4. "Live" status = deployed successfully ✅

---

## Build Status

You can check build status:

### Vercel
- Visit: https://vercel.com/[your-username]/family-feud-game
- See deployment status in real-time

### Render
- Visit: https://dashboard.render.com
- Click your service
- See "Deploy in progress..." or "Live"

---

## Troubleshooting

### Vercel Build Fails
1. Check **Deployments** tab for error logs
2. Common issues:
   - Missing environment variables
   - Build command errors
   - Node version mismatch

**Fix:**
- Go to **Settings** → **Environment Variables**
- Make sure `VITE_SOCKET_URL` is set
- Redeploy

### Render Build Fails
1. Check **Logs** tab for errors
2. Common issues:
   - Port binding errors
   - Missing dependencies
   - Start command errors

**Fix:**
- Make sure **Start Command** is `npm run server`
- Check **Environment Variables** are set
- Manual redeploy from dashboard

---

## Manual Deploy (If Needed)

### Vercel Manual Deploy
```bash
npm install -g vercel
vercel --prod
```

### Render Manual Deploy
1. Go to dashboard
2. Click your service
3. Click **Manual Deploy** → **Deploy latest commit**

---

## Current Configuration

### Vercel
- ✅ Auto-deploy enabled
- ✅ Branch: `main`
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`

### Render
- ✅ Auto-deploy enabled (via `render.yaml`)
- ✅ Branch: `main`
- ✅ Build command: `npm install`
- ✅ Start command: `npm run server`

---

## Testing Auto-Deploy

1. Make a small change (e.g., edit README.md)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Watch deployments:
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com
4. Both should deploy automatically! 🎉

---

**Everything is now set up for automatic deployment!** 🚀

Just push to GitHub and both services will deploy automatically.
