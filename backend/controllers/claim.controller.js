import Claim from '../models/claim.model.js';
import Chat from '../models/chat.model.js'

// add Message to chat
export const addMessage = async (req, res) => {

    try {
        const claimId = req.body.claimId
        const newMsg = new Chat({
            senderID: req.body.senderID,
            senderName: req.body.senderName,
            message: req.body.message,
            time: req.body.time,
        });
    
        await newMsg.save()

        // Find the claim and push the new message to its chat array
        await Claim.findByIdAndUpdate(claimId, { $push: { chat: newMsg._id } });
        res.status(201).json(newMsg)
      } catch (error){
        res.status(500).json({message : 'Error while saving the message.'})
      }
}

export const getMessages = async (req, res) => {
  try {
    const claimId = req.params.claimId;
    //const messages = await Chat.find().populate('senderID')
    const claim = await Claim.findById(claimId).populate({
      path: 'chat',
      populate: { path: 'senderID' }
    });

    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.json(claim.chat);
    //res.json(messages)
  }catch(error){
    res.status(500).json({message : 'Error while retrieving messages.'})
  }
}

export const createClaim = async (req, res) => {
  try {
    const claim = new Claim({
      title : req.body.title,
      description : req.body.description,
      author: req.user._id,
    })
    await claim.save()
    res.status(201).json(claim)
  } catch (error){
    res.status(500).json({message : 'Error while creating the claim.'})
  }
};

export const getAllClaims = async (req, res) => {
  const claims = await Claim.find().populate('author');
  res.json(claims);
};

export const getClaimById = async (req, res) => {
  const claim = await Claim.findById(req.params.id).populate('author');
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json(claim);
};

export const updateClaimById = async (req, res) => {
  const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json(claim);
};

export const deleteClaimById = async (req, res) => {
  const claim = await Claim.findByIdAndDelete(req.params.id);
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found' });
  }
  res.json({ message: 'Claim deleted' });
}