// Socket.IO client wrapper
let socket = null
let io = null

export const initSocket = async (socketUrl) => {
    if (typeof window === 'undefined' || socket) {
        return socket
    }

    try {
        // Use a more explicit dynamic import that Vite can handle
        const module = await import(/* @vite-ignore */ 'socket.io-client')
        io = module.io || module.default?.io || module.default

        if (!io) {
            console.error('Failed to load socket.io-client: io function not found')
            return null
        }

        socket = io(socketUrl, {
            transports: ['websocket', 'polling']
        })
        return socket
    } catch (error) {
        console.error('Failed to initialize socket:', error)
        return null
    }
}

export const getSocket = () => socket

export const isSocketConnected = () => socket && socket.connected
