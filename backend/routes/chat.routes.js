import express from 'express'
import { addMessageToChat, createChat, getAllChat, getChatByClaimId } from '../controllers/chat.controller.js'
import authorize from '../_middleware/authorize.js'

const router = express.Router()

// Route pour créer une discussion pour une réclamation spécifique
router.post('/:claimId', authorize(),createChat)

// Route pour ajouter un message dans une discussion
router.post('/add/:chatId', authorize(),addMessageToChat)

// Route pour avoir tous les messages d'un chat 
router.get('/claim/:claimId', authorize(),getChatByClaimId)

// Route pour avoir tous les chats
router.get('/', getAllChat)

export default router;