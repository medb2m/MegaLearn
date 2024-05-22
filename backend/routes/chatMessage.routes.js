import express from 'express';
import chatMessageController from '../controllers/chatMessage.controller.js';

const router = express.Router();

router.post('/', chatMessageController.createChatMessage);
router.get('/', chatMessageController.getAllChatMessages);
router.get('/:reclamationId', chatMessageController.getChatMessagesByReclamationId);
router.put('/:id', chatMessageController.updateChatMessage);
router.delete('/:id', chatMessageController.deleteChatMessage);

export default router;