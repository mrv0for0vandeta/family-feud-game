// Vercel Serverless Function for Socket.IO
// Note: This is a fallback - for production, use a dedicated server like Render

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // This is a placeholder - Vercel doesn't support WebSockets
    // You MUST use a dedicated server (Render, Railway, etc.)
    res.status(200).json({
        error: 'Socket.IO requires a dedicated server',
        message: 'Please deploy the Socket.IO server to Render or Railway',
        instructions: 'See DEPLOY_SOCKET_SERVER.md for setup instructions'
    });
}
