import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, associateCourseWithCategory, deleteCourseFromCategory } from '../controllers/category.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';

const router = express.Router();

router.post('/add', authorize(Role.Admin), createCategory);
router.get('/getall', getAllCategories);
router.get('/get/:id', getCategoryById);
router.put('/update/:id', authorize(Role.Admin), updateCategoryById);
router.delete('/delete/:id', authorize(Role.Admin),deleteCategoryById);
router.put('/:categoryId/addcourse/:courseId', authorize(Role.Admin), associateCourseWithCategory);
router.put('/:categoryId/deletecourse/:courseId', authorize(Role.Admin), deleteCourseFromCategory);

export default router;