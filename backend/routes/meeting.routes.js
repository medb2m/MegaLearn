import express from 'express';
import authorize from '../_middleware/authorize.js';
import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting
} from '../controllers/meeting.controller.js';

const router = express.Router();

router.post('/create', authorize(), createMeeting);
router.get('/', authorize(), getAllMeetings);
router.get('/:meetingId', authorize(), getMeetingById);
router.put('/:meetingId', authorize(), updateMeeting);
router.delete('/:meetingId', authorize(), deleteMeeting);

export default router;
