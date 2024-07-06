import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  senderID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, required: true },
<<<<<<< HEAD
  },{timestamps : true})
  
export default model('Chat', ChatSchema)
=======
  },{timestamps : true});
  
  export default model('Chat', ChatSchema);
>>>>>>> siwarMerge
