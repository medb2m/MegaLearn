import express from 'express';
import { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/add', createCourse);
router.get('/getall', getAllCourses);
router.get('/get/:id', getCourseById);
router.put('/update/:id', updateCourseById);
router.delete('/delete/:id', deleteCourseById);

export default router;
