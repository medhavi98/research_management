const MessageModel = require('../models/MessageModal');

const messageRouter = require('express').Router();

//add messages
messageRouter.post('/', async (req,res) => {
    const { groupId, senderId, receiverId, message } = req.body.message;

    const messageDoc = await new MessageModel({ groupId, senderId, receiverId, message });

    try {
        await messageDoc.save();
        res.status(200).json("Message added successfully");
    } catch (error) {
        res.status(400).json("Message could not be saved");
    }
})

module.exports = messageRouter;

