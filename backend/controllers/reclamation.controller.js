
import Reclamation from '../models/reclamation/reclamation.model.js';



const reclamationController = {
  // Fonction pour créer une nouvelle réclamation
  createReclamation: async (req, res) => {
    try {
      const { title, description } = req.body;
      const newReclamation = new Reclamation({
        title,
        description,
      });
      await newReclamation.save();
      res.status(201).json({ message: 'Réclamation créée avec succès' });
    } catch (error) {
      res.status(400).json({ error: 'Impossible de créer la réclamation', details: error });
    }
  },

  // Fonction pour récupérer toutes les réclamations
  getAllReclamations: async (req, res) => {
    try {
      const reclamations = await Reclamation.find();
      res.status(200).json(reclamations);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

  // Fonction pour récupérer une réclamation par son ID
  getReclamationById: async (req, res) => {
    try {
      const reclamation = await Reclamation.findById(req.params.claimId);
      if (!reclamation) {
        return res.status(404).json({ error: 'Réclamation non trouvée' });
      }
      res.status(200).json(reclamation);
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

  // Fonction pour mettre à jour une réclamation
  updateReclamation: async (req, res) => {
    try {
      const updatedReclamation = await Reclamation.findByIdAndUpdate(req.params.claimId, req.body, { new: true });
      if (!updatedReclamation) {
        return res.status(404).json({ error: 'Réclamation non trouvée' });
      }
      res.status(200).json({ message: 'Réclamation mise à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

  // Fonction pour supprimer une réclamation
  deleteReclamation: async (req, res) => {
    try {
      const deletedReclamation = await Reclamation.findByIdAndDelete(req.params.claimId);
      if (!deletedReclamation) {
        return res.status(404).json({ error: 'Réclamation non trouvée' });
      }
      res.status(204).json({ message: 'Réclamation supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
  },

};


// controlleur pour creer une discussion pour une reclamation

export default reclamationController;