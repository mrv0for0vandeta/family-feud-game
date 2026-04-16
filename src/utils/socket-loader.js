// Lazy loader for socket.io-client to avoid build-time resolution
export const loadSocketIO = async () => {
    if (typeof window === 'undefined') {
        return null
    }

    try {
        // This will only be evaluated at runtime in the browser
        const socketIO = await import('socket.io-client')
        return socketIO.io || socketIO.default?.io || socketIO.default
    } catch (error) {
        console.error('Failed to load socket.io-client:', error)
        return null
    }
}
