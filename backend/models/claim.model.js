import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ClaimSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  author: { type: Schema.Types.ObjectId, ref: 'User'  },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' }, // to admin
});

export default model('Claim', ClaimSchema);