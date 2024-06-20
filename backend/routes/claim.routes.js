import express from 'express';
import { changeStatus, createClaim, deleteClaim, getAllClaims, getClaimById, getClaimByUserId, updateClaim, } from '../controllers/claim.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';

const router = express.Router();

// Endpoint pour créer une nouvelle réclamation
router.post('/',  createClaim)

// Endpoint pour récupérer toutes les réclamations
router.get('/', authorize(/* Role.Admin */),getAllClaims)

// Endpoint pour récupérer une réclamation par son ID
router.get('/:claimId', authorize(),getClaimById)

// Endpoint pour mettre à jour une réclamation
router.put('/:claimId', authorize(), updateClaim)

// Endpoint pour supprimer une réclamation
router.delete('/:claimId', authorize(/* Role.Admin */) , deleteClaim)

// Endpoint pour récupérer une réclamation par le user ID
router.get('/claimer/:userId', authorize(/* Role.Admin */) ,getClaimByUserId)

// Endpoint pour changer le status en in progress 
router.put('/status/:claimId', authorize(/* Role.Admin */), changeStatus)

export default router;