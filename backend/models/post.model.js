import mongoose from 'mongoose';

const { Schema , model } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: String
},{timestamps : true}
);

export default model('Post', PostSchema);