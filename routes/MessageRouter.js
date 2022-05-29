const MessageModel = require('../models/MessageModal');
const _ = require('lodash');
const messageRouter = require('express').Router();
const userDetails = require('../models/UserModel');

//add messages
messageRouter.post('/', async (req, res) => {
    const { groupId, senderId, receiverId, message } = req.body.message;

    const messageDoc = await new MessageModel({ groupId, senderId, receiverId, message });

    try {
        await messageDoc.save();
        res.status(200).json("Message added successfully");
    } catch (error) {
        res.status(400).json("Message could not be saved");
    }
})

//get messages
messageRouter.get('/getMessages/:receiverId', async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await MessageModel.find({ receiverId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

//get messages
messageRouter.get('/getMessages/:receiverId', async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await MessageModel.find({ receiverId });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

//get messages by groupId
messageRouter.get('/getMessagesByGroup/:groupIds', async (req, res) => {
    const { groupIds } = req.params;
    const groupIdsArr = JSON.parse(groupIds);

    try {
        let messages = await MessageModel.find({ groupId: { $in: groupIdsArr } }).sort({ "_id": -1 });
        const users = await userDetails.find();
        messages.map((msg, index) => {
            const user = _.find(users, item => {
                return item._id.toString() === msg.senderId;
            });
            messages[index] = { ...messages[index].toObject(), senderName: user.fullName };
        });
        if (messages) {
            const grouped = _.mapValues(_.groupBy(messages, 'groupId'));
            const arr = Object.keys(grouped).map((key, index) => [index, grouped[key]]);
            res.status(200).json({ messages: arr, messageLength: messages.length });;
        } else {
            res.status(200).json([]);
        }
    } catch (error) {
        res.status(400).json("Messages retrieving failed");
    }
})

module.exports = messageRouter;

