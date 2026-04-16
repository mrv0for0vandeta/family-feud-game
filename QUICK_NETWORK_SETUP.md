# 🚀 Quick Network Setup - Cross-Machine Sync

## Your Current Configuration

**Host Machine IP:** `10.152.36.46`

## Steps to Enable Cross-Machine Sync

### 1. ✅ Already Done
- Socket.IO server configured for network access
- `.env` file created with your IP address
- Firewall ports need to be opened (see below)

### 2. Open Firewall Ports (IMPORTANT!)

Run these commands in **PowerShell as Administrator**:

```powershell
# Allow Vite dev server (port 3000)
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=3000

# Allow Socket.IO server (port 3001)
netsh advfirewall firewall add rule name="Socket.IO Server" dir=in action=allow protocol=TCP localport=3001
```

### 3. Restart the Dev Server

**Stop the current dev server** (Ctrl+C) and restart:

```bash
npm run dev
```

This will pick up the new `.env` configuration.

### 4. Access from Other Machines

**On Host Machine:**
- Open: `http://10.152.36.46:3000`
- Click "HOST"
- Note the party code (e.g., "4GFYDJ")

**On Display Machine (different computer):**
- Make sure it's on the **same WiFi network**
- Open: `http://10.152.36.46:3000`
- Click "DISPLAY"
- Enter the party code from Host
- Press F for fullscreen

### 5. Test the Sync

1. On Host: Click "Reveal" for answer #1
2. Display should update **immediately**
3. Check browser console (F12) for sync logs

## Troubleshooting

### Display not connecting?

**Check 1: Are both servers running?**
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

**Check 2: Firewall open?**
- Run the PowerShell commands above
- Or temporarily disable Windows Firewall to test

**Check 3: Same network?**
- Both machines must be on same WiFi
- Check IP: `ipconfig` on Windows

**Check 4: Browser console**
- Press F12 on both machines
- Look for: `✅ Connected to game server`
- Look for: `🎮 Joined party: XXXXXX`

### If IP Address Changes

If your machine's IP changes (e.g., reconnect to WiFi):

1. Find new IP: `ipconfig`
2. Update `.env` file with new IP
3. Restart both servers

## Current Status

✅ Socket.IO server: Running on `0.0.0.0:3001`  
✅ Vite dev server: Configured for `0.0.0.0:3000`  
✅ Environment: `.env` file created  
⚠️ Firewall: **Needs to be configured** (see step 2)  

## Next Steps

1. **Open firewall ports** (step 2 above)
2. **Restart dev server** to load `.env`
3. **Test from another machine** on same network

---

**Need help?** Check `NETWORK_SETUP.md` for detailed troubleshooting.
