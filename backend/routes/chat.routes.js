import express from 'express'
import { createChat, addMessageToChat, getChatByReclamationId, getAllChat } from '../controllers/chat.controller.js'

const router = express.Router()

// Route pour créer une discussion pour une réclamation spécifique
router.post('/chat/:claimId', createChat)

// Route pour ajouter un message dans une discussion
router.post('/chat/add/:chatId', addMessageToChat)

// Route pour avoir tous les messages d'un chat 
router.get('/chat/claim/:claimId', getChatByReclamationId)

// Route pour avoir tous les chats
router.get('/chat', getAllChat)


// Autres routes pour les messages de chat
// router.get('/chat', chat.getAllChatMessages);
// router.put('/messages/:id', chat.updateChatMessage);
// router.delete('/messages/:id', chat.deleteChatMessage);


export default router;