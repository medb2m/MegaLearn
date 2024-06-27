import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  name: { type: String},
  option: { type: String },
  vidDescription: { type: String},
});

export default model('Question', QuestionSchema);