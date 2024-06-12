<<<<<<< HEAD
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
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

export default router
=======
import express from "express";
import Role from "../_helpers/role.js";
import authorize from "../_middleware/authorize.js";

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
  _delete,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/authenticate", authenticateSchema, authenticate);
router.post("/refresh-token", refreshToken);
router.post("/revoke-token", authorize(), revokeTokenSchema, revokeToken);
router.post("/register", registerSchema, register);
router.post("/verify-email", verifyEmailSchema, verifyEmail);
router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
router.post(
  "/validate-reset-token",
  validateResetTokenSchema,
  validateResetToken
);
router.post("/reset-password", resetPasswordSchema, resetPassword);
router.get("/", authorize(Role.Admin), getAll);
router.get("/:id", authorize(), getById);
router.post("/", authorize(Role.Admin), createSchema, create);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

export default router;
>>>>>>> origin/main
