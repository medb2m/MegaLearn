import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VideoSchema = new Schema({
  title: { type: String},
  url: { type: String },
  vidDescription: { type: String},
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
});

export default model('Video', VideoSchema);