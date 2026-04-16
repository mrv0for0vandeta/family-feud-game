# 🎯 Simple Setup - Make It Work in 3 Steps

## Step 1: Deploy Socket Server (2 minutes)

Click this button:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mrv0for0vandeta/family-feud-game)

1. Sign up with GitHub (free, no credit card)
2. Click "Create Web Service"
3. Wait 3-5 minutes
4. **Copy the URL** at the top (e.g., `https://family-feud-socket-xxxx.onrender.com`)

---

## Step 2: Add URL to Vercel (1 minute)

1. Go to: https://vercel.com/dashboard
2. Click your `family-feud-game` project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Fill in:
   - Key: `VITE_SOCKET_URL`
   - Value: Paste your Render URL from Step 1
   - Check all 3 environment boxes
6. Click **Save**

---

## Step 3: Redeploy Vercel (1 minute)

1. Click **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **Redeploy**
4. Wait 2 minutes

---

## ✅ Test It!

### Host (any WiFi):
1. Go to: `https://family-feud-game-three.vercel.app`
2. Click **HOST**
3. Wait 30 seconds (first time wakes up server)
4. Should show **"Connected"** ✅

### Display (different WiFi):
1. Go to: `https://family-feud-game-three.vercel.app`
2. Click **DISPLAY**
3. Enter party code
4. Should show **"Connected"** ✅

### Test Sync:
- Host: Click "Reveal" → Display updates instantly! 🎉

---

## Troubleshooting

**Still "Disconnected"?**
1. Wait 60 seconds (server waking up)
2. Refresh page (Ctrl+F5)
3. Check Render dashboard - is service "Live"?
4. Check Vercel env variable - is URL correct?

**Need help?**
- Check browser console (F12) for errors
- Verify Render URL starts with `https://`
- Make sure you redeployed Vercel after adding env variable

---

**Total Time: 4 minutes** ⏱️
**Total Cost: $0** 💰
