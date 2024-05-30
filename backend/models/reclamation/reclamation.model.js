import mongoose from "mongoose";
 
const { Schema, model } = mongoose;
 
const reclamationSchema = new Schema({
  title: {
    type: String,
    //required: true
  },
  description: { // Sujet 
    type: String,
    // required: true
  },
  status: {
    type: String,
    enum: ["Ouverte", "En cours", "Résolue"],
    default: "Ouverte"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  chat:  // ID une discussion $$$ pas besoin de tableau 
    {
      type: Schema.Types.ObjectId,
      ref: "Chat"
    }
  
});
 
export default model("Reclamation", reclamationSchema); 
 
