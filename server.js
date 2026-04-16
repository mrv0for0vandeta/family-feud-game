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
            socket.emit('game-state', gameStates.get(partyCode));
        }
    });

    // Update game state
    socket.on('update-state', ({ partyCode, state }) => {
        gameStates.set(partyCode, state);
        // Broadcast to all clients in the party room
        io.to(partyCode).emit('game-state', state);
        console.log(`State updated for party: ${partyCode}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`🚀 Socket server running on port ${PORT}`);
});
