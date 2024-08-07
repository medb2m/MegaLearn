import express from 'express';
import authorize from '../_middleware/authorize.js';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent,  
    participeToEvent, 
    approveParticipant, 
    disapproveParticipant, 
    createMeetingForEvent,
    getPendingParticipants, 
    getEventByUser,
    getUserStatus} from '../controllers/event.controller.js';

import {uploadImage} from '../_middleware/multerConfig.js';

const router = express.Router();

router.post('/create', authorize(), uploadImage , createEvent);
router.get('/', authorize(), getAllEvents);
router.get('/:eventId', authorize(), getEventById);
router.get('/user', authorize(), getEventByUser);
router.put('/:eventId', authorize(),uploadImage, updateEvent);
router.delete('/:eventId', authorize(), deleteEvent);
router.post('/:eventId/join', authorize(), participeToEvent);
router.put('/:eventId/participants/:participantId/approve', authorize(), approveParticipant);
router.put('/:eventId/participants/:participantId/disapprove', authorize(), disapproveParticipant);
router.post('/:eventId/meeting', authorize(), createMeetingForEvent);
router.get('/:eventId/participants/pending', authorize(), getPendingParticipants);
router.get('/events/:eventId/user-status', authorize(), getUserStatus);


export default router;
