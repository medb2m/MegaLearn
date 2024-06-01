import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MeetingSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  meetingLink: { type: String, required: true },
  recordingLink: { type: String }
}, { timestamps: true });

export default model('Meeting', MeetingSchema);
