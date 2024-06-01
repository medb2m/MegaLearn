import Event from '../models/event.model.js'
import Meeting from '../models/meeting.model.js'

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      host: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('host').populate('participants.user');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
}

// Get an event by id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('host').populate('participants.user');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving event', error: error.message });
  }
}

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
}

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
}

// Add participants to the event as the host
export const addParticipant = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    const userId = req.user.id

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.host.toString() !== userId) {
      return res.status(403).json({ message : 'Only the host can add participants'})
    }

    if (event.participants.includes(participantId)) {
      return res.status(400).json({ message: 'Participant already added' });
    }

    event.participants.push({ user: participantId, status: 'approved' });
    event.updated = new Date();
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error adding participant', error: error.message });
  }
}

// Join an event
export const participeToEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const isParticipant = event.participants.some(p => p.user.toString() === participantId);
    if (isParticipant) {
      return res.status(400).json({ message: 'You are already a participant of this event' });
    }

    event.participants.push({ user: participantId});
    event.updated = new Date();
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error adding participant', error: error.message });
  }
}

// Approve a participant's request (host only)
export const approveParticipant = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is the host
    if (event.host.toString() !== userId) {
      return res.status(403).json({ message: 'Only the host can approve participants' });
    }

    const participant = event.participants.find(p => p.user.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    participant.status = 'approved';
    event.updated = new Date();
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error approving participant', error: error.message });
  }
}

// Disapprove and delete a participant's request (host only)
export const disapproveParticipant = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user is the host
    if (event.host.toString() !== userId) {
      return res.status(403).json({ message: 'Only the host can disapprove participants' });
    }

    const participant = event.participants.find(p => p.user.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    
    event.participants = event.participants.filter(p => p.user.toString() !== participantId);
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error disapproving participant', error: error.message });
  }
}

// Create a meeting for an event
export const createMeetingForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId
    const { startTime, endTime, meetingLink, recordingLink } = req.body;
    // find event by ID
    const event = await Event.findById(eventId)
    if(!event){
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the start time is on the same day as the event date
    const eventDate = new Date(event.date);
    const meetingStartTime = new Date(startTime);
    if (
      eventDate.getDate() !== meetingStartTime.getDate() ||
      eventDate.getMonth() !== meetingStartTime.getMonth() ||
      eventDate.getFullYear() !== meetingStartTime.getFullYear()
    ) {
      return res.status(400).json({ message: 'Meeting date must be the same day as the event date' });
    }

    const meeting = new Meeting({
      event: eventId,
      startTime,
      endTime,
      meetingLink,
      recordingLink
    });
    await meeting.save();

    // Add the meeting ID to the event's meetings array
    event.meetings.push(meeting._id);

    // Save the updated event with the new meeting added
    await event.save();

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
}

