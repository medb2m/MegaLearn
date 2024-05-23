import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VideoSchema = new Schema({
  title: String,
  url: String,
  length: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' }
});

export default model('Video', VideoSchema);