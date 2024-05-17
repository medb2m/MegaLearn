import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    name: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
  });
  
  export default model('Categorie', CategorySchema);