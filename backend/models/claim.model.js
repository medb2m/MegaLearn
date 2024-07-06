import mongoose from 'mongoose';

const { Schema, model } = mongoose;

<<<<<<< HEAD

=======
>>>>>>> siwarMerge
const ClaimSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
<<<<<<< HEAD
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  chat: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
},{timestamps :true });
=======
  author: { type: Schema.Types.ObjectId, ref: 'User'  },
  chat: [{ type: Schema.Types.ObjectId, ref: 'Chat'  }], // to admin
});
>>>>>>> siwarMerge

export default model('Claim', ClaimSchema);