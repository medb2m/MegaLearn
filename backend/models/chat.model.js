import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  senderID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
  });
  
  export default model('Chat', ChatSchema);