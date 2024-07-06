import express from 'express';
import { updateVideoProgress, checkCourseCompletion } from '../controllers/videoProgress.controller.js';
import authorize from '../_middleware/authorize.js';

const router = express.Router();

router.post('/update-progress', authorize(), updateVideoProgress);
router.get('/completion/:userId/:courseId', authorize(), checkCourseCompletion);

export default router;
