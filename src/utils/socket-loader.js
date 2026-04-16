// Lazy loader for socket.io-client
// Socket.IO is loaded from CDN in index.html and available as window.io
export const loadSocketIO = async () => {
    if (typeof window === 'undefined') {
        return null
    }

    try {
        // Check if socket.io is available from CDN
        if (window.io) {
            return window.io
        }

        // Fallback: try dynamic import if CDN failed
        const socketIO = await import(/* @vite-ignore */ 'socket.io-client')
        return socketIO.io || socketIO.default?.io || socketIO.default
    } catch (error) {
        console.error('Failed to load socket.io-client:', error)
        return null
    }
}
