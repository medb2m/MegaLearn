import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const reclamationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Ouverte", "En cours", "Résolue", "Fermée"],
    default: "Open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  chat: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage"
    }
  ]
});
 
const reclamation = mongoose.model("Claim", claimSchema);
 
export default reclamation;