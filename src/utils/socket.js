// Socket.IO client wrapper
let socket = null
let io = null

export const initSocket = async (socketUrl) => {
    if (typeof window === 'undefined' || socket) {
        return socket
    }

    try {
        const module = await import('socket.io-client')
        io = module.io
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
