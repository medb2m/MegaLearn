import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true }
});

const QuizSchema = new Schema({
  name : String,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  questions: [QuestionSchema],
  creator : { 
    type : Schema.Types.ObjectId,
    ref : 'User',
    required :true
  }
}, { timestamps : true});

export default model('Quiz', QuizSchema);
