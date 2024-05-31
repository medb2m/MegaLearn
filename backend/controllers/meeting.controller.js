import Meeting from '../models/meeting.model.js';

// Create a new meeting
export const createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

// Get all meetings
export const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('event');
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meetings', error: error.message });
  }
};

// Get a meeting by id
export const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meetingId).populate('event');
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meeting', error: error.message });
  }
};

// Update a meeting
export const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, req.body, { new: true });
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating meeting', error: error.message });
  }
};

// Delete a meeting
export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    res.json({ message: 'Meeting deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error: error.message });
  }
};
