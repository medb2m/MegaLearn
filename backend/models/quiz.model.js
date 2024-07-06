import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OptionsSchema = new Schema({
  optionText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [OptionsSchema],
});

const QuizSchema = new Schema({
  title : { type : String, required : true},
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  questions: [QuestionSchema],
  creator : { 
    type : Schema.Types.ObjectId,
    ref : 'User',
    required :true
  }
});

export default model('Quiz', QuizSchema);
