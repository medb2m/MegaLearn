import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const videoProgressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  watched: { type: Boolean, default: false },
});

const VideoProgress = model('VideoProgress', videoProgressSchema);

export default VideoProgress;
