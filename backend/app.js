import express from "express";
import morgan from "morgan";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import db from './models/users/index.js';
import { dbConfig } from "./config/db.config.js";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import reclamationRoutes from './routes/reclamation.routes.js';
import chatMessageRoutes from './routes/chatMessage.routes.js';
import { handleSocketEvents } from './helpers/socketManager.js'; // Import the socket manager

const Role = db.role;
const app = express();

dotenv.config();

var corsOptions = {
  origin: "http://localhost:3031",
  credentials: true
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(
  cookieSession({
    name: "perpill-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true
  })
);

// Serve static files from the public directory
app.use(express.static('public'));

// First middleware
app.use((req, res, next) => {
  console.log('First MiddleWare just ran');
  next();
});

authRoutes(app);
userRoutes(app);
app.use('/api', reclamationRoutes);
app.use('/api', chatMessageRoutes); // Use the chat message routes

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export function startServer(io) {
  mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
    .then(() => {
      console.log("Connexion à MongoDB réussie.");
      initial();
      handleSocketEvents(io); // Add this line to start handling socket events
    })
    .catch(err => {
      console.error("Erreur de connexion", err);
      process.exit();
    });
}

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save()
      ]);
      console.log("Roles initialisés avec succès.");
    } else {
      console.log("Les rôles existent déjà dans la collection.");
    }
  } catch (err) {
    console.error("Erreur lors de l'initialisation des rôles :", err);
  }
}

export default app;