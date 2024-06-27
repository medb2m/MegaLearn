import express from 'express'
import {uploadImage} from '../_middleware/multerConfig.js'
import { createEntity, deleteEntityById, getAllEntities, getEntityById, updateEntityById } from '../controllers/entity.controller.js';

const router = express.Router()

router.post('/',  uploadImage, createEntity);
router.get('/', getAllEntities); 
router.get('/:entityId', getEntityById);
router.put('/:entityId', uploadImage, updateEntityById);
router.delete('/:entityId', deleteEntityById)


export default router;