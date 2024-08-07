import express from 'express';
import { createClaim, getAllClaims, getClaimById, updateClaimById, deleteClaimById, addMessage, getMessages } from '../controllers/claim.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';
import { uploadImage } from '../_middleware/multerConfig.js';

const router = express.Router();

router.post('/msg', authorize(), uploadImage, addMessage)
router.get('/msg/:claimId', authorize(), getMessages)
router.post('/', authorize(), uploadImage, createClaim);
router.get('/', authorize(), getAllClaims);
router.get('/:id', authorize(), getClaimById);
router.put('/:id', authorize(), uploadImage,updateClaimById);
router.delete('/:id', authorize(), deleteClaimById);


export default router;