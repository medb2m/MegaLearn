import mongoose from 'mongoose'

const { Schema, model } = mongoose


const EntitySchema = new Schema({
  attribut_1: { type: String, required: true },
  attribut_2: { type: String, required: true },
  desc_attribut: { type: String, required: true },
  num_attribut: { type: Number , required : true},
  image: String,
},{timestamps : true}
);

export default model('Entity', EntitySchema);
