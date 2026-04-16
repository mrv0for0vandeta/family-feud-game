import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store game states by party code
const gameStates = new Map();

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join a party room
    socket.on('join-party', (partyCode) => {
        socket.join(partyCode);
        console.log(`Client ${socket.id} joined party: ${partyCode}`);

        // Send current state if it exists
        if (gameStates.has(partyCode)) {
            console.log(`📤 Sending existing state to ${socket.id}`);
            socket.emit('game-state', gameStates.get(partyCode));
        } else {
            console.log(`ℹ️ No existing state for party: ${partyCode}`);
        }
    });

    // Update game state
    socket.on('update-state', ({ partyCode, state }) => {
        console.log(`📥 Received state update from ${socket.id} for party: ${partyCode}, Action: ${state.lastAction?.type}`);
        gameStates.set(partyCode, state);
        // Broadcast to all clients in the party room
        io.to(partyCode).emit('game-state', state);
        console.log(`📤 Broadcasted state to party: ${partyCode}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Socket server running on port ${PORT}`);
    console.log(`📡 Accessible on network at http://<your-ip>:${PORT}`);
});
