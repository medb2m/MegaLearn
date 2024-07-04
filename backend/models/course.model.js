import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SectionSchema = new Schema({
  title: { type: String, required: true },
  videoURL: { type: String, required: true },
  vidDescription: { type: String, required: true }
});


const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number , required : true},
  creator: { type: Schema.Types.ObjectId, ref: 'User' , required : true},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required : true},
  sections: [SectionSchema],
  image: String,
  enrolls: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{timestamps : true}
);


export default model('Course', CourseSchema);
