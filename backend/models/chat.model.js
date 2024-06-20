import mongoose from "mongoose";
 
const { Schema, model } = mongoose;

const messageSchema = new Schema ({
  userId : {
    type: Schema.Types.ObjectId,
    ref: "User",
    //required: true
  },
  message: { // schema pour message  mes
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  //C'est un indicateur booléen qui indique si le message a été lu ou non par le destinataire. Par défaut, il est défini sur "false" pour indiquer que le message n'a pas encore été lu
  isRead: {
    type: Boolean,
    default: false
  },
})
 
const ChatSchema = new Schema({
  title : {type : String},
  claim: {
    type: Schema.Types.ObjectId,
    ref: "Claim",
    //required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //required: true
  },
  message: [messageSchema],
  //Cet attribut enregistre la date et l'heure exactes à laquelle le message de chat est créé.
  timestamp: {
    type: Date,
    default: Date.now
  }
})

export default model("Chat", ChatSchema)
 