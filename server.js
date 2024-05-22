import app, { startServer } from './backend/app.js';
import http from 'http';
import { Server } from 'socket.io';

const port = process.env.PORT || 3030;
app.set('port', port);

const server = http.createServer(app);
const io = new Server(server);

server.listen(port, () => { 
  console.log(`Server running on http://localhost:${port}`);
  startServer(io); // Pass the io instance to startServer
});