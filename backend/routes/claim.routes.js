import express from 'express';
<<<<<<< HEAD
import authorize from '../_middleware/authorize.js';
import Role from '../_helpers/role.js';
import {
    createClaim,
    deleteClaim,
    getAllClaims,
    getClaimById,
    getClaimByUserId,
    updateClaim,
    changeStatus
} from '../controllers/claim.controller.js';


=======
import { changeStatus, createClaim, deleteClaim, getAllClaims, getClaimById, getClaimByUserId, updateClaim, } from '../controllers/claim.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';
>>>>>>> origin/main

const router = express.Router();

// Endpoint pour créer une nouvelle réclamation
<<<<<<< HEAD
router.post('/', authorize(),createClaim)

// Endpoint pour récupérer toutes les réclamations
router.get('/', authorize(Role.Admin),getAllClaims)
=======
router.post('/', authorize(), createClaim)

// Endpoint pour récupérer toutes les réclamations
router.get('/', authorize(/* Role.Admin */),getAllClaims)
>>>>>>> origin/main

// Endpoint pour récupérer une réclamation par son ID
router.get('/:claimId', authorize(),getClaimById)

// Endpoint pour mettre à jour une réclamation
router.put('/:claimId', authorize(), updateClaim)

// Endpoint pour supprimer une réclamation
<<<<<<< HEAD
router.delete('/:claimId', authorize(Role.Admin) , deleteClaim)

// Endpoint pour récupérer une réclamation par le user ID
router.get('/:userId', authorize(Role.Admin) ,getClaimByUserId)

// Endpoint pour changer le status en in progress 
router.put('/status/:claimId', authorize(Role.Admin), changeStatus)



=======
router.delete('/:claimId', authorize(/* Role.Admin */) , deleteClaim)

// Endpoint pour récupérer une réclamation par le user ID
router.get('/claimer/:userId', authorize(/* Role.Admin */) ,getClaimByUserId)

// Endpoint pour changer le status en in progress 
router.put('/status/:claimId', authorize(/* Role.Admin */), changeStatus)
>>>>>>> origin/main

export default router;