import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },  // qu'est ce python
  options: [{ type: String, required: true }],  // [ "un jeu video", "un language de programmation", "les deux" ]
  answer: { type: Number, required: true }   // 1   =====> [1,0,3]
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
});

export default model('Quiz', QuizSchema);
