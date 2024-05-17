import express from 'express';
import { createVideo, getAllVideos, getVideoById, updateVideoById, deleteVideoById } from '../controllers/video.controller.js';

const router = express.Router();

router.post('/add', createVideo);
router.get('/getall', getAllVideos);
router.get('/get/:id', getVideoById);
router.put('/update/:id', updateVideoById);
router.delete('/delete/:id', deleteVideoById);

export default router;
