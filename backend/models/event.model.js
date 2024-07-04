import mongoose from "mongoose";
import { ParticipantSchema } from './participant.model.js'
const { Schema, model } = mongoose;

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    type: {
      type: String,
      enum: ["webinar", "private"],
      required: true
    },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [ParticipantSchema],
    meeting: { type: Schema.Types.ObjectId, ref: 'Meeting' }
  },
  { timestamps: true }
);

export default model("Event", EventSchema);
