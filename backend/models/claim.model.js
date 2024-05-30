import mongoose from "mongoose";
 
const { Schema, model } = mongoose;
 
const claimSchema = new Schema({
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
    enum: ["Open", "In progress", "Finished"],
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
  claimer:  // ID une discussion $$$ pas besoin de tableau 
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  chat:  // ID une discussion $$$ pas besoin de tableau 
    {
      type: Schema.Types.ObjectId,
      ref: "Chat"
    }
  
});
 
export default model("Claim", claimSchema); 
 
