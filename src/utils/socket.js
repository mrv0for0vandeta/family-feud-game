// Socket.IO client wrapper
import { loadSocketIO } from './socket-loader'

let socket = null
let io = null
let initPromise = null

export const initSocket = async (socketUrl) => {
    if (typeof window === 'undefined') {
        return null
    }

    // Return existing socket if already initialized
    if (socket) {
        return socket
    }

    // Return existing initialization promise if in progress
    if (initPromise) {
        return initPromise
    }

    // Start initialization
    initPromise = (async () => {
        try {
            console.log('🔌 Initializing socket connection to:', socketUrl)

            // Load socket.io-client dynamically
            io = await loadSocketIO()

            if (!io) {
                console.error('❌ Failed to load socket.io-client: io function not found')
                return null
            }

            console.log('✅ Socket.IO library loaded successfully')

            socket = io(socketUrl, {
                transports: ['websocket', 'polling']
            })

            console.log('🔌 Socket instance created')

            return socket
        } catch (error) {
            console.error('❌ Failed to initialize socket:', error)
            return null
        }
    })()

    return initPromise
}

export const getSocket = () => socket

export const isSocketConnected = () => {
    const connected = socket && socket.connected
    if (!connected && socket) {
        console.warn('⚠️ Socket exists but not connected. State:', socket.connected)
    }
    return connected
}
