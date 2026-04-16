# 🌐 Expose Your Machine to the Internet

Your machine is already running the servers! Now make them accessible from anywhere.

## Method 1: ngrok (Easiest - 1 minute) ⭐

### Step 1: Run the Expose Script
```powershell
.\expose-servers.ps1
```

This will open 2 windows showing your public URLs.

### Step 2: Get Your URLs
**Window 1 (Frontend):**
```
Forwarding: https://abc123.ngrok.io -> http://localhost:3000
```
Copy: `https://abc123.ngrok.io`

**Window 2 (Socket.IO):**
```
Forwarding: https://xyz789.ngrok.io -> http://localhost:3001
```
Copy: `https://xyz789.ngrok.io`

### Step 3: Update Environment
Create/edit `.env` file:
```
VITE_SOCKET_URL=https://xyz789.ngrok.io
```

### Step 4: Restart Dev Server
```bash
# Stop current dev server (Ctrl+C in terminal)
npm run dev
```

### Step 5: Play!
**Host (your machine):**
- Open: `https://abc123.ngrok.io`
- Click HOST

**Display (any machine, anywhere):**
- Open: `https://abc123.ngrok.io`
- Click DISPLAY
- Enter party code

**Done!** 🎉

---

## Method 2: Port Forwarding (Permanent)

### Step 1: Find Your Public IP
```powershell
curl ifconfig.me
```
Example: `203.0.113.45`

### Step 2: Configure Router
1. Open router admin (usually `192.168.1.1`)
2. Find "Port Forwarding" section
3. Add rules:
   - Port 3000 → 10.152.36.46:3000
   - Port 3001 → 10.152.36.46:3001

### Step 3: Open Windows Firewall
```powershell
# Run as Administrator
netsh advfirewall firewall add rule name="Family Feud Web" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Family Feud Socket" dir=in action=allow protocol=TCP localport=3001
```

### Step 4: Update Environment
`.env` file:
```
VITE_SOCKET_URL=http://YOUR_PUBLIC_IP:3001
```

### Step 5: Access
- Host: `http://YOUR_PUBLIC_IP:3000`
- Display: `http://YOUR_PUBLIC_IP:3000`

---

## Method 3: Cloudflare Tunnel (Free & Permanent)

### Step 1: Install Cloudflared
```powershell
winget install Cloudflare.cloudflared
```

### Step 2: Create Tunnel
```powershell
cloudflared tunnel --url http://localhost:3000
```

### Step 3: Get URL
Copy the URL shown (e.g., `https://abc-def-ghi.trycloudflare.com`)

### Step 4: Create Second Tunnel for Socket.IO
Open new terminal:
```powershell
cloudflared tunnel --url http://localhost:3001
```

### Step 5: Update .env
```
VITE_SOCKET_URL=https://your-socket-tunnel.trycloudflare.com
```

---

## Comparison

| Method | Setup Time | Permanent | Free | Difficulty |
|--------|------------|-----------|------|------------|
| **ngrok** | 1 min | ❌ | ✅ | ⭐ Easy |
| **Port Forward** | 10 min | ✅ | ✅ | ⭐⭐⭐ Medium |
| **Cloudflare** | 5 min | ✅ | ✅ | ⭐⭐ Easy |

---

## Recommendation

**For testing:** Use ngrok (fastest)
**For permanent:** Use Cloudflare Tunnel or Port Forwarding

---

## Security Notes

- ⚠️ Your machine will be accessible from internet
- ✅ Socket.IO has CORS protection
- ✅ No sensitive data exposed
- 💡 Consider using HTTPS (ngrok/Cloudflare provide this)
- 💡 Don't share URLs publicly

---

## Troubleshooting

**ngrok: "command not found"**
- Restart PowerShell after installation
- Or use full path: `C:\Users\[YourUser]\AppData\Local\ngrok\ngrok.exe`

**Connection refused:**
- Check if dev server is running (`npm run dev`)
- Check if Socket.IO server is running (`npm run server`)
- Check firewall settings

**Display not updating:**
- Verify Socket.IO URL in `.env`
- Check browser console for errors
- Restart dev server after changing `.env`

---

**Your machine is the server! Just expose it to the internet.** 🚀
