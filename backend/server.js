<<<<<<< HEAD
﻿import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import errorHandler from './_middleware/error-handler.js'

// Chat imports
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketEvents } from './_helpers/socketManager.js'


=======
﻿import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./_middleware/error-handler.js";

// Chat imports
import { createServer } from "http";
import { Server } from "socket.io";
import { handleSocketEvents } from "./_helpers/socketManager.js";
>>>>>>> origin/main

//  Routes Imports
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import videoRoutes from './routes/video.routes.js'
import categoryRoutes from './routes/category.routes.js'
import blogRoutes from './routes/post.routes.js'
import claimRoutes from './routes/claim.routes.js'
import chatRoutes from './routes/chat.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import certificateRoutes from './routes/certificate.routes.js'
import eventRoutes from './routes/event.routes.js'
<<<<<<< HEAD
=======
import meetingRoutes from './routes/meeting.routes.js'
>>>>>>> origin/main


// Express Init
const app = express();
// HTTP Server
<<<<<<< HEAD
const httpServer = createServer(app)
// Init Socket.io with the HTTP Server
const io = new Server(httpServer, {
    cors: {
        origin: '*', 
=======
const httpServer = createServer(app);
// Init Socket.io with the HTTP Server
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Update this with your client's origin if needed
>>>>>>> origin/main
        methods: ['GET', 'POST']
    }
});

// Socket Event Management
<<<<<<< HEAD
handleSocketEvents(io)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"))
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
=======
handleSocketEvents(io);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);
>>>>>>> origin/main
//app.use(cors())

// Event config Chat
/* io.on('connection', (socket) => { 
    socket.on('send name', (username) => { 
        io.emit('send name', (username)); 
    }); 
  
    socket.on('send message', (chat) => { 
        io.emit('send message', (chat)); 
    }); 
});  */

<<<<<<< HEAD


=======
>>>>>>> origin/main
/* app.get('/', (req, res) => { 
    res.sendFile('index.html'); 
});  */

// Put routes here

// Images Routes
<<<<<<< HEAD
app.use("/img" ,express.static("public/images"))
// Videos Routes
app.use("/vid" ,express.static("public/videos"))


// auth routes
app.use('/user', userRoutes);
// course routes
app.use('/course', courseRoutes);
// video routes
app.use('/video', videoRoutes);
// category routes
app.use('/category', categoryRoutes);
=======
app.use("/img", express.static("public/images"));
// Videos Routes
app.use("/vid" ,express.static("public/videos"))
// Videos Routes
app.use("/pdf" ,express.static("public/pdf"))


// auth routes
app.use('/accounts', userRoutes);
// course routes
app.use('/courses', courseRoutes);
// video routes
app.use('/videos', videoRoutes);
// category routes
app.use('/categories', categoryRoutes);
>>>>>>> origin/main
// api Blog 
app.use('/blog', blogRoutes);
// Claim Routers 
app.use('/claim', claimRoutes);
// Chat Routers 
app.use('/chat', chatRoutes);
// Quiz Routers 
app.use('/quiz', quizRoutes);
// Certificate Routers 
app.use('/certificate', certificateRoutes);
// Events Routers 
app.use('/event', eventRoutes);
<<<<<<< HEAD

=======
// Meetings Routers 
app.use('/meeting', meetingRoutes);
>>>>>>> origin/main


// global error handler
app.use(errorHandler);

// start server
<<<<<<< HEAD
const port = 3030
httpServer.listen(port, () => {
    console.log('Server listening on port ' + port);
});
=======
const port = 4000;
httpServer.listen(port, () => {
  console.log("Server listening on port " + port);
});
>>>>>>> origin/main
