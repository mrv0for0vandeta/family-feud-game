// Lazy loader for socket.io-client
// Socket.IO is loaded from CDN in index.html and available as window.io
export const loadSocketIO = async () => {
    if (typeof window === 'undefined') {
        console.warn('⚠️ loadSocketIO called in non-browser environment')
        return null
    }

    try {
        // Check if socket.io is available from CDN
        if (window.io) {
            console.log('✅ Socket.IO loaded from CDN (window.io)')
            return window.io
        }

        console.log('⚠️ Socket.IO not found on window.io, trying dynamic import...')

        // Fallback: try dynamic import if CDN failed
        const socketIO = await import(/* @vite-ignore */ 'socket.io-client')
        const ioFunc = socketIO.io || socketIO.default?.io || socketIO.default

        if (ioFunc) {
            console.log('✅ Socket.IO loaded via dynamic import')
        } else {
            console.error('❌ Socket.IO import succeeded but io function not found')
        }

        return ioFunc
    } catch (error) {
        console.error('❌ Failed to load socket.io-client:', error)
        return null
    }
}
