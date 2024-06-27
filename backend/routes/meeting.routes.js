import express from 'express';
import authorize from '../_middleware/authorize.js';
import {
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  getAllMeetingsForEvent
} from '../controllers/meeting.controller.js';

const router = express.Router();

router.get('/:meetingId', authorize(), getMeetingById);
router.put('/:meetingId', authorize(), updateMeeting);
router.delete('/:meetingId', authorize(), deleteMeeting);
router.get('/event/:eventId', authorize(), getAllMeetingsForEvent);

export default router;
