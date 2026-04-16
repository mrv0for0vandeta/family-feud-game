# 🌐 Network Setup Guide

## Cross-Machine Sync with Socket.IO

The game uses Socket.IO for real-time synchronization between Host and Display across different machines.

## Quick Setup for Different Machines

### 1. Find Your Host Machine's IP Address

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., `10.152.36.46`)

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" address

### 2. Update the .env File

Create/edit `.env` file in the project root:
```
VITE_SOCKET_URL=http://YOUR_IP:3001
```

Example:
```
VITE_SOCKET_URL=http://10.152.36.46:3001
```

### 3. Start Both Servers on Host Machine

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Socket.IO Server:**
```bash
npm run server
```

### 4. Access from Other Machines

**On Host Machine:**
- Open: `http://YOUR_IP:3000` (e.g., `http://10.152.36.46:3000`)
- Click "HOST"

**On Display Machine (different computer):**
- Open: `http://YOUR_IP:3000` (e.g., `http://10.152.36.46:3000`)
- Click "DISPLAY"
- Enter the party code from Host

Both machines will now sync in real-time! 🎉

## Firewall Configuration

If connection fails, you may need to allow ports through Windows Firewall:

**Windows:**
```powershell
# Allow Vite dev server (port 3000)
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=3000

# Allow Socket.IO server (port 3001)
netsh advfirewall firewall add rule name="Socket.IO Server" dir=in action=allow protocol=TCP localport=3001
```

## Troubleshooting

### Display not updating?

1. **Check both servers are running:**
   - Vite dev server on port 3000
   - Socket.IO server on port 3001

2. **Check browser console (F12):**
   - Look for: `✅ Connected to game server`
   - Look for: `🎮 Joined party: XXXXXX`

3. **Verify IP address:**
   - Make sure `.env` has correct IP
   - Restart dev server after changing `.env`

4. **Check firewall:**
   - Ensure ports 3000 and 3001 are open
   - Try temporarily disabling firewall to test

5. **Same network:**
   - Both machines must be on same WiFi/network
   - Check if network allows device-to-device communication

### Connection Errors?

- **CORS errors**: Server already configured for CORS
- **Connection refused**: Check if Socket.IO server is running
- **Timeout**: Verify IP address and firewall settings

## Testing Sync

1. Open browser console (F12) on both machines
2. On Host: Click "Reveal" for an answer
3. Check Host console: `📤 Broadcasting state to party`
4. Check Display console: `📥 Received state update`
5. Display should update immediately

## Production Deployment

For production, deploy both frontend and Socket.IO server:

### Option 1: Same Server
Deploy to a VPS and run both servers

### Option 2: Separate Servers
- Frontend: Vercel/Netlify
- Socket.IO: Heroku/Railway
- Update `VITE_SOCKET_URL` to point to Socket.IO server

## Current Configuration

- **Frontend**: Vite dev server on `0.0.0.0:3000` (accessible from network)
- **Backend**: Socket.IO server on `0.0.0.0:3001` (accessible from network)
- **Sync Method**: Real-time via Socket.IO rooms
- **Party System**: Each game has unique 6-character code


