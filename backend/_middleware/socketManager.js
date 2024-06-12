<<<<<<< HEAD
import { addMessage } from '../controllers/chat.controller.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

const { secret } = config


export function handleSocketEvents(io) {
    // Verify User
    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            const decoded = jwt.verify(token, secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                return next(new Error('User not found'));
            }

            socket.user = user;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.user.firstName);

        // WebRTC signaling
        socket.on('offer', (payload) => {
            io.to(payload.target).emit('offer', payload);
        });

        socket.on('answer', (payload) => {
            io.to(payload.target).emit('answer', payload);
        });

        socket.on('ice-candidate', (incoming) => {
            io.to(incoming.target).emit('ice-candidate', incoming.candidate);
        });

        // Handle chat messages
        socket.on('send message', async ({ claimID, receiverID, message }) => {
            if (socket.user) {
                const messageData = {
                    senderID: socket.user._id,
                    receiverID,
                    claimID,
                    senderName: socket.user.firstName,
                    message
                };
                // Save the message in DB
                await addMessage({ body: messageData, user: socket.user }, null);
                // Emit message to receiver only
                socket.to(receiverID).emit('receive message', messageData);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
=======
import { addMessage } from "../controllers/chat.controller.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

const { secret } = config;

export function handleSocketEvents(io) {
  // Verify User
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.firstName);

    // WebRTC signaling
    socket.on("offer", (payload) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    // Handle chat messages
    socket.on("send message", async ({ claimID, receiverID, message }) => {
      if (socket.user) {
        const messageData = {
          senderID: socket.user._id,
          receiverID,
          claimID,
          senderName: socket.user.firstName,
          message,
        };
        // Save the message in DB
        await addMessage({ body: messageData, user: socket.user }, null);
        // Emit message to receiver only
        socket.to(receiverID).emit("receive message", messageData);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
>>>>>>> origin/main
}
