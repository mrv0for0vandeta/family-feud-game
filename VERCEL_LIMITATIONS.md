# ⚠️ Vercel Limitations for Socket.IO

## Why Socket.IO Doesn't Work on Vercel

Vercel is designed for **serverless functions** and **static hosting**, which means:

❌ **No long-running processes** - Serverless functions timeout after 10 seconds (free) or 60 seconds (pro)
❌ **No WebSocket support** - Vercel doesn't support persistent WebSocket connections
❌ **No stateful servers** - Each request is handled by a new instance

Socket.IO requires:
✅ **Long-running process** - Server stays alive to maintain connections
✅ **WebSocket support** - Real-time bidirectional communication
✅ **Stateful server** - Maintains game state and connections

## Solutions

### Option 1: Use Render for Socket.IO (Recommended) ⭐

**Pros:**
- ✅ Free tier available
- ✅ Supports WebSockets
- ✅ Auto-deploys from GitHub
- ✅ Works across different WiFi networks

**Setup:** 5 minutes (see DEPLOY_SOCKET_SERVER.md)

---

### Option 2: Use Railway for Socket.IO

**Pros:**
- ✅ $5 free credit per month
- ✅ Supports WebSockets
- ✅ Auto-deploys from GitHub
- ✅ Faster than Render

**Setup:** 5 minutes

---

### Option 3: Use Local Server (Same WiFi Only)

**Pros:**
- ✅ Works immediately
- ✅ No deployment needed
- ✅ Free

**Cons:**
- ❌ Only works on same WiFi network
- ❌ Requires your computer to be running

**Setup:**
```bash
npm run dev
npm run server
```

Access at: `http://YOUR_IP:3000`

---

### Option 4: Use Pusher or Ably (Paid Services)

Replace Socket.IO with a managed service:
- **Pusher**: $49/month for production
- **Ably**: Free tier with limits

**Not recommended** - expensive for a simple game

---

## Current Setup

Your project is configured for:
- **Frontend**: Vercel (works perfectly ✅)
- **Socket.IO Server**: Needs separate deployment (Render/Railway)

## Quick Start

1. **Deploy Socket.IO to Render** (5 minutes):
   - Go to https://render.com
   - Create Web Service from GitHub
   - Use `npm run server` as start command

2. **Add URL to Vercel**:
   - Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_SOCKET_URL` = your Render URL

3. **Done!** Everything works across different networks

---

## Why Not Use Vercel Edge Functions?

Vercel Edge Functions also don't support WebSockets. They're designed for:
- API routes
- Server-side rendering
- Middleware

Not for:
- WebSocket servers
- Long-running processes
- Stateful applications

---

## Recommendation

**Use Render for Socket.IO** - it's free, easy, and works perfectly with Vercel!

Total cost: **$0/month** 🎉
Total setup time: **5 minutes** ⏱️

See DEPLOY_SOCKET_SERVER.md for step-by-step instructions.
