import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  enrolls: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model('Course', CourseSchema);
