import express from 'express';
import { CreateCategorie, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } from '../controllers/categorie.controller.js';

const router = express.Router();

router.post('/add', CreateCategorie);
router.get('/getall', getAllCategories);
router.get('/get/:id', getCategoryById);
router.put('/update/:id', updateCategoryById);
router.delete('/delete/:id', deleteCategoryById);

export default router;
