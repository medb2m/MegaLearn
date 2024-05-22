import chatMessageController from '../controllers/chatMessage.controller.js';

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
                    sender: socket.username,
                    message: msg.message,
                    reclamation: msg.reclamationId
                };
                try {
                    await chatMessageController.createChatMessage({ body: message }, {
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