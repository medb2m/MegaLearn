import ChatMessage from './chatMessage';
import Reclamation from './reclamation';

const chatMessageController = {
  // Fonction pour créer un nouveau message de chat
  createChatMessage: async (req, res) => {
    try {
      const { reclamationId, senderId, message } = req.body;

      // Vérifier si la réclamation existe
      const reclamation = await Reclamation.findById(reclamationId);
      if (!reclamation) {
        return res.status(404).json({ error: 'Réclamation non trouvée' });
      }

      const newChatMessage = new ChatMessage({
        reclamation: reclamationId,
        sender: senderId,
        message,
      });

      await newChatMessage.save();
      res.status(201).json({ message: 'Message de chat créé avec succès', chatMessage: newChatMessage });
    } catch (error) {
      res.status(400).json({ error: 'Impossible de créer le message de chat', details: error });
    }
  },

  // Fonction pour récupérer tous les messages de chat
  getAllChatMessages: async (req, res) => {
    try {
      const chatMessages = await ChatMessage.find().populate('reclamation sender');
      res.status(200).json(chatMessages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

  // Fonction pour récupérer les messages de chat par réclamation
  getChatMessagesByReclamationId: async (req, res) => {
    try {
      const { reclamationId } = req.params;
      const chatMessages = await ChatMessage.find({ reclamation: reclamationId }).populate('sender');
      if (chatMessages.length === 0) {
        return res.status(404).json({ error: 'Aucun message de chat trouvé pour cette réclamation' });
      }
      res.status(200).json(chatMessages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

  // Fonction pour mettre à jour un message de chat
  updateChatMessage: async (req, res) => {
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
  },

  // Fonction pour supprimer un message de chat
  deleteChatMessage: async (req, res) => {
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
  },
};

export default chatMessageController;