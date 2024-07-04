import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    name: {type : String, required : true},
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});
  
  export default model('Category', CategorySchema);