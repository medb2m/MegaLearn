import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VideoSchema = new Schema({
  title: { type: String},
  url: { type: String },
  vidDescription: { type: String},
});

export default model('Video', VideoSchema);