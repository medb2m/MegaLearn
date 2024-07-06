import express from 'express';
import authorize from '../_middleware/authorize.js';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    addParticipant, 
    participeToEvent, 
    approveParticipant, 
    disapproveParticipant, 
    createMeetingForEvent} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create', authorize(), createEvent);
router.get('/', authorize(), getAllEvents);
router.get('/:eventId', authorize(), getEventById);
router.put('/:eventId', authorize(), updateEvent);
router.delete('/:eventId', authorize(), deleteEvent);
router.post('/addparticipant/:eventId/:participantId', authorize(), addParticipant);
router.post('/:eventId/join', authorize(), participeToEvent);
router.put('/:eventId/participants/:participantId/approve', authorize(), approveParticipant);
router.put('/:eventId/participants/:participantId/disapprove', authorize(), disapproveParticipant);
router.post('/:eventId/meeting', authorize(), createMeetingForEvent);


export default router;
