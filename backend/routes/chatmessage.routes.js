import express from 'express';
import chatMessageController from '../controllers/chatmessage.controller';

const router = express.Router();

// Routes pour les messages de chat
router.post('/chatMessages', chatMessageController.createChatMessage);
router.get('/chatMessages', chatMessageController.getAllChatMessages);
router.get('/chatMessages/reclamation/:reclamationId', chatMessageController.getChatMessagesByReclamationId);
router.put('/chatMessages/:id', chatMessageController.updateChatMessage);
router.delete('/chatMessages/:id', chatMessageController.deleteChatMessage);

export default router;