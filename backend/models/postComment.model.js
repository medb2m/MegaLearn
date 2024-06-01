import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  content: { type: String, required : true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps : true});

export default model('Comment', CommentSchema);