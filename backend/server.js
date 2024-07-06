import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './_middleware/error-handler.js'

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Chat imports
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketEvents } from './_helpers/socketManager.js'



//  Routes Imports
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import videoRoutes from './routes/video.routes.js'
import categoryRoutes from './routes/category.routes.js'
import blogRoutes from './routes/post.routes.js'
import claimRoutes from './routes/claim.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import certificateRoutes from './routes/certificate.routes.js'
import eventRoutes from './routes/event.routes.js'
import meetingRoutes from './routes/meeting.routes.js'
import entityRouter from './routes/entity.routes.js'



// Express Init
const app = express();
// HTTP Server
const httpServer = createServer(app)
// Init Socket.io with the HTTP Server
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        //origin: ['http://localhost:4200', 'http://172.20.10.2:4200'],
        methods: ['GET', 'POST']
    }
});

/* io.engine.on("initial_headers", (headers, req) => {
    headers["test"] = "123";
    headers["set-cookie"] = "mycookie=456";
  });


  io.engine.on("headers", (headers, req) => {
    headers["test2"] = "789";
    
  }); */

  import User from './models/user.model.js';
  import jwt from 'jsonwebtoken';
  import { config } from './_helpers/config.js';
  
  const { secret } = config;

// Socket Event Management
//handleSocketEvents(io)
io.on('connection', (socket) => {
  console.log('a user connected ');

  socket.on('message', async (token,message,time,pdp) => {
      const decoded = jwt.verify(token, secret);
          const user = await User.findById(decoded.id);
          if (!user) {
              console.error('Authentication error: User not found');
              return next(new Error('User not found'));
          }else {
              socket.user = user;
              pdp = user.image
          }
    console.log('token222');
    io.emit('message', message ,pdp, time, socket.user.username );
    console.log('token333');
  }); 

  socket.on('join', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });
  
  socket.on('offer', (data) => {
    console.log('Offer received:', data)
    socket.to(data.target).emit('offer', {
      sdp: data.sdp,
      sender: socket.id
    })
  })
  
  socket.on('answer', (data) => {
    console.log('Answer received:', data);
    socket.to(data.target).emit('answer', {
      sdp: data.sdp,
      sender: socket.id
    })
  });
  
  socket.on('ice-candidate', (data) => {
    console.log('ICE candidate received:', data);
    socket.to(data.target).emit('ice-candidate', {
      candidate: data.candidate,
      sender: socket.id
    });
  });
  
  socket.on('disconnection', () => {
    console.log('a user disconnected!')
  })

})





io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"))
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


const __dirname = dirname(fileURLToPath(import.meta.url));

// Images Routes
app.use('/img', express.static(path.join(__dirname, 'public', 'images')))
// Videos Routes
app.use('/vid', express.static(path.join(__dirname, 'public', 'videos')))
// Pdfs Routes
app.use('/pdf', express.static(path.join(__dirname, 'public', 'pdf')))


// auth routes
app.use('/accounts', userRoutes);
// course routes
app.use('/courses', courseRoutes);
// video routes
app.use('/videos', videoRoutes);
// category routes
app.use('/categories', categoryRoutes);
// api Blog 
app.use('/blog', blogRoutes);
// Claim Routers 
app.use('/claim', claimRoutes);
// Quiz Routers 
app.use('/quiz', quizRoutes);
// Certificate Routers 
app.use('/certificate', certificateRoutes);
// Events Routers 
app.use('/events', eventRoutes);
app.use('/meeting', meetingRoutes);

// Entity Router
app.use('/entity', entityRouter)



// global error handler
app.use(errorHandler);

// start server
const port = 4000;
httpServer.listen(port,  () => {
    console.log('Server listening on port ' + port);
});