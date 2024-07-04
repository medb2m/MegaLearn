import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

const { secret } = config;

export function handleSocketEvents(io, req) {
     /* io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        console.log('le tok : '+ token)
        if (!token) {
            console.error('Authentication error: No token provided');
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                console.error('Authentication error: User not found');
                return next(new Error('User not found'));
            }

            socket.user = user;
            next();
        } catch (err) {
            console.error('Authentication error:', err.message);
            return next(new Error('Authentication error'));
        }
    }); */ 

    io.on('connection', (socket) => {
        //console.log('User connected:' + socket.user.username);
        console.log('User connected:!!');

        socket.on('wallah', async (message) => {
            /* const messageData = {
                senderID: socket.user._id,
                senderName: socket.user.username,
                message: message.content,
            }; */

            //const newMsg = await Chat.create(messageData);

            //io.to(message.roomId).emit('message', newMsg);
            console.log('Received message:', message);
            io.emit('wallah', message) // Broadcast to all clients `${JSON.stringify(messageObject)}`
            console.log('le mess '+ message)
        });

        socket.on('join', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.user.email} joined room ${roomId}`);
            socket.to(roomId).emit('user-joined', socket.user.id);
        });

        socket.on('offer', (payload) => {
            console.log(`Offer from ${socket.user.email} to room ${payload.target}`);
            io.to(payload.target).emit('offer', payload);
        });

        socket.on('answer', (payload) => {
            console.log(`Answer from ${socket.user.email} to room ${payload.target}`);
            io.to(payload.target).emit('answer', payload);
        });

        socket.on('ice-candidate', (incoming) => {
            console.log(`ICE candidate from ${socket.user.email} to room ${incoming.target}`);
            io.to(incoming.target).emit('ice-candidate', incoming.candidate);
        });
        
        socket.on('disconnect', () => {
            //console.log('User disconnected : ' + socket.user.username );
            console.log('User disconnected !!!: ' );
        });
    });
}
