import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const chatMessageSchema = new Schema({
  reclamation: {
    type: Schema.Types.ObjectId,
    ref: "reclamation",
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  //Cet attribut enregistre la date et l'heure exactes à laquelle le message de chat est créé.
  timestamp: {
    type: Date,
    default: Date.now
  },
  //C'est un indicateur booléen qui indique si le message a été lu ou non par le destinataire. Par défaut, il est défini sur "false" pour indiquer que le message n'a pas encore été lu
  isRead: {
    type: Boolean,
    default: false
  },
});
const chatMessage = mongoose.model("chatMessage", chatMessageSchema);
 
export default chatMessage;