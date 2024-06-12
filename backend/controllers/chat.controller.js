import Chat from '../models/chat.model.js';
import Claim from '../models/claim.model.js';

// Fonction pour creer une discussion
export const createChat = async (req, res) => {
<<<<<<< HEAD
  try {
    const { claimId } = req.params.claimId

    const claim = await Claim.findById(req.params.claimId).populate('chat')
    if (!claim) {
      return res.status(404).json({ error: 'Réclamation non trouvée' });
    }
    

    if(claim.chat){
        const chat = claim.chat
        return res.status(400).json({ error: 'chat already created ', chat });
    }

    const chatData = {
      title: req.body.title,
      claim: req.params.claimId,
      sender: req.user.id,
    };

    const chat = new Chat(chatData);
    await chat.save(); 
    
    claim.chat = chat._id
    await claim.save()

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
      const userId = req.user.id

      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: 'Discussion non trouvée' });
      }

      chat.message.push({
        userId: userId,
        message
      });

      await chat.save();
      res.status(200).json({ message: 'Message ajouté avec succès', chat });
    } catch (error) {
      res.status(400).json({ error: 'Impossible d\'ajouter le message', message : error.message });
    }
  }
=======
    try {
        const { claimId } = req.params.claimId

        const claim = await Claim.findById(req.params.claimId).populate('chat')
        if (!claim) {
            return res.status(404).json({ error: 'Réclamation non trouvée' });
        }


        if (claim.chat) {
            const chat = claim.chat
            return res.status(400).json({ error: 'chat already created ', chat });
        }

        const chatData = {
            title: req.body.title,
            claim: req.params.claimId,
            sender: req.user.id,
        };

        const chat = new Chat(chatData);
        await chat.save();

        claim.chat = chat._id
        await claim.save()

        res.status(201).json({ message: 'Discussion créée avec succès', chat });
    } catch (error) {
        res.status(500).json({ error: 'Impossible de créer la discussion', message: error.message });
    }
}


// Fonction pour ajouter un message dans une discussion
export const addMessageToChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { message } = req.body;
        const userId = req.user.id

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Discussion non trouvée' });
        }

        chat.message.push({
            userId: userId,
            message
        });

        await chat.save();
        res.status(200).json({ message: 'Message ajouté avec succès', chat });
    } catch (error) {
        res.status(400).json({ error: 'Impossible d\'ajouter le message', message: error.message });
    }
}
>>>>>>> origin/main


// Fonction pour récupérer un chat par réclamation ID
export const getChatByClaimId = async (req, res) => {
<<<<<<< HEAD
  try {
    const { claimId } = req.params;
    const chat = await Chat.find({ claim : claimId }).populate('sender claim');
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



  // Fonction pour supprimer un message de chat
export const deleteChatMessage = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedChatMessage = await ChatMessage.findByIdAndRemove(id); // delete
      if (!deletedChatMessage) {
        return res.status(404).json({ error: 'Message de chat non trouvé' });
      }

      res.status(204).json({ message: 'Message de chat supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', message : error.message });
    }
  }
=======
    try {
        const { claimId } = req.params;
        const chat = await Chat.find({ claim: claimId }).populate('sender claim');
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


// Fonction pour supprimer un message de chat
export const deleteChatMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedChatMessage = await ChatMessage.findByIdAndRemove(id); // delete
        if (!deletedChatMessage) {
            return res.status(404).json({ error: 'Message de chat non trouvé' });
        }

        res.status(204).json({ message: 'Message de chat supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur du serveur', message: error.message });
    }
}
>>>>>>> origin/main
