import { createChat } from '../controllers/chat.controller.js';

export function handleSocketEvents(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('send name', (username) => {
            socket.username = username;
            console.log('Username:', username);
            io.emit('send name', username);
        });

        socket.on('send message', async (msg) => {
            console.log('Message:', msg);
            if (socket.username) {
                const message = {
                    sender: msg.sender, // Use msg.sender from the client
                    message: msg.message,
                    reclamation: msg.reclamationId,
                    timestamp: msg.timestamp, // Use the timestamp sent from the client
                    isRead: msg.isRead
                };
                try {
                    await createChat({ body: message }, {
                        status: (code) => ({ json: (data) => console.log(data) })
                    });
                    io.emit('receive message', message);
                } catch (error) {
                    console.error('Error saving message:', error);
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}