// Socket.IO client wrapper
import { loadSocketIO } from './socket-loader'

let socket = null
let io = null

export const initSocket = async (socketUrl) => {
    if (typeof window === 'undefined' || socket) {
        return socket
    }

    try {
        // Load socket.io-client dynamically
        io = await loadSocketIO()

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
