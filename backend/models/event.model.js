import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ParticipantSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  duration: Number,
  type: { type: String, enum: ['webinar', 'class', 'private'], required: true },
  host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [ParticipantSchema],
  webrtcRoomId: String,
  created: { type: Date, default: Date.now },
  updated: Date
});

export default model('Event', EventSchema);
