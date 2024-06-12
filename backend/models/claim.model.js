import mongoose from "mongoose";
<<<<<<< HEAD
 
const { Schema, model } = mongoose;
 
=======

const { Schema, model } = mongoose;

>>>>>>> origin/main
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
<<<<<<< HEAD
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
 
=======
    enum: ["Open", "In progress", "Closed"],
    default: "Open"
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

}, { timestamps: true });

export default model("Claim", claimSchema);
>>>>>>> origin/main
