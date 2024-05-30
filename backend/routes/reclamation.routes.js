import express from 'express';
import reclamationController from '../controllers/reclamation.controller.js';


const router = express.Router();

// Endpoint pour créer une nouvelle réclamation
router.post('/', reclamationController.createReclamation)

// Endpoint pour récupérer toutes les réclamations
router.get('/', reclamationController.getAllReclamations)

// Endpoint pour récupérer une réclamation par son ID
router.get('/:claimId', reclamationController.getReclamationById)

// Endpoint pour mettre à jour une réclamation
router.put('/:claimId', reclamationController.updateReclamation)

// Endpoint pour supprimer une réclamation
router.delete('/:claimId', reclamationController.deleteReclamation)

// Endpoint pour le  controlleur qui creer une discussion pour une reclamation
//router.post('/chat/:claimId', reclamationController.createDiscussion)
//router.post('/reclamations/:id/:receiverID', reclamationController.createReclamation);


export default router;