import Chat from '../models/chat.model.js'

// add Message to chat
export function addMessage (req, res) {
    const messageData = {
        senderID: req.user.id,
        senderName: req.user.firstName,
        receiverID: req.body.receiverID,
        claimID: req.body.claimID, // send claimID in the request
        message: req.body.message
    };

    Chat.create(messageData).then(newMsg => {
        if (res) {
            res.status(201).json(newMsg);
        }
    })
    .catch(err => {
        if(res) {
            res.status(500).json(err)
        }
    })
}

// get messages for a specific claim between two users
export function getMessages (req, res) {
    const { claimID } = req.params;
    const userID = req.user.id;

    Chat.find({ claimID, $or: [{ senderID: userID }, { receiverID: userID }] })
        .sort({ timestamp: 1 })
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}