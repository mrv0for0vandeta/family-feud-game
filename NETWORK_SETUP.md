# 🌐 Network Setup Guide

## Cross-Machine Sync Setup

For the Host and Display to sync across different machines, they need to share the same localStorage. Here are the options:

## Option 1: Same Network + Shared Server (Recommended)

### Setup Steps:

1. **On Host Machine:**
   ```bash
   npm run dev
   ```
   Note the IP address (e.g., `192.168.1.100:3000`)

2. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       host: '0.0.0.0', // Allow external connections
       port: 3000
     }
   })
   ```

3. **Restart the server:**
   ```bash
   npm run dev
   ```

4. **On Display Machine:**
   - Open browser
   - Go to `http://192.168.1.100:3000` (use host machine's IP)
   - Click "DISPLAY"

Both machines will now share the same server and sync automatically!

## Option 2: Build and Deploy

### Build for Production:
```bash
npm run build
```

### Serve on Local Network:
```bash
npx serve dist -l 3000
```

Then access from any device on the network using the host IP.

## Option 3: Cloud Deployment

Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure in repository settings

Then both machines access the same URL and sync via localStorage polling.

## Current Sync Method

The app now uses **localStorage polling** (checks every 500ms):
- ✅ Works on same machine (different tabs)
- ✅ Works on same network (same server)
- ✅ Works with cloud deployment
- ✅ No external dependencies

## Testing Sync

1. Open Host on one device
2. Open Display on another device (same server)
3. Make changes on Host
4. Display updates within 500ms

## Troubleshooting

### Sync not working?
- Ensure both devices access the same URL
- Check if localStorage is enabled
- Verify network connectivity
- Check browser console for errors

### Slow sync?
- Adjust polling interval in `gameStore.js` (line 35)
- Default is 500ms, can reduce to 200ms for faster sync

### Different networks?
- Use cloud deployment (Vercel/Netlify)
- Both devices access same URL
- Sync works globally
