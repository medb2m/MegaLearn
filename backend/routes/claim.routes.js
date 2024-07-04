import express from 'express';
import { createClaim, getAllClaims, getClaimById, updateClaimById, deleteClaimById } from '../controllers/claim.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';

const router = express.Router();

router.post('/', authorize(), createClaim);
router.get('/', authorize(), getAllClaims);
router.get('/:id', authorize(), getClaimById);
router.put('/:id', authorize(), updateClaimById);
router.delete('/:id', authorize(Role.Admin), deleteClaimById);

export default router;