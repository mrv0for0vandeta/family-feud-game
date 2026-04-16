# 🎮 How to Start the Game

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start the Socket Server (Required for Sync)

Open a **first terminal** and run:

```bash
npm run server
```

You should see:
```
🚀 Socket server running on port 3001
```

**Keep this terminal running!**

## Step 3: Start the Game Application

Open a **second terminal** and run:

```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:3000
Network: http://192.168.X.X:3000
```

## Step 4: Play the Game

### On Host Machine:
1. Open browser → http://localhost:3002 (or whatever port Vite shows)
2. Click **"HOST"**
3. Note the 6-character party code (e.g., `A3X9K2`)

### On Display Machine (Projector/TV):
1. Open browser → http://localhost:3002 (or use network IP from Vite output)
2. Click **"DISPLAY"**
3. Enter the party code from host
4. Click **"Join Game"**
5. Press **F** for fullscreen

## ✅ Verification

You should see:
- ✅ "Connected to game server" in browser console
- ✅ "Joined party: XXXXXX" in browser console
- ✅ Party code displayed on both screens
- ✅ Changes on host appear instantly on display

## 🔧 Troubleshooting

### Server not starting?
```bash
npm install socket.io express cors
npm run server
```

### Display not updating?
1. Check browser console for connection errors
2. Ensure server is running (port 3001)
3. Verify both devices use same party code
4. Refresh both pages

### Different machines not connecting?
1. Find host machine IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On display machine, use: `http://192.168.X.X:3000`
3. Ensure both on same network
4. Check firewall settings

## 🌐 Network Setup

### Same Machine (Testing):
- Host: http://localhost:3002 (or whatever port Vite shows)
- Display: http://localhost:3002 (different tab)

### Different Machines (Same Network):
- Host: http://localhost:3002
- Display: http://10.152.36.46:3002 (use host's network IP from Vite output)
- **Important**: Socket server must be accessible at http://HOST_IP:3001

### Production Deployment:
Deploy both frontend and server to:
- Vercel/Netlify (frontend)
- Heroku/Railway (server)
- Update SOCKET_URL in gameStore.js to your deployed server URL

## 📝 Quick Start Commands

```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start app
npm run dev
```

That's it! 🎉
