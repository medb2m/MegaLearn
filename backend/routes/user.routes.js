import express from 'express'
import Role from '../_helpers/role.js';
import authorize from '../_middleware/authorize.js';

import {
    authenticateSchema,
    authenticate,
    refreshToken,
    revokeTokenSchema,
    revokeToken,
    registerSchema,
    register,
    verifyEmailSchema,
    verifyEmail,
    forgotPasswordSchema,
    forgotPassword,
    validateResetTokenSchema,
    validateResetToken,
    resetPasswordSchema,
    resetPassword,
    getAll,
    getById,
    createSchema,
    create,
    updateSchema,
    update,
    _delete
} from '../controllers/user.controller.js'
import { uploadImage } from '../_middleware/multerConfig.js'



const router = express.Router()

router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.post('/register', registerSchema, register);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), uploadImage, updateSchema, update);
router.delete('/:id', authorize(), _delete);



export default router
/* router.post('/face-authenticate', faceAuthenticate); */
router.post('/compare-faces', async (req, res) => {
    try {
        const { userImage, frontEndImage } = req.body; // Assurez-vous que ces propriétés sont envoyées depuis le front-end
        const result = await compareFaces(userImage, frontEndImage);
        res.json(result);
    } catch (error) {
        console.error('Error comparing faces:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

import { compareFaces } from '../controllers/face.controller.js';