import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ParticipantSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    type: {
      type: String,
      enum: ["webinar", "class", "private"],
      required: true
    },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    participants: [ParticipantSchema],
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
  },
  { timestamps: true }
);

export default model("Event", EventSchema);
