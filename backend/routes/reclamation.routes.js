import express from 'express';
import reclamationController from './reclamationController';

const router = express.Router();

// Endpoint pour créer une nouvelle réclamation
router.post('/reclamations', reclamationController.createReclamation);

// Endpoint pour récupérer toutes les réclamations
router.get('/reclamations', reclamationController.getAllReclamations);

// Endpoint pour récupérer une réclamation par son ID
router.get('/reclamations/:id', reclamationController.getReclamationById);

// Endpoint pour mettre à jour une réclamation
router.put('/reclamations/:id', reclamationController.updateReclamation);

// Endpoint pour supprimer une réclamation
router.delete('/reclamations/:id', reclamationController.deleteReclamation);

export default router;