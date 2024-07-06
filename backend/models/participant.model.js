import mongoose from 'mongoose';

const { Schema } = mongoose;

const ParticipantSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
},
{ timestamps: true }
);

export { ParticipantSchema };
