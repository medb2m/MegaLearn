import Chat from '../models/reclamation/chat.model.js';
import Message from '../models/reclamation/message.model.js';
import Reclamation from '../models/reclamation/reclamation.model.js';

// router.post('/chat/:claimId', chat.createChat)
export const createChat = async (req, res) => {
  try {
    const { claimId } = req.params.claimId
    // senderId = req.user._id

    const reclamation = await Reclamation.findById(req.params.claimId)
    if (!reclamation) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }

    const chatData = {
      title: req.body.title,
      reclamation: req.params.claimId,
      //sender: senderId,
    };

    const chat = new Chat(chatData);
    await chat.save(); 
    
    reclamation.chat = chat._id
    await reclamation.save()

    res.status(201).json({ message: 'Discussion créée avec succès' , chat});
  } catch (error) {
    res.status(500).json({ error: 'Impossible de créer la discussion', message : error.message });
  }
}


  // Fonction pour ajouter un message dans une discussion
export const addMessageToChat = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { message } = req.body;
      // userId = req.user._id

      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: 'Discussion non trouvée' });
      }

      chat.message.push({
        message
      });

      await chat.save();
      res.status(200).json({ message: 'Message ajouté avec succès', chat });
    } catch (error) {
      res.status(400).json({ error: 'Impossible d\'ajouter le message', details: error });
    }
  }


// Fonction pour récupérer un chat par réclamation ID
export const getChatByReclamationId = async (req, res) => {
  try {
    const { claimId } = req.params;
    const chat = await Chat.find({ reclamation: claimId }).populate('sender reclamation');
    if (!chat) {
      return res.status(404).json({ error: 'Aucune discussion pour cette réclamation' });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Erreur du serveur', message: error.message });
  }
}

  // Fonction pour récupérer toutes les discussions
export const getAllChat = async (req, res) => {
    try {
      const chats = await Chat.find()
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', message: error.message });
    }
  }

  // Fonction pour récupérer les messages de chat par réclamation ID
export const igetChatByReclamationId = async (req, res) => {
    try {
      const { claimId } = req.params;
      const chat = await Chat.find({ reclamation: claimId }).populate('sender message');
      if (chatMessages.length === 0) {
        return res.status(404).json({ error: 'Aucun message de chat trouvé pour cette réclamation' });
      }
      res.status(200).json(chatMessages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  }

  // Fonction pour mettre à jour un message de chat
export const updateChatMessage = async (req, res) => {
    try {
      const { id } = req.params;
      const { message, isRead } = req.body;

      const updatedChatMessage = await ChatMessage.findByIdAndUpdate(
        id,
        { message, isRead },
        { new: true }
      );

      if (!updatedChatMessage) {
        return res.status(404).json({ error: 'Message de chat non trouvé' });
      }

      res.status(200).json({ message: 'Message de chat mis à jour avec succès', chatMessage: updatedChatMessage });
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  }

  // Fonction pour supprimer un message de chat
export const deleteChatMessage = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedChatMessage = await ChatMessage.findByIdAndRemove(id);
      if (!deletedChatMessage) {
        return res.status(404).json({ error: 'Message de chat non trouvé' });
      }

      res.status(204).json({ message: 'Message de chat supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  }