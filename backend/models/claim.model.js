import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const ClaimSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  author: { type: Schema.Types.ObjectId, ref: 'User'  },
  chat: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
},{timestamps :true });

export default model('Claim', ClaimSchema);