import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CertificateSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  score: {
    type: Number,
    required: true
  },
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  certificateLink : {
    type : String,
    required : true
  }
});

export default model('Certificate', CertificateSchema);
