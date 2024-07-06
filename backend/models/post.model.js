import mongoose from 'mongoose';

const { Schema , model } = mongoose;

const PostSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default model('Post', PostSchema);