import express from 'express';
import { createVideo, getAllVideosByCourseId, getVideoById, deleteVideoById } from '../controllers/video.controller.js';
import authorize from '../_middleware/authorize.js'
import { uploadVideo } from '../_middleware/multerConfig.js';


const router = express.Router();

router.post('/upload', authorize(), uploadVideo, createVideo);
router.get('/getall/:courseId', authorize(), getAllVideosByCourseId);
router.get('/get/:id', authorize(), getVideoById);
router.delete('/delete/:id', authorize(), deleteVideoById);

export default router;
